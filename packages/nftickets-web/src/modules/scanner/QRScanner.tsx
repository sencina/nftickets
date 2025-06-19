import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScannerState, Html5QrcodeScanType } from 'html5-qrcode';
import axios from 'axios';

interface QRScannerProps {
  onScanSuccess?: (result: VerificationResult) => void;
  apiUrl?: string;
}

interface QRCodeData {
  tokenId: string;
  contractAddress: string;
  eventId: string;
  eventName: string;
  sectorName: string;
  sectorId: number;
  ticketOwner: string;
  timestamp: number;
  signature: string;
}

interface VerificationResult {
  success: boolean;
  message: string;
  ticketInfo?: {
    tokenId: string;
    eventName: string;
    sectorName: string;
    ticketOwner: string;
    contractAddress: string;
    verifiedAt: string;
    scannedBy: string;
  };
  error?: string;
  usedAt?: string;
  usedBy?: string;
}

const DEFAULT_API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/event/verify-qr`
  : 'http://localhost:3000/api/event/verify-qr';

const QRScanner: React.FC<QRScannerProps> = ({
  onScanSuccess,
  apiUrl = DEFAULT_API_URL
}) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scannerWallet, setScannerWallet] = useState<string>('');

  useEffect(() => {
    // Cleanup function
    return () => {
      if (scannerRef.current && scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, []);

  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      // First check if we're on HTTPS or localhost
      const isSecure = window.location.protocol === 'https:' || 
                      window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';
      
      if (!isSecure) {
        setError('Camera access requires HTTPS. Please use HTTPS or localhost.');
        return false;
      }

      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Camera access is not supported in this browser.');
        return false;
      }

      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Prefer back camera
      });
      
      // Stop the stream immediately (we just needed permission)
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Camera permission error:', error);
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          setError('Camera permission denied. Please allow camera access and try again.');
        } else if (error.name === 'NotFoundError') {
          setError('No camera found on this device.');
        } else if (error.name === 'NotSupportedError') {
          setError('Camera access is not supported in this browser.');
        } else {
          setError(`Camera error: ${error.message}`);
        }
      } else {
        setError('Failed to access camera. Please check permissions.');
      }
      return false;
    }
  };

  const startScanning = async () => {
    if (!scannerWallet.trim()) {
      setError('Please enter scanner wallet address first');
      return;
    }

    // Check if qr-reader element exists
    const qrReaderElement = document.getElementById('qr-reader');
    if (!qrReaderElement) {
      setError('Scanner not ready. Please try again.');
      return;
    }

    setError(null);
    setLoading(true);

    // Request camera permission first
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      setLoading(false);
      return;
    }

    setIsScanning(true);
    setScanResult(null);
    setLoading(false);

    // Initialize scanner only when starting
    if (!scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: function(viewfinderWidth, viewfinderHeight) {
            // Make QR box responsive and larger
            const minEdgePercentage = 0.7; // 70% of the smaller dimension
            const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
            const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
            return {
              width: qrboxSize,
              height: qrboxSize,
            };
          },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true,
          defaultZoomValueIfSupported: 1,
          // Additional options for better detection
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
          rememberLastUsedCamera: true,
          // More lenient scanning
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true
          }
        },
        false
      );
      scannerRef.current = scanner;
    }

    try {
      scannerRef.current.render(
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        (errorMessage) => {
          console.log('QR Scan error:', errorMessage);
          // Don't show all scan errors to user, only critical ones
          if (errorMessage.includes('permission') || errorMessage.includes('NotAllowed')) {
            setError('Camera permission required. Please allow camera access.');
            setIsScanning(false);
          } else if (errorMessage.includes('NotFound') || errorMessage.includes('camera')) {
            setError('No camera found or camera is being used by another app.');
            setIsScanning(false);
          }
          // For QR detection errors, we don't stop scanning - just keep trying
        }
      );
    } catch (error) {
      console.error('Scanner initialization error:', error);
      setError('Failed to start camera. Please check permissions and try again.');
      setIsScanning(false);
      setLoading(false);
    }
  };

  const stopScanning = () => {
    if (scannerRef.current && scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING) {
      scannerRef.current.clear();
    }
    setIsScanning(false);
  };

  const handleScanSuccess = async (decodedText: string) => {
    console.log('QR Code detected:', decodedText);
    setLoading(true);
    stopScanning();

    try {
      let qrData: QRCodeData;
      
      // Try to parse as JSON first
      try {
        qrData = JSON.parse(decodedText);
      } catch {
        // If not JSON, check if it's a URL or other format
        console.log('QR code is not JSON format:', decodedText);
        throw new Error(`Invalid QR code format. Expected NFTicket QR code but got: ${decodedText.substring(0, 100)}...`);
      }
      
      // Validate QR data structure
      if (!qrData.tokenId || !qrData.contractAddress || !qrData.signature) {
        throw new Error('Invalid NFTicket QR code format. Missing required fields.');
      }

      // Send verification request to API
      const response = await axios.post(apiUrl, {
        qrCodeData: qrData,
        scannerWalletAddress: scannerWallet
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Note: In production, you'd need to add API key authentication
          // 'Authorization': `Bearer ${apiKey}`
        }
      });

      const result: VerificationResult = response.data;
      setScanResult(result);
      
      if (onScanSuccess) {
        onScanSuccess(result);
      }

    } catch (error) {
      console.error('Verification error:', error);
      let errorMessage = 'Failed to verify ticket';
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setError(null);
  };

  return (
    <div className="qr-scanner">
      <div className="scanner-header">
        <h2>NFTicket QR Scanner</h2>
        <p>Scan QR codes to verify ticket authenticity</p>
        {!isScanning && !scanResult && !error && (
          <div style={{ 
            background: 'rgba(26, 136, 255, 0.1)', 
            padding: '1rem', 
            borderRadius: '8px',
            marginTop: '1rem',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>
            <p><strong>📱 Scanning Tips:</strong></p>
            <ul style={{ textAlign: 'left', margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
              <li>Hold your device steady</li>
              <li>Ensure good lighting</li>
              <li>Keep QR code within the scanning area</li>
              <li>Try different distances if not detecting</li>
            </ul>
          </div>
        )}
      </div>

      {/* Scanner wallet input */}
      <div className="wallet-input">
        <label htmlFor="scanner-wallet">Scanner Wallet Address:</label>
        <input
          id="scanner-wallet"
          type="text"
          placeholder="0x..."
          value={scannerWallet}
          onChange={(e) => setScannerWallet(e.target.value)}
          disabled={isScanning}
        />
      </div>



      {/* Scanner controls */}
      <div className="scanner-controls">
        {!isScanning ? (
          <button onClick={startScanning} className="start-scan-btn">
            Start Scanning
          </button>
        ) : (
          <button onClick={stopScanning} className="stop-scan-btn">
            Stop Scanning
          </button>
        )}
        
        {(scanResult || error) && (
          <button onClick={resetScanner} className="reset-btn">
            Scan Another
          </button>
        )}
      </div>

      {/* Scanner viewport - always render the container */}
      <div className="scanner-viewport">
        <div id="qr-reader" style={{ display: isScanning ? 'block' : 'none' }}></div>
        {!isScanning && (
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center', 
            color: 'var(--text-secondary)',
            border: '2px dashed var(--card-border)',
            borderRadius: '12px'
          }}>
            <p>📷 Camera will appear here when scanning starts</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Make sure the QR code is well-lit and within the scanning area
            </p>
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="loading">
          <p>Verifying ticket...</p>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="error-result">
          <h3>❌ Verification Failed</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Success/failure result */}
      {scanResult && (
        <div className={`scan-result ${scanResult.success ? 'success' : 'failure'}`}>
          {scanResult.success ? (
            <>
              <h3>✅ Ticket Verified!</h3>
              <div className="ticket-info">
                <p><strong>Event:</strong> {scanResult.ticketInfo?.eventName}</p>
                <p><strong>Sector:</strong> {scanResult.ticketInfo?.sectorName}</p>
                <p><strong>Token ID:</strong> {scanResult.ticketInfo?.tokenId}</p>
                <p><strong>Owner:</strong> {scanResult.ticketInfo?.ticketOwner}</p>
                <p><strong>Verified At:</strong> {new Date(scanResult.ticketInfo?.verifiedAt || '').toLocaleString()}</p>
              </div>
            </>
          ) : (
            <>
              <h3>❌ Verification Failed</h3>
              <p>{scanResult.message}</p>
              {scanResult.error === 'TICKET_ALREADY_USED' && (
                <div className="used-info">
                  <p><strong>Used At:</strong> {new Date(scanResult.usedAt || '').toLocaleString()}</p>
                  <p><strong>Used By:</strong> {scanResult.usedBy}</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QRScanner; 