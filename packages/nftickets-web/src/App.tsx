import { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { Link } from 'react-router-dom';
import WalletConnector from './modules/auth/components/WalletConnector';
import SignatureGenerator from './modules/auth/components/SignatureGenerator';
import ApiKeyGenerator from './modules/auth/components/ApiKeyGenerator';
import WebGLBackground from './modules/background/WebGLBackground';
import ParticleAnimation from './modules/animations/ParticleAnimation';
import FloatingTicket from './modules/animations/FloatingTicket';
import './modules/auth/components/AuthContainer.css';
import './App.css';

// Check if WebGL is supported
const isWebGLSupported = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
};

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [animatingStep, setAnimatingStep] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Check WebGL support and screen size on component mount
  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
    
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle wallet connection
  const handleConnect = (address: string, providerInstance: BrowserProvider) => {
    setWalletAddress(address);
    setProvider(providerInstance);
    animateToNextStep(2);
  };

  // Handle signature generation
  const handleSignature = (generatedSignature: string, signedMessage: string) => {
    setSignature(generatedSignature);
    setMessage(signedMessage);
    animateToNextStep(3);
  };

  // Animate to the next step
  const animateToNextStep = (nextStep: number) => {
    setAnimatingStep(true);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setAnimatingStep(false);
    }, 500);
  };

  return (
    <div className="app-container">
      {/* Background Elements - only show if WebGL is supported */}
      {webGLSupported ? (
        <>
          <WebGLBackground color="#1a88ff" />
          <ParticleAnimation count={40} speed={0.3} />
          
          {/* Only show floating ticket on larger screens with WebGL support */}
          {!isSmallScreen && (
            <>
              <FloatingTicket position={{ x: -4, y: 2, z: 0 }} />
              <FloatingTicket position={{ x: 4, y: -2, z: 0 }} color="#10b981" />
              <FloatingTicket position={{ x: 0, y: -5, z: 1 }} color="#f59e0b" />
            </>
          )}
        </>
      ) : (
        <div 
          style={{ 
            position: 'fixed', 
            bottom: '10px', 
            left: '10px', 
            background: 'rgba(0,0,0,0.7)', 
            color: 'white', 
            padding: '10px', 
            borderRadius: '5px', 
            zIndex: 100 
          }}
        >
          WebGL not supported by your browser. 3D animations disabled.
        </div>
      )}
      
      {/* Decorative glow circles */}
      <div className="circle-glow" style={{ width: '600px', height: '600px', top: '10%', left: '0', opacity: 0.05 }}></div>
      <div className="circle-glow" style={{ width: '400px', height: '400px', bottom: '5%', right: '10%', opacity: 0.07 }}></div>
      
      {/* Form container - now directly using the centered class */}
      <div className="centered-auth-container">
        <div className="auth-header">
          <h1>NFTickets Web3 Auth</h1>
          <p>Connect your wallet to generate an API key for the NFTickets platform</p>
          
          {/* Scanner Link */}
          <div className="scanner-link-container">
            <Link to="/scanner" className="scanner-link">
              📱 Open NFT Scanner
            </Link>
            <Link to="/test-qr" className="scanner-link test-qr-link">
              🖥️ Show Test QR Code
            </Link>
          </div>
        </div>

        <div className="auth-steps">
          {/* Step 1: Connect Wallet */}
          <div className={`auth-step ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''} ${animatingStep && currentStep === 1 ? 'animating-out' : ''} ${animatingStep && currentStep === 2 ? 'animating-in' : ''}`}>
            <div className="auth-step-header">
              <div className="step-number">1</div>
              <div className="step-title">Connect Your Wallet</div>
            </div>
            <div className="step-content">
              {currentStep === 1 && (
                <WalletConnector onConnect={handleConnect} />
              )}
              {currentStep > 1 && (
                <div className="completed-step">
                  <p>Connected to wallet: <span className="highlight">{walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</span></p>
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Generate Signature */}
          <div className={`auth-step ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''} ${animatingStep && currentStep === 2 ? 'animating-out' : ''} ${animatingStep && currentStep === 3 ? 'animating-in' : ''}`}>
            <div className="auth-step-header">
              <div className="step-number">2</div>
              <div className="step-title">Sign Message</div>
            </div>
            <div className="step-content">
              {currentStep === 2 && walletAddress && provider && (
                <SignatureGenerator 
                  walletAddress={walletAddress}
                  provider={provider}
                  onSignatureGenerated={handleSignature}
                />
              )}
              {currentStep > 2 && (
                <div className="completed-step">
                  <p>Message signed successfully!</p>
                </div>
              )}
            </div>
          </div>

          {/* Step 3: Generate API Key */}
          <div className={`auth-step ${currentStep === 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
            <div className="auth-step-header">
              <div className="step-number">3</div>
              <div className="step-title">Generate API Key</div>
            </div>
            <div className="step-content">
              {currentStep === 3 && walletAddress && signature && message && (
                <ApiKeyGenerator 
                  walletAddress={walletAddress}
                  signature={signature}
                  message={message}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
