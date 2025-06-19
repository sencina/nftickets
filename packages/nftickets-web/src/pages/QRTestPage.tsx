import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

// Sample QR data for testing
const sampleQRData = {
  tokenId: "1",
  contractAddress: "0x1234567890123456789012345678901234567890",
  eventId: "550e8400-e29b-41d4-a716-446655440000",
  eventName: "Test Concert",
  sectorName: "VIP",
  sectorId: 0,
  ticketOwner: "0x9876543210987654321098765432109876543210",
  timestamp: Date.now(),
  signature: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
};

const QRTestPage: React.FC = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateQR();
  }, []);

  const generateQR = async () => {
    setLoading(true);
    
    try {
      const qrString = JSON.stringify(sampleQRData);
      const dataUrl = await QRCode.toDataURL(qrString, {
        errorCorrectionLevel: 'M',
        type: 'image/png',
        quality: 0.92,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        width: 400
      });
      
      setQrDataUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentUrl = window.location.origin + '/scanner';

  return (
    <div className="qr-test-page">
      <div className="qr-test-container">
        <div className="test-header">
          <h1>📱 NFTicket QR Test</h1>
          <p>Scan this QR code with your mobile device to test the scanner</p>
        </div>

        {loading ? (
          <div className="loading">
            <p>Generating QR code...</p>
          </div>
        ) : (
          qrDataUrl && (
            <div className="qr-display">
              <div className="qr-code">
                <img src={qrDataUrl} alt="Test NFTicket QR Code" />
              </div>
              
              <div className="qr-info">
                <h3>Test Ticket Info:</h3>
                <p><strong>Event:</strong> {sampleQRData.eventName}</p>
                <p><strong>Sector:</strong> {sampleQRData.sectorName}</p>
                <p><strong>Token ID:</strong> {sampleQRData.tokenId}</p>
                <p><strong>Owner:</strong> {sampleQRData.ticketOwner.slice(0, 6)}...{sampleQRData.ticketOwner.slice(-4)}</p>
              </div>

              <div className="scanner-instructions">
                <h3>How to test:</h3>
                <ol>
                  <li>Open your mobile browser</li>
                  <li>Go to: <code>{currentUrl}</code></li>
                  <li>Grant camera permissions</li>
                  <li>Enter any wallet address as "Scanner Wallet"</li>
                  <li>Point your camera at this QR code</li>
                  <li>The verification will fail (expected) since this is test data</li>
                </ol>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default QRTestPage; 