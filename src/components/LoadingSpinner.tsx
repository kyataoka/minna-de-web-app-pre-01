import React from 'react';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 40, 
  color = 'var(--nav-active-border)',
  text = '読み込み中...' 
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
      gap: '20px',
      padding: '40px'
    }}>
      <div
        style={{
          width: size,
          height: size,
          border: `3px solid transparent`,
          borderTop: `3px solid ${color}`,
          borderRight: `3px solid ${color}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          filter: 'drop-shadow(0 0 6px rgba(25, 118, 210, 0.3))'
        }}
      />
      <div style={{
        fontSize: '16px',
        color: 'var(--text-color)',
        fontWeight: '500',
        animation: 'pulse 2s ease-in-out infinite'
      }}>
        {text}
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;