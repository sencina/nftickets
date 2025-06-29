import { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { WalletConnector } from './modules/auth/components/WalletConnector';
import SignatureGenerator from './modules/auth/components/SignatureGenerator';
import ApiKeyGenerator from './modules/auth/components/ApiKeyGenerator';
import { Dashboard } from './components/Dashboard';
import EventCreator from './components/EventCreator';
import WebGLBackground from './modules/background/WebGLBackground';
import ParticleAnimation from './modules/animations/ParticleAnimation';
import FloatingTicket from './modules/animations/FloatingTicket';
import { LogOut, Plus, BarChart3 } from 'lucide-react';
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
  const [apiKey, setApiKey] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const [animatingStep, setAnimatingStep] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'create'>('dashboard');
  const [showEventCreator, setShowEventCreator] = useState(false);

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

  // Load saved auth data on component mount (only if not logged out)
  useEffect(() => {
    const hasLoggedOut = localStorage.getItem('nftickets_logged_out');
    if (hasLoggedOut === 'true') {
      return; // Don't restore if user logged out
    }

    // Restore saved auth data
    const savedApiKey = localStorage.getItem('nftickets_api_key');
    const savedSignature = localStorage.getItem('nftickets_signature');
    const savedMessage = localStorage.getItem('nftickets_message');

    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    if (savedSignature) {
      setSignature(savedSignature);
    }
    if (savedMessage) {
      setMessage(savedMessage);
    }

    // Set appropriate step based on saved data
    if (savedApiKey && savedSignature && savedMessage) {
      // All auth steps completed
      setCurrentStep(3);
    } else if (savedSignature && savedMessage) {
      // Only signature completed
      setCurrentStep(3);
    }
  }, []);

  // Handle wallet connection - go directly to dashboard
  const handleConnect = (address: string) => {
    setWalletAddress(address);
  };

  // Handle signature generation
  const handleSignature = (generatedSignature: string, signedMessage: string) => {
    setSignature(generatedSignature);
    setMessage(signedMessage);
    
    // Save to localStorage for persistence
    localStorage.setItem('nftickets_signature', generatedSignature);
    localStorage.setItem('nftickets_message', signedMessage);
    
    animateToNextStep(3);
  };

  // Handle API key generation
  const handleApiKey = (generatedApiKey: string) => {
    setApiKey(generatedApiKey);
    
    // Save to localStorage for persistence
    localStorage.setItem('nftickets_api_key', generatedApiKey);
  };

  // Handle logout
  const handleLogout = () => {
    // Set logout flag to prevent auto-reconnection
    localStorage.setItem('nftickets_logged_out', 'true');
    
    // Clear all stored auth data
    localStorage.removeItem('nftickets_api_key');
    localStorage.removeItem('nftickets_signature');
    localStorage.removeItem('nftickets_message');
    
    // Reset all state
    setWalletAddress(null);
    setProvider(null);
    setSignature(null);
    setMessage(null);
    setApiKey('');
    setCurrentStep(1);
    setCurrentPage('dashboard');
    setShowEventCreator(false);
  };

  // Animate to the next step
  const animateToNextStep = (nextStep: number) => {
    setAnimatingStep(true);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setAnimatingStep(false);
    }, 500);
  };

  // Render auth flow
  const renderAuthFlow = () => (
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
      
      {/* Form container */}
      <div className="centered-auth-container">
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
                  onApiKeyGenerated={handleApiKey}
                />
              )}
            </div>
          </div>
        </div>


      </div>
    </div>
  );

  // Render navigation bar
  const renderNavBar = () => (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>NFTickets</h2>
        <div className="nav-wallet-info">
          <span className="nav-wallet">
            {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
          </span>
          <span className={`auth-status ${apiKey ? 'authenticated' : 'connected'}`}>
            {apiKey ? '✓ Authenticated' : '○ Connected'}
          </span>
        </div>
      </div>
      <div className="nav-links">
        <button 
          className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentPage('dashboard')}
        >
          <BarChart3 size={18} />
          Dashboard
        </button>
        <button 
          className="nav-btn create-btn"
          onClick={() => setShowEventCreator(true)}
        >
          <Plus size={18} />
          Create Event
        </button>
        <button className="nav-btn logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );

  // Render main application
  const renderMainApp = () => (
    <div className="main-app">
      {renderNavBar()}
      <main className="main-content">
        {currentPage === 'dashboard' && walletAddress && (
          <Dashboard apiKey={apiKey} walletAddress={walletAddress} />
        )}
      </main>
      
      {showEventCreator && (
                  <EventCreator
            apiKey={apiKey}
            walletAddress={walletAddress!}
            provider={provider!}
          onEventCreated={() => {
            setShowEventCreator(false);
            // Refresh dashboard data by forcing a re-render
            setCurrentPage('dashboard');
          }}
          onClose={() => setShowEventCreator(false)}
          onApiKeyGenerated={(newApiKey: string) => {
            setApiKey(newApiKey);
            localStorage.setItem('nftickets_api_key', newApiKey);
          }}
        />
      )}
    </div>
  );

  // Simple logic: wallet connected = dashboard, no wallet = auth flow
  if (walletAddress) {
    return renderMainApp();
  }

  return renderAuthFlow();
}

export default App;
