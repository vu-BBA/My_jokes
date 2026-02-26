import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { ErrorMessage, LoadingSpinner } from '../components/ui/Feedback';

function Home() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);

  const fetchRandomJoke = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.jokes.getRandom();
      setJoke(data);

      const jokeId = data.id || data._id;
      const likeKey = `likes_${jokeId}`;
      const likedKey = `liked_${jokeId}`;

      setLikes(parseInt(localStorage.getItem(likeKey)) || 0);
      setLiked(localStorage.getItem(likedKey) === 'true');
    } catch (err) {
      setError(err.message || 'جوک لائن کرنے میں خرابی ہوئی');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomJoke();
  }, []);

  const handleLike = useCallback(() => {
    if (!joke || liked) return;

    const jokeId = joke.id || joke._id;
    const likeKey = `likes_${jokeId}`;
    const likedKey = `liked_${jokeId}`;

    const newLikes = likes + 1;
    setLikes(newLikes);
    setLiked(true);
    setAnimate(true);

    localStorage.setItem(likeKey, newLikes);
    localStorage.setItem(likedKey, 'true');

    setTimeout(() => setAnimate(false), 300);
  }, [joke, liked, likes]);

  const formatDate = (dateString) => {
    if (!dateString) return 'نامعلوم';
    return new Date(dateString).toLocaleDateString('ur-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="home">
      <h1> 😆اردو جوکس😆</h1>
      <p className="subtitle">اپنا موڈ خوش کریں!</p>

      <button 
        className="fetch-btn" 
        onClick={fetchRandomJoke}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'نیا جوک لائیں'}
      </button>

      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={fetchRandomJoke} 
          onDismiss={() => setError(null)} 
        />
      )}
      
      {loading && <LoadingSpinner text="جوک لوڈ ہو رہا ہے..." />}

      {joke && !loading && (
        <div className="joke-card">
          <p className="joke-text">{joke.joke}</p>

          <div className="joke-meta">
            <span>{joke.author || 'anonymous'}</span>
            <span>{formatDate(joke.createdAt || joke.date)}</span>
          </div>

          <button
            onClick={handleLike}
            className="like-btn"
            style={{
              color: liked ? '#ff1744' : '#555',
              transform: animate ? 'scale(1.5)' : 'scale(1)',
              transition: 'all 0.3s ease',
              fontSize: '20px',
              border: 'none',
              background: 'transparent',
              cursor: liked ? 'default' : 'pointer',
              marginTop: '10px',
            }}
          >
            {liked ? '♥' : '♡'} {likes}
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
