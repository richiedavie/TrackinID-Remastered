import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px 20px',
          textAlign: 'center',
          backgroundColor: '#0c0c0e',
          color: '#f3f4f6',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{
            maxWidth: '500px',
            padding: '32px',
            backgroundColor: '#16161a',
            border: '1px solid #2a2a32',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{ color: '#ef4444', marginTop: 0 }}>Application Error</h2>
            <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Something went wrong rendering this page. You can try refreshing the page or logging out and logging back in.
            </p>
            <pre style={{
              textAlign: 'left',
              backgroundColor: '#0d0d11',
              padding: '12px',
              borderRadius: '6px',
              overflowX: 'auto',
              fontSize: '0.8rem',
              color: '#f43f5e',
              border: '1px solid #27273a'
            }}>
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
              style={{ marginTop: '16px', cursor: 'pointer', padding: '10px 20px' }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
