import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJokes } from '../hooks/useJokes';
import JokeForm from '../components/JokeForm';
import { ErrorMessage, SuccessMessage } from '../components/ui/Feedback';

function AddJoke() {
  const navigate = useNavigate();
  const { createJoke, loading, error, success, clearMessages } = useJokes();

  useEffect(() => {
    clearMessages();
  }, [clearMessages]);

  const handleSubmit = async (formData) => {
    try {
      await createJoke(formData);
      setTimeout(() => {
        navigate('/jokes');
      }, 1500);
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <div className="add-joke">
      <div className="page-header">
        <h1>جوک شامل کریں</h1>
        <p className="subtitle">اپنا مزاحیہ جوک دنیا کے ساتھ شیئر کریں!</p>
      </div>

      {error && (
        <ErrorMessage 
          message={error} 
          onDismiss={clearMessages} 
        />
      )}
      {success && (
        <SuccessMessage 
          message={success} 
          onDismiss={clearMessages} 
        />
      )}

      <JokeForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}

export default AddJoke;
