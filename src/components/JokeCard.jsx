import { useState } from 'react';
import { SuccessMessage } from './ui/Feedback';

function JokeCard({ joke, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ joke: joke.joke, author: joke.author });
  const [errors, setErrors] = useState({});
  const [localSuccess, setLocalSuccess] = useState('');

  const validateForm = (form) => {
    const newErrors = {};
    if (!form.joke.trim()) {
      newErrors.joke = 'جوک ضروری ہے';
    } else if (form.joke.trim().length < 3) {
      newErrors.joke = 'جوک کم از کم 3 حروف کا ہونا چاہیے';
    }
    if (!form.author.trim()) {
      newErrors.author = 'نام ضروری ہے';
    } else if (form.author.trim().length < 2) {
      newErrors.author = 'نام کم از کم 2 حروف کا ہونا چاہیے';
    }
    return newErrors;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({ joke: joke.joke, author: joke.author });
    setLocalSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    setEditForm({ joke: joke.joke, author: joke.author });
  };

  const handleSave = async () => {
    const validationErrors = validateForm(editForm);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onUpdate(joke.id || joke._id, editForm);
      setIsEditing(false);
      setLocalSuccess('جوک اپڈیٹ ہو گیا!');
      setTimeout(() => setLocalSuccess(''), 3000);
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'نامعلوم';
    return new Date(dateString).toLocaleDateString('ur-PK');
  };

  return (
    <div className="joke-card">
      {localSuccess && <SuccessMessage message={localSuccess} />}
      
      {isEditing ? (
        <div className="joke-edit-form">
          <div className="form-group">
            <label htmlFor={`edit-joke-${joke.id}`}>جوک</label>
            <textarea
              id={`edit-joke-${joke.id}`}
              value={editForm.joke}
              onChange={(e) => setEditForm({ ...editForm, joke: e.target.value })}
              rows={3}
            />
            {errors.joke && <span className="field-error">{errors.joke}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor={`edit-author-${joke.id}`}>نام</label>
            <input
              type="text"
              id={`edit-author-${joke.id}`}
              value={editForm.author}
              onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
            />
            {errors.author && <span className="field-error">{errors.author}</span>}
          </div>

          {errors.submit && <div className="error">{errors.submit}</div>}

          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">محفوظ کریں</button>
            <button onClick={handleCancel} className="cancel-btn">منسوخ</button>
          </div>
        </div>
      ) : (
        <>
          <p className="joke-text">{joke.joke}</p>
          <div className="joke-meta">
            <span className="author">{joke.author}</span>
            <span className="date">{formatDate(joke.date)}</span>
          </div>
          {onUpdate && (
            <div className="joke-actions">
              <button onClick={handleEdit} className="edit-btn">ایڈٹ</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default JokeCard;
