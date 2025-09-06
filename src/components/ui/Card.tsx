import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  style = {},
  onClick,
  hoverable = false
}) => {
  const baseCardStyle: React.CSSProperties = {
    backgroundColor: 'var(--input-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: 'clamp(16px, 4vw, 20px)',
    boxShadow: 'var(--shadow)',
    transition: 'all 0.3s ease',
    color: 'var(--text-color)',
    cursor: onClick ? 'pointer' : 'default',
    ...style
  };

  const hoverableStyle: React.CSSProperties = baseCardStyle;

  const titleStyle: React.CSSProperties = {
    margin: '0 0 clamp(12px, 3vw, 16px) 0',
    fontSize: 'clamp(16px, 4vw, 18px)',
    fontWeight: '600',
    color: 'var(--text-color)'
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverable || onClick) {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = 'var(--hover-shadow)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverable || onClick) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow)';
    }
  };

  return (
    <div
      className={className}
      style={hoverableStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {title && <h3 style={titleStyle}>{title}</h3>}
      {children}
    </div>
  );
};

export default Card;