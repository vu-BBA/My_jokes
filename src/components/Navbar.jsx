import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">😄 جوکس ایپ</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/jokes">All Jokes</Link>
        <Link to="/add">Add Joke</Link>
      </div>
    </nav>
  );
}

export default Navbar;
