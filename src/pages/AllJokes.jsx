import { useEffect } from 'react';
import { useJokes } from '../hooks/useJokes';
import JokeCard from '../components/JokeCard';
import { LoadingSpinner, ErrorMessage, SuccessMessage, EmptyState } from '../components/ui/Feedback';

function AllJokes() {
  const {
    jokes,
    loading,
    error,
    success,
    fetchJokes,
    deleteJoke,
    clearMessages,
  } = useJokes();

  useEffect(() => {
    fetchJokes();
  }, [fetchJokes]);

  const handleDelete = async (id) => {
    if (window.confirm('کیا آپ واقعی اس جوک کو حذف کرنا چاہتے ہیں؟')) {
      await deleteJoke(id);
    }
  };

  return (
    <div className="all-jokes">
      <div className="page-header">
        <h1>تمام جوکس</h1>
        <p className="subtitle">اپنے جوکس دیکھیں اور مینیج کریں</p>
        <button onClick={fetchJokes} className="refresh-btn" disabled={loading}>
          🔄 ریفریش
        </button>
      </div>

      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={fetchJokes} 
          onDismiss={clearMessages} 
        />
      )}
      {success && (
        <SuccessMessage 
          message={success} 
          onDismiss={clearMessages} 
        />
      )}

      {loading && jokes.length === 0 ? (
        <LoadingSpinner text="جوکس لوڈ ہو رہے ہیں..." />
      ) : jokes.length === 0 ? (
        <EmptyState 
          message="کوئی جوک نہیں ملی۔ اپنا پہلا جوک شامل کریں!" 
          icon="😄" 
        />
      ) : (
        <div className="jokes-grid">
          {jokes.map((joke) => (
            <JokeCard
              key={joke.id || joke._id}
              joke={joke}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllJokes;
