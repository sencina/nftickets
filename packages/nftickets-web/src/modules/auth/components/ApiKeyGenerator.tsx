import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface ApiKeyGeneratorProps {
  walletAddress: string;
  signature: string;
  message: string;
  apiUrl?: string;
}

const ApiKeyGenerator: React.FC<ApiKeyGeneratorProps> = ({
  walletAddress,
  signature,
  message,
  apiUrl = 'http://localhost:3000/api/apikey/generate'
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const generateApiKey = async () => {
    try {
      setLoading(true);
      setError(null);

      // Make API request to generate an API key
      const response = await axios.post(apiUrl, {
        walletAddress,
        signature,
        message
      });

      if (response.data.success && response.data.apiKey) {
        setApiKey(response.data.apiKey);
      } else {
        throw new Error(response.data.message || 'Failed to generate API key');
      }
    } catch (error: unknown) {
      console.error('Error generating API key:', error);
      if (error instanceof AxiosError) {
        setError(
          error.response?.data?.message || 
          error.message || 
          'Failed to generate API key'
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
    }
  };

  return (
    <div className="api-key-generator">
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      {!apiKey ? (
        <button 
          onClick={generateApiKey} 
          disabled={loading}
          className={`generate-button ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Generating API Key...' : 'Generate API Key'}
        </button>
      ) : (
        <div className="api-key-container">
          <h3>Your API Key:</h3>
          <div className="api-key">
            <code>{apiKey}</code>
            <button 
              onClick={copyToClipboard}
              className="copy-button"
              title="Copy to clipboard"
            >
              Copy
            </button>
          </div>
          <div className="api-key-instructions">
            <p>
              Use this API key for authentication when making requests to the NFTickets API.
              Keep this key secure and don't share it publicly.
            </p>
            <p>
              <strong>Example:</strong> Include the API key in your requests as a Bearer token:
            </p>
            <pre>
              {`Authorization: Bearer ${apiKey}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeyGenerator; 