import { useState } from 'react';

export function FormInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  maxLength,
  minLength,
}) {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  const showError = touched && error;

  return (
    <div className={`form-group ${showError ? 'has-error' : ''}`}>
      <label htmlFor={name}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        className={showError ? 'input-error' : ''}
      />
      {showError && <span className="field-error">{error}</span>}
    </div>
  );
}

export function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  minLength,
}) {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  const showError = touched && error;

  return (
    <div className={`form-group ${showError ? 'has-error' : ''}`}>
      <label htmlFor={name}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        minLength={minLength}
        className={showError ? 'input-error' : ''}
      />
      {showError && <span className="field-error">{error}</span>}
      {maxLength && (
        <span className="char-count">
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  );
}

export function FormButton({
  type = 'submit',
  children,
  disabled = false,
  loading = false,
  variant = 'primary',
  onClick,
  className = '',
}) {
  return (
    <button
      type={type}
      className={`form-button ${variant} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <span className="btn-loading">
          <span className="spinner-small"></span>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
