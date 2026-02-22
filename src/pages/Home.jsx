import { useState, useEffect } from 'react';

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
      const response = await fetch('https://joke-backend-azure.vercel.app/api/jokes/random');
      if (!response.ok) throw new Error('Failed to fetch joke');

      const data = await response.json();
      setJoke(data);

      // Load likes for this joke
      const likeKey = `likes_${data.id}`;
      const likedKey = `liked_${data.id}`;

      const savedLikes = localStorage.getItem(likeKey);
      const savedLiked = localStorage.getItem(likedKey);

      setLikes(savedLikes ? parseInt(savedLikes) : 0);
      setLiked(savedLiked === "true");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    if (!joke || liked) return;

    const likeKey = `likes_${joke.id}`;
    const likedKey = `liked_${joke.id}`;

    const newLikes = likes + 1;
    setLikes(newLikes);
    setLiked(true);
    setAnimate(true);

    localStorage.setItem(likeKey, newLikes);
    localStorage.setItem(likedKey, true);

    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div className="home">
      <h1>Urdu Jokes</h1>
      <p className="subtitle">اپنا موڈ خوش کریں!</p>

      <button 
        className="fetch-btn" 
        onClick={fetchRandomJoke}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'نیا جوک لائیں'}
      </button>

      {error && <div className="error">{error}</div>}
      {loading && <div className="spinner"></div>}

      {joke && !loading && (
        <div className="joke-card">
          <p className="joke-text">{joke.joke}</p>

          <div className="joke-meta">
            <span>👤 {joke.author}</span>
            <span>📅 {joke.date}</span>
          </div>

          {/* ❤️ Animated Like Button */}
          <button
            onClick={handleLike}
            className="like-btn"
            style={{
              color: liked ? "#ff1744" : "#555",
              transform: animate ? "scale(1.5)" : "scale(1)",
              transition: "all 0.3s ease",
              fontSize: "20px",
              border: "none",
              background: "transparent",
              cursor: liked ? "default" : "pointer",
              marginTop: "10px"
            }}
          >
            ❤️ {likes}
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
