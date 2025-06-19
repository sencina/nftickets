import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return (
        <div className="error-boundary">
          <div className="error-container">
            <h2>🚨 Something went wrong</h2>
            <p>The QR scanner encountered an error. This might be due to:</p>
            <ul>
              <li>Camera permissions not granted</li>
              <li>Browser not supporting camera access</li>
              <li>Network connectivity issues</li>
            </ul>
            <div className="error-details">
              <p><strong>Error:</strong> {this.state.error?.message}</p>
            </div>
            <button onClick={this.resetError} className="retry-button">
              Try Again
            </button>
            <div className="error-instructions">
              <h3>Troubleshooting:</h3>
              <ol>
                <li>Make sure you're using a mobile device</li>
                <li>Grant camera permissions when prompted</li>
                <li>Try refreshing the page</li>
                <li>Check your internet connection</li>
              </ol>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 