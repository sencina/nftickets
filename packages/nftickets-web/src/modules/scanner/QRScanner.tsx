import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScannerState } from 'html5-qrcode';
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
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true,
          defaultZoomValueIfSupported: 2,
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
          }
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
    setLoading(true);
    stopScanning();

    try {
      // Parse the QR code data
      const qrData: QRCodeData = JSON.parse(decodedText);
      
      // Validate QR data structure
      if (!qrData.tokenId || !qrData.contractAddress || !qrData.signature) {
        throw new Error('Invalid QR code format');
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
      <div className="scanner-viewport" style={{ display: isScanning ? 'block' : 'none' }}>
        <div id="qr-reader"></div>
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