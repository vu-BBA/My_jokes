import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/ui/Feedback';

export default function ProtectedRoute({ children }) {
  const { isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-page">
        <LoadingSpinner text="توثیق ہو رہی ہے..." />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" state={{ from: location, denied: true }} replace />;
  }

  return children;
}
