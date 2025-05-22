import { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';

interface WalletConnectorProps {
  onConnect: (address: string, provider: BrowserProvider) => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ onConnect }) => {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && window.ethereum !== undefined;
  };

  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    try {
      setConnecting(true);
      setError(null);

      // Request wallet connections
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];

      // Create a Web3Provider instance
      const provider = new BrowserProvider(window.ethereum);

      // Notify parent component of successful connection
      onConnect(address, provider);
      setConnected(true);
    } catch (error: unknown) {
      console.error('Error connecting to wallet:', error);
      setError(error instanceof Error ? error.message : 'Failed to connect to wallet');
    } finally {
      setConnecting(false);
    }
  };

  // Check if already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskInstalled()) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const provider = new BrowserProvider(window.ethereum);
            onConnect(accounts[0], provider);
            setConnected(true);
          }
        } catch (error: unknown) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkConnection();
  }, [onConnect]);

  return (
    <div className="wallet-connector">
      {error && (
        <div className="error-message">
          <p>{error}</p>
          {!isMetaMaskInstalled() && (
            <a 
              href="https://metamask.io/download/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="install-link"
            >
              Install MetaMask
            </a>
          )}
        </div>
      )}
      
      <button 
        onClick={connectWallet} 
        disabled={connecting || connected}
        className={`connect-button ${connecting ? 'connecting' : ''} ${connected ? 'connected' : ''}`}
      >
        {connecting 
          ? 'Connecting...' 
          : connected 
            ? 'Wallet Connected' 
            : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default WalletConnector;

// Add TypeScript declarations for window.ethereum
declare global {
  interface Window {
    ethereum: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      isMetaMask?: boolean;
    };
  }
} 