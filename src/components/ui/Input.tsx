import React, { useState } from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  className = '',
  style = {},
  id,
  name
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle: React.CSSProperties = {
    marginBottom: 'clamp(12px, 3vw, 15px)',
    width: '100%',
    ...style
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 'clamp(4px, 1vw, 5px)',
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    fontWeight: '500',
    color: 'var(--text-color)',
    transition: 'color 0.3s ease'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px)',
    fontSize: 'clamp(14px, 3vw, 16px)',
    border: `2px solid ${error ? '#dc3545' : (isFocused ? 'var(--nav-active-border)' : 'var(--border-color)')}`,
    borderRadius: '6px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: disabled ? '#f8f9fa' : 'var(--input-bg)',
    color: disabled ? '#6c757d' : 'var(--text-color)',
    cursor: disabled ? 'not-allowed' : 'text',
    boxSizing: 'border-box' as const,
    boxShadow: isFocused ? 'var(--hover-shadow)' : 'var(--shadow)'
  };

  const errorStyle: React.CSSProperties = {
    color: '#dc3545',
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    marginTop: 'clamp(4px, 1vw, 5px)',
    display: error ? 'block' : 'none'
  };

  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;

  return (
    <div style={containerStyle} className={className}>
      {label && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
          {required && <span style={{ color: '#dc3545', marginLeft: '2px' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        style={inputStyle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;