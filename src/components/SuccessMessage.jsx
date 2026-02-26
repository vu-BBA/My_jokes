function SuccessMessage({ message }) {
  if (!message) return null;
  
  return (
    <div className="success-message">
      <span className="success-icon">✓</span>
      <p>{message}</p>
    </div>
  );
}

export default SuccessMessage;
