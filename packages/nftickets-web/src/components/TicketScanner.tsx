import React, { useState, useRef } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import { BarcodeFormat, DecodeHintType } from '@zxing/library';
import './TicketScanner.css';

interface TicketScannerProps {
  apiKey: string;
  walletAddress: string;
}

interface TicketInfo {
  tokenId: string;
  eventName: string;
  sectorName: string;
  ticketOwner: string;
  contractAddress: string;
  verifiedAt: string;
  scannedBy: string;
}

const TicketScanner: React.FC<TicketScannerProps> = ({ apiKey, walletAddress }) => {
  const [qrData, setQrData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
    ticketInfo?: TicketInfo;
  } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPasting, setIsPasting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

  const processImage = async (file: File) => {
    try {
      setError(null);
      
      // Create an image element
      const img = new Image();
      const imageUrl = URL.createObjectURL(file);
      
      img.onload = async () => {
        // Draw image to canvas
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image
        ctx.drawImage(img, 0, 0);

        try {
          // Configure hints for better detection
          const hints = new Map();
          hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]);
          hints.set(DecodeHintType.TRY_HARDER, true);

          // Create reader
          const reader = new BrowserQRCodeReader(hints);
          
          // Try to decode
          const result = await reader.decodeFromCanvas(canvas);
          
          if (result) {
            setQrData(result.getText());
            setError(null);
          } else {
            setError('No QR code found in the image. Please try another image.');
          }
        } catch (error) {
          console.error('Error decoding QR code:', error);
          setError('Failed to decode QR code. Please try a different image or adjust the image quality.');
        }
      };

      img.onerror = () => {
        setError('Failed to load image. Please try another image.');
        URL.revokeObjectURL(imageUrl);
      };

      img.src = imageUrl;
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Failed to process image. Please try again with a different image.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    await processImage(file);
  };

  const handlePaste = async (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith('image/')) {
        event.preventDefault();
        setIsPasting(true);
        setError(null);
        
        try {
          const file = item.getAsFile();
          if (file) {
            await processImage(file);
          }
        } catch (error) {
          console.error('Error processing pasted image:', error);
          setError('Failed to process pasted image. Please try again.');
        } finally {
          setIsPasting(false);
        }
        break;
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const verifyTicket = async () => {
    if (!qrData) return;

    setIsVerifying(true);
    setError(null);
    setVerificationResult(null);

    try {
      const response = await fetch(`${API_BASE}/event/verify-qr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          qrCodeData: qrData,
          scannerWalletAddress: walletAddress,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationResult({
          success: true,
          message: data.message,
          ticketInfo: data.ticketInfo,
        });
      } else {
        setVerificationResult({
          success: false,
          message: data.message || 'Verification failed',
        });
      }
    } catch (error) {
      console.error('Error verifying ticket:', error);
      setError('Failed to verify ticket. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const resetScanner = () => {
    setQrData(null);
    setError(null);
    setVerificationResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="ticket-scanner">
      <div className="scanner-header">
        <h2>Ticket Scanner</h2>
        <p>Upload or paste a ticket QR code image to verify its authenticity</p>
      </div>

      <div className="scanner-content">
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        {!qrData && (
          <div className="scanner-options">
            <div className="upload-section">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="file-input"
              />
              <button 
                className="scan-button upload"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload QR Image
              </button>
              <div className="paste-instruction">
                <p>or press {navigator.platform.includes('Mac') ? '⌘V' : 'Ctrl+V'} to paste an image</p>
                {isPasting && <span className="pasting-indicator">Processing pasted image...</span>}
              </div>
            </div>
          </div>
        )}

        {qrData && !verificationResult && (
          <div className="verification-section">
            <p>QR Code detected! Ready to verify.</p>
            <button 
              className="verify-button"
              onClick={verifyTicket}
              disabled={isVerifying}
            >
              {isVerifying ? 'Verifying...' : 'Verify Ticket'}
            </button>
            <button 
              className="cancel-button"
              onClick={resetScanner}
            >
              Cancel
            </button>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
            <button 
              className="retry-button"
              onClick={resetScanner}
            >
              Try Again
            </button>
          </div>
        )}

        {verificationResult && (
          <div className={`verification-result ${verificationResult.success ? 'success' : 'failure'}`}>
            <h3>{verificationResult.success ? 'Ticket Verified!' : 'Verification Failed'}</h3>
            <p>{verificationResult.message}</p>
            {verificationResult.ticketInfo && (
              <div className="ticket-info">
                <h4>Ticket Details:</h4>
                <p>Event: {verificationResult.ticketInfo.eventName}</p>
                <p>Sector: {verificationResult.ticketInfo.sectorName}</p>
                <p>Token ID: {verificationResult.ticketInfo.tokenId}</p>
                <p>Owner: {verificationResult.ticketInfo.ticketOwner}</p>
                <p>Contract: {verificationResult.ticketInfo.contractAddress}</p>
                <p>Verified At: {verificationResult.ticketInfo.verifiedAt}</p>
                <p>Scanned By: {verificationResult.ticketInfo.scannedBy}</p>
              </div>
            )}
            <button 
              className="scan-another-button"
              onClick={resetScanner}
            >
              Scan Another Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketScanner; 