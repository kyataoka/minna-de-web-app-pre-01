import React from 'react';
import './Input.css';

const Input = React.memo(({
  type = 'text',
  value,
  onChange,
  onKeyPress,
  placeholder = '',
  className = '',
  disabled = false,
  label,
  id,
  required = false,
  error,
  style = {},
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`input-container ${className}`} style={style}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-field ${error ? 'input-error' : ''}`}
        required={required}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

export default Input;