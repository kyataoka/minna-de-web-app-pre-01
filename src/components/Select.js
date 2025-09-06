import React from 'react';
import './Select.css';

const Select = React.memo(({
  value,
  onChange,
  options = [],
  placeholder = '選択してください',
  className = '',
  disabled = false,
  label,
  id,
  required = false,
  error,
  style = {},
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`select-container ${className}`} style={style}>
      {label && (
        <label htmlFor={selectId} className="select-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`select-field ${error ? 'select-error' : ''}`}
        required={required}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

export default Select;