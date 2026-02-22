

import { useState, useEffect } from 'react';

function AllJokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetchJokes();
    loadLikes();
  }, []);

  const loadLikes = () => {
    const stored = localStorage.getItem('joke_likes');
    if (stored) {
      setLikes(JSON.parse(stored));
    }
  };

  const handleLike = (jokeId) => {
    const newLikes = { ...likes };
    newLikes[jokeId] = (newLikes[jokeId] || 0) + 1;
    setLikes(newLikes);
    localStorage.setItem('joke_likes', JSON.stringify(newLikes));
  };

  const fetchJokes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://joke-backend-azure.vercel.app/api/jokes');
      if (!response.ok) throw new Error('Failed to fetch jokes');
      const data = await response.json();
      setJokes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="all-jokes">
      <h1>تمام جوکس</h1>
      <p className="subtitle">یہاں سے تمام جوکس دیکھیں</p>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="spinner"></div>
      ) : jokes.length === 0 ? (
        <div className="no-jokes">کوئی جوک نہیں ملی</div>
      ) : (
        <div className="jokes-grid">
          {jokes.map((joke) => (
            <div key={joke.id} className="joke-card">
              <p className="joke-text">{joke.joke}</p>
              <div className="joke-meta">
                <span>👤 {joke.author}</span>
                <span>📅 {joke.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllJokes;
