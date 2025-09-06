import React, { useState } from 'react';

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  name?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  rows = 5,
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

  const textAreaStyle: React.CSSProperties = {
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
    resize: 'vertical' as const,
    minHeight: '100px',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
    boxShadow: isFocused ? 'var(--hover-shadow)' : 'var(--shadow)'
  };

  const errorStyle: React.CSSProperties = {
    color: '#dc3545',
    fontSize: 'clamp(12px, 2.5vw, 14px)',
    marginTop: 'clamp(4px, 1vw, 5px)',
    display: error ? 'block' : 'none'
  };

  const textAreaId = id || `textarea-${name || Math.random().toString(36).substr(2, 9)}`;

  return (
    <div style={containerStyle} className={className}>
      {label && (
        <label htmlFor={textAreaId} style={labelStyle}>
          {label}
          {required && <span style={{ color: '#dc3545', marginLeft: '2px' }}>*</span>}
        </label>
      )}
      <textarea
        id={textAreaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        style={textAreaStyle}
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

export default TextArea;