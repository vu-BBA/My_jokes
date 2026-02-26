import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJokes } from '../hooks/useJokes';
import JokeForm from '../components/JokeForm';
import { ErrorMessage, SuccessMessage, LoadingSpinner } from '../components/ui/Feedback';
import api from '../services/api';

function EditJoke() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateJoke, loading: hookLoading, error: hookError, success: hookSuccess, clearMessages } = useJokes();
  
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const data = await api.jokes.getById(id);
        setJoke(data);
      } catch (err) {
        setError(err.message || 'جوک لائن کرنے میں خرابی ہوئی');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJoke();
    }

    return () => clearMessages();
  }, [id, clearMessages]);

  const handleSubmit = async (formData) => {
    try {
      await updateJoke(id, formData);
      setTimeout(() => {
        navigate('/jokes');
      }, 1500);
    } catch (err) {
      // Error handled by hook
    }
  };

  const handleCancel = () => {
    navigate('/jokes');
  };

  if (loading) {
    return (
      <div className="edit-joke">
        <LoadingSpinner text="جوک لوڈ ہو رہا ہے..." />
      </div>
    );
  }

  if (error && !joke) {
    return (
      <div className="edit-joke">
        <ErrorMessage 
          message={error} 
          onRetry={() => window.location.reload()} 
        />
        <button onClick={handleCancel} className="cancel-btn">
          جوکس پر واپس جائیں
        </button>
      </div>
    );
  }

  return (
    <div className="edit-joke">
      <div className="page-header">
        <h1>جوک ترمیم کریں</h1>
        <p className="subtitle">اپنے جوک کو اپڈیٹ کریں</p>
      </div>

      {hookError && (
        <ErrorMessage 
          message={hookError} 
          onDismiss={clearMessages} 
        />
      )}
      {hookSuccess && (
        <SuccessMessage 
          message={hookSuccess} 
          onDismiss={clearMessages} 
        />
      )}

      {joke && (
        <JokeForm 
          onSubmit={handleSubmit} 
          initialData={joke} 
          loading={hookLoading}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default EditJoke;
