import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  style = {},
  type = 'button',
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const baseStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
    ...style
  };

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: disabled ? '#cccccc' : 'var(--button-bg)',
      color: 'white',
      boxShadow: disabled ? 'none' : '0 2px 4px rgba(0, 123, 255, 0.2)'
    },
    secondary: {
      backgroundColor: disabled ? '#cccccc' : '#6c757d',
      color: 'white',
      boxShadow: disabled ? 'none' : '0 2px 4px rgba(108, 117, 125, 0.2)'
    },
    success: {
      backgroundColor: disabled ? '#cccccc' : '#28a745',
      color: 'white',
      boxShadow: disabled ? 'none' : '0 2px 4px rgba(40, 167, 69, 0.2)'
    },
    danger: {
      backgroundColor: disabled ? '#cccccc' : '#dc3545',
      color: 'white',
      boxShadow: disabled ? 'none' : '0 2px 4px rgba(220, 53, 69, 0.2)'
    },
    outline: {
      backgroundColor: 'transparent',
      color: disabled ? '#cccccc' : 'var(--primary-color)',
      border: disabled ? '1px solid #cccccc' : '1px solid var(--primary-color)',
      boxShadow: disabled ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)'
    }
  };

  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    small: {
      padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)',
      fontSize: 'clamp(12px, 2.5vw, 14px)',
      minWidth: 'clamp(100px, 20vw, 120px)'
    },
    medium: {
      padding: 'clamp(10px, 2.5vw, 12px) clamp(18px, 4vw, 24px)',
      fontSize: 'clamp(14px, 3vw, 16px)',
      minWidth: 'clamp(140px, 30vw, 180px)'
    },
    large: {
      padding: 'clamp(12px, 3vw, 16px) clamp(24px, 5vw, 32px)',
      fontSize: 'clamp(16px, 3.5vw, 18px)',
      minWidth: 'clamp(180px, 40vw, 240px)'
    }
  };

  const combinedStyle = {
    ...baseStyle,
    ...variantStyles[variant],
    ...sizeStyles[size]
  };

  const getHoverStyles = (): React.CSSProperties => {
    if (disabled) return {};
    
    const hoverColors = {
      primary: 'var(--button-hover-bg)',
      secondary: '#5a6268',
      success: '#1e7e34',
      danger: '#c82333',
      outline: 'var(--primary-color)'
    };

    return {
      backgroundColor: variant === 'outline' ? 'var(--primary-color)' : hoverColors[variant],
      color: variant === 'outline' ? 'white' : undefined,
      transform: 'translateY(-3px) scale(1.05)',
      boxShadow: `0 6px 20px rgba(0, 0, 0, 0.2)`,
      filter: 'brightness(1.1)'
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      const hoverStyles = getHoverStyles();
      Object.assign(e.currentTarget.style, hoverStyles);
    }
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      Object.assign(e.currentTarget.style, combinedStyle);
    }
    onMouseLeave?.(e);
  };

  return (
    <button
      type={type}
      className={className}
      style={combinedStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;