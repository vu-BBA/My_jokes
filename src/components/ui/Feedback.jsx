export function LoadingSpinner({ size = 'medium', text = 'لوڈ ہو رہا ہے...' }) {
  const sizeClass = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large',
  }[size];

  return (
    <div className="loading-container">
      <div className={`spinner ${sizeClass}`}></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
}

export function ErrorMessage({ message, onRetry, onDismiss }) {
  if (!message) return null;

  return (
    <div className="error-message">
      <span className="error-icon">⚠️</span>
      <span className="error-text">{message}</span>
      {onRetry && (
        <button className="error-retry-btn" onClick={onRetry}>
          دوبارہ کوشش کریں
        </button>
      )}
      {onDismiss && (
        <button className="error-dismiss-btn" onClick={onDismiss}>
          ×
        </button>
      )}
    </div>
  );
}

export function SuccessMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="success-message">
      <span className="success-icon">✓</span>
      <span className="success-text">{message}</span>
      {onDismiss && (
        <button className="success-dismiss-btn" onClick={onDismiss}>
          ×
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message = 'کوئی ڈیٹا نہیں ملی', icon = '📭' }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">{icon}</span>
      <p className="empty-message">{message}</p>
    </div>
  );
}
