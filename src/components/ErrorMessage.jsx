function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-message">
        <span className="error-icon">⚠️</span>
        <p>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="retry-btn">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;
