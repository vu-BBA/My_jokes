import { useState, useEffect } from 'react';

function JokeForm({ onSubmit, initialData = null, loading = false, onCancel }) {
  const [formData, setFormData] = useState({ joke: '', author: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({ joke: initialData.joke || '', author: initialData.author || '' });
    }
  }, [initialData]);

  const validate = (name, value) => {
    if (name === 'joke') {
      if (!value.trim()) return 'جوک ضروری ہے';
      if (value.trim().length < 3) return 'جوک کم از کم 3 حروف کا ہونا چاہیے';
      if (value.trim().length > 500) return 'جوک 500 حروف سے کم ہونا چاہیے';
    }
    if (name === 'author') {
      if (!value.trim()) return 'نام ضروری ہے';
      if (value.trim().length < 2) return 'نام کم از کم 2 حروف کا ہونا چاہیے';
      if (value.trim().length > 100) return 'نام 100 حروف سے کم ہونا چاہیے';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {
      joke: validate('joke', formData.joke),
      author: validate('author', formData.author),
    };
    
    setErrors(newErrors);
    setTouched({ joke: true, author: true });

    if (!newErrors.joke && !newErrors.author) {
      onSubmit(formData);
    }
  };

  const isValid = formData.joke.trim().length >= 3 && formData.author.trim().length >= 2;

  return (
    <form onSubmit={handleSubmit} className="joke-form" noValidate>
      <div className="form-group">
        <label htmlFor="joke">جوک</label>
        <textarea
          id="joke"
          name="joke"
          value={formData.joke}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="اپنا جوک یہاں لکھیں..."
          rows={4}
          className={touched.joke && errors.joke ? 'input-error' : ''}
          disabled={loading}
        />
        {touched.joke && errors.joke && (
          <span className="field-error">{errors.joke}</span>
        )}
        <span className="char-count">{formData.joke.length}/500</span>
      </div>

      <div className="form-group">
        <label htmlFor="author">نام</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="اپنا نام لکھیں..."
          className={touched.author && errors.author ? 'input-error' : ''}
          disabled={loading}
        />
        {touched.author && errors.author && (
          <span className="field-error">{errors.author}</span>
        )}
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading || !isValid}
        >
          {loading ? 'بھیج رہے ہیں...' : initialData ? 'اپڈیٹ کریں' : 'بھیجیں'}
        </button>
        {onCancel && (
          <button 
            type="button" 
            className="cancel-btn" 
            onClick={onCancel}
            disabled={loading}
          >
            منسوخ
          </button>
        )}
      </div>
    </form>
  );
}

export default JokeForm;
