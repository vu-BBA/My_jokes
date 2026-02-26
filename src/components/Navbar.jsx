import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { isAdmin } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text"> جوکس ایپ</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            <span>جوکس🤓</span>
          </Link>
          <Link to="/jokes" className="nav-link">
            <span>🧐 تمام جوکس</span>
          </Link>
          <Link to="/add" className="nav-link">
            <span>جوک شامل کریں🤩</span>
          </Link>
          {isAdmin ? (
            <Link to="/admin" className="nav-link admin-link">
              <span>ایڈمن🙎‍♀️</span>
            </Link>
          ) : (
            <Link to="/admin/login" className="nav-link login-link">
              <span className="login-emoji">🙎‍♀️</span>
              <span>ایڈمن لاگ ان</span>
            </Link>
          )}
        </div>
        
        <button className="navbar-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
