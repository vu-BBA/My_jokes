import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllJokes from './pages/AllJokes';
import AddJoke from './pages/AddJoke';
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
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jokes" element={<AllJokes />} />
              <Route path="/add" element={<AddJoke />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
