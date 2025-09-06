import React from 'react';
import './Button.css';

const Button = React.memo(({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  style = {},
  ariaLabel,
  ...props
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      style={style}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;