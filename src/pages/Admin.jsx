import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { LoadingSpinner, ErrorMessage, SuccessMessage, EmptyState } from '../components/ui/Feedback';

const JOKE_EMOJIS = [];

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const getRandomEmoji = (index) => {
    return JOKE_EMOJIS[index % JOKE_EMOJIS.length];
  };

  const fetchJokes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.jokes.getAll();
      setJokes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'جوکس لائن کرنے میں خرابی ہوئی');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('کیا آپ واقعی اس جوک کو حذف کرنا چاہتے ہیں؟')) {
      return;
    }

    setDeletingId(id);
    setError(null);
    setSuccess(null);

    try {
      await api.jokes.delete(id);
      setSuccess('🎉 جوک کامیابی سے حذف ہو گیا!');
      setJokes((prev) => prev.filter((j) => j._id !== id));
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'جوک حذف کرنے میں خرابی ہوئی');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-page">
      <div className="admin-hero">
        <div className="admin-hero-content">
          <div className="admin-hero-text">
            <h1>ایڈمن پینل</h1>
            <p>جوکس مینیج کریں</p>
          </div>
          <div className="admin-user-info">
            <div className="admin-avatar">🙎‍♀️</div>
            <div className="admin-user-details">
              <span className="admin-welcome">خوش آمدید</span>
              <span className="admin-username">{user?.name || 'ایڈمن'}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              لاگ آؤٹ
            </button>
          </div>
        </div>
        <div className="admin-hero-bg"></div>
      </div>

      <div className="admin-content">
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={fetchJokes} 
            onDismiss={() => setError(null)} 
          />
        )}
        {success && (
          <SuccessMessage 
            message={success} 
            onDismiss={() => setSuccess(null)} 
          />
        )}

          <div className="admin-stats-row">
          <div className="stat-card">
            <div className="stat-icon">🧐</div>
            <div className="stat-info">
              <span className="stat-number">{jokes.length}</span>
              <span className="stat-label">کل جوکس</span>
            </div>
          </div>
          <button onClick={fetchJokes} className="refresh-btn-card" disabled={loading}>
            {loading ? <span className="btn-spinner"></span> : '↻'} ریفریش
          </button>
        </div>

        <div className="jokes-section">
          <div className="section-header">
            <h2> جوکس کی فہرست</h2>
            <span className="joke-count">{jokes.length} جوکس</span>
          </div>

          {loading && jokes.length === 0 ? (
            <LoadingSpinner text="جوکس لوڈ ہو رہے ہیں..." />
          ) : jokes.length === 0 ? (
            <EmptyState 
              message="کوئی جوک نہیں ملی۔" 
              icon="😄" 
            />
          ) : (
            <div className="jokes-table">
              <div className="table-header">
                <span className="col-num">#</span>
                <span className="col-title">جوک</span>
                <span className="col-author">مصنف</span>
                <span className="col-date">تاریخ</span>
                <span className="col-actions">ایکشن</span>
              </div>
              <div className="table-body">
                {jokes.map((joke, index) => (
                  <div key={joke._id} className="table-row">
                    <span className="col-num">{index + 1}</span>
                    <span className="col-title">
                      <span className="joke-title-text">{joke.joke?.slice(0, 60) || '...'}</span>
                    </span>
                    <span className="col-author">{joke.author || '-'}</span>
                    <span className="col-date">
                      {joke.date ? new Date(joke.date).toLocaleDateString('ur') : 
                       joke.createdAt ? new Date(joke.createdAt).toLocaleDateString('ur') : '-'}
                    </span>
                    <span className="col-actions">
                      <button
                        onClick={() => handleDelete(joke._id)}
                        disabled={deletingId === joke._id}
                        className="delete-btn"
                      >
                        {deletingId === joke._id ? (
                          <>
                            <span className="btn-spinner"></span>
                            حذف...
                          </>
                        ) : (
                          'حذف'
                        )}
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
