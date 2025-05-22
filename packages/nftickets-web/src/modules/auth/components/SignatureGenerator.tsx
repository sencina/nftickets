import { useState } from 'react';
import { BrowserProvider } from 'ethers';

interface SignatureGeneratorProps {
  walletAddress: string;
  provider: BrowserProvider;
  onSignatureGenerated: (signature: string, message: string) => void;
}

const SignatureGenerator: React.FC<SignatureGeneratorProps> = ({ 
  walletAddress, 
  provider,
  onSignatureGenerated 
}) => {
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signatureComplete, setSignatureComplete] = useState(false);

  // Default message for NFTickets authentication
  const defaultMessage = `Generate API key for NFTickets\nAddress: ${walletAddress}\nTimestamp: ${Date.now()}`;

  const generateSignature = async () => {
    try {
      setSigning(true);
      setError(null);

      // Get the signer from the provider
      const signer = await provider.getSigner();
      
      // Sign the message
      const message = defaultMessage;
      const signature = await signer.signMessage(message);
      
      // Pass signature back to parent component
      onSignatureGenerated(signature, message);
      setSignatureComplete(true);
    } catch (error: unknown) {
      console.error('Error signing message:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign message');
    } finally {
      setSigning(false);
    }
  };

  return (
    <div className="signature-generator">
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      <div className="message-preview">
        <h3>Message to sign:</h3>
        <pre>{defaultMessage}</pre>
      </div>
      
      <button 
        onClick={generateSignature} 
        disabled={signing || signatureComplete}
        className={`sign-button ${signing ? 'signing' : ''} ${signatureComplete ? 'signed' : ''}`}
      >
        {signing 
          ? 'Signing...' 
          : signatureComplete 
            ? 'Signature Complete' 
            : 'Sign Message'}
      </button>
      
      {signatureComplete && (
        <div className="success-message">
          <p>Signature generated successfully!</p>
        </div>
      )}
    </div>
  );
};

export default SignatureGenerator; 