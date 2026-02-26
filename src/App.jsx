import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllJokes from './pages/AllJokes';
import AddJoke from './pages/AddJoke';
import EditJoke from './pages/EditJoke';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>کچھ غلط ہو گیا!</h1>
          <p>براہ کرم صفحہ کو ریفریش کریں</p>
          <button onClick={() => window.location.reload()}>ریفریش کریں</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<div className="container"><Home /></div>} />
              <Route path="/jokes" element={<div className="container"><AllJokes /></div>} />
              <Route path="/add" element={<div className="container"><AddJoke /></div>} />
              <Route path="/edit/:id" element={<div className="container"><EditJoke /></div>} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
