

import { useState } from 'react';

function AddJoke() {
  const [joke, setJoke] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('https://joke-backend-azure.vercel.app/api/jokes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ joke, author }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add joke');
      }

      setSuccess('🎉 جوک کامیابی سے شامل ہو گیا!');
      setJoke('');
      setAuthor('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-joke">
      <h1>جوک شامل کریں</h1>
      <p className="subtitle">اپنا جوک بھیجیں اور ہنرائیں!</p>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit} className="joke-form">
        <div className="form-group">
          <label htmlFor="joke">جوک</label>
          <textarea
            id="joke"
            value={joke}
            onChange={(e) => setJoke(e.target.value)}
            placeholder="اپنا جوک یہاں لکھیں..."
            required
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">نام</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="اپنا نام لکھیں..."
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'جوک بھیجیں'}
        </button>
      </form>
    </div>
  );
}

export default AddJoke;
