import React, { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';
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

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

  useEffect(() => {
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

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const extractQRCode = (imageElement: HTMLImageElement): string | null => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return null;

    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    context.drawImage(imageElement, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    return code?.data || null;
  };

  const processImage = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const img = document.createElement('img');
        img.src = dataUrl;
        img.onload = () => {
          const qrData = extractQRCode(img);
          if (qrData) {
            setQrData(qrData);
          } else {
            setError('No QR code found in the image. Please try another image.');
          }
        };
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Failed to process image. Please try again.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    await processImage(file);
  };

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