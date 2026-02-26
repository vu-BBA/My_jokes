import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/ui/Feedback';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userEmail = email.trim().toLowerCase();
      const pass = password.trim();

      if (!userEmail || !pass) {
        setError('براہ کرم ای میل اور پاس ورڈ درج کریں');
        setLoading(false);
        return;
      }

      const result = await login({ email: userEmail, password: pass });
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'غلی ای میل یا پاس ورڈ');
      }
    } catch (err) {
      setError('لاگ ان میں خرابی ہوئی');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-visual">
          <div className="login-visual-content">
            <h2>ایڈمن پینل</h2>
            <h2>🧕🏽</h2>
            <p>جوکس ایپ مینیج کریں</p>
          </div>
          <div className="login-visual-bg"></div>
        </div>
        
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo"></div>
            <h1>خوش آمدید</h1>
            <p>ایڈمن پینل تک رسائی کے لیے لاگ ان کریں</p>
          </div>

          {error && (
            <div className="login-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">ای میل</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ای میل درج کریں"
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">پاس ورڈ</label>
              <div className="input-wrapper">
                <span className="input-icon">🔑</span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="پاس ورڈ درج کریں"
                  disabled={loading}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? <LoadingSpinner size="small" text="" /> : 'لاگ ان کریں'}
            </button>
          </form>

          <div className="login-footer">
            <a href="/">← ہوم پیج پر واپس جائیں</a>
          </div>
        </div>
      </div>
    </div>
  );
}
