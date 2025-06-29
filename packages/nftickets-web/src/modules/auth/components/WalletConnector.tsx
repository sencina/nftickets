import React, { useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';
import './WalletConnector.css';

interface WalletConnectorProps {
  onConnect: (address: string, provider: BrowserProvider) => void;
}

declare global {
  interface Window {
    ethereum: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      selectedAddress?: string;
      networkVersion: string;
      providers?: any[];
    };
  }
}

const AMOY_CHAIN_ID = '0x13882'; // 80002 in decimal
const AMOY_CHAIN_CONFIG = {
  chainId: AMOY_CHAIN_ID,
  chainName: 'Polygon Amoy',
  nativeCurrency: {
    name: 'POL',
    symbol: 'POL',
    decimals: 18
  },
  rpcUrls: ['https://rpc-amoy.polygon.technology'],
  blockExplorerUrls: ['https://amoy.polygonscan.com']
};

export const WalletConnector: React.FC<WalletConnectorProps> = ({ onConnect }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      
      // Create a provider
      const provider = new BrowserProvider(window.ethereum as any);
      const network = await provider.getNetwork();

      // Check if we're on the correct network (Amoy)
      if (network.chainId !== BigInt(parseInt(AMOY_CHAIN_ID, 16))) {
        // Request network switch to Amoy
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: AMOY_CHAIN_ID }],
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [AMOY_CHAIN_CONFIG]
            });
          } else {
            throw switchError;
          }
        }
      }

      setWalletAddress(address);
      setIsConnected(true);
      onConnect(address, provider);
      setError(null);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError(error instanceof Error ? error.message : 'Failed to connect wallet');
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            const provider = new BrowserProvider(window.ethereum as any);
            const network = await provider.getNetwork();
            
            if (network.chainId === BigInt(parseInt(AMOY_CHAIN_ID, 16))) {
              setWalletAddress(accounts[0]);
              setIsConnected(true);
              onConnect(accounts[0], provider);
            }
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    checkConnection();

    // Add event listeners
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        if (accounts.length > 0) {
          const provider = new BrowserProvider(window.ethereum as any);
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          onConnect(accounts[0], provider);
        } else {
          setWalletAddress(null);
          setIsConnected(false);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    // Cleanup
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, [onConnect]);

  return (
    <div className="wallet-connector">
      {!isConnected ? (
        <button onClick={connectWallet} className="connect-button">
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <span className="wallet-address">
            {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
          </span>
          <div className="connection-status connected">
            <span className="status-dot"></span>
            Connected
          </div>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}; 