import { useEffect, useState } from 'react';
import QRScanner from '../modules/scanner/QRScanner';
import ErrorBoundary from '../components/ErrorBoundary';
import '../modules/scanner/QRScanner.css';
import './ScannerPage.css';

const ScannerPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleScanSuccess = (result: any) => {
    console.log('Scan successful:', result);
    // You can add additional logic here, like navigation or notifications
  };

  if (!isMobile) {
    return (
      <div className="desktop-message">
        <div className="message-container">
          <h1>📱 Mobile Only</h1>
          <p>The QR Scanner is designed for mobile devices only.</p>
          <p>Please open this page on your mobile device to scan NFTicket QR codes.</p>
          <div className="qr-instructions">
            <h3>How to access on mobile:</h3>
            <ol>
              <li>Open your mobile browser</li>
              <li>Navigate to this URL: <code>{window.location.href}</code></li>
              <li>Grant camera permissions when prompted</li>
              <li>Start scanning NFTicket QR codes!</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="scanner-page">
      <ErrorBoundary>
        <QRScanner onScanSuccess={handleScanSuccess} />
      </ErrorBoundary>
    </div>
  );
};

export default ScannerPage; 