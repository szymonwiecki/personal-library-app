import { useState } from 'react';
import Notes from './Notes';
import './BookItem.css';

const BookItem = ({
  book,
  onDelete,
  onUpdate,
  onToggleFavorite,
  onNotesUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);

  const handleSave = async () => {
    await onUpdate(book._id, { title, author });
    setIsEditing(false);
  };

  return (
    <div className="book-card">
      {book.thumbnail && (
        <div className="book-thumbnail">
          <img src={book.thumbnail} alt={book.title} />
        </div>
      )}

      <div className="book-content">
        {isEditing ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            <div className="book-actions">
              <button onClick={handleSave}>💾 Zapisz</button>
              <button onClick={() => setIsEditing(false)}>
                ❌ Anuluj
              </button>
            </div>
          </>
        ) : (
          <>
            <h3>{book.title}</h3>
            <p>{book.author}</p>

            <div className="book-actions">
              <button
                onClick={() => onToggleFavorite(book._id)}
                title="Ulubione"
              >
                {book.isFavorite ? '⭐' : '☆'}
              </button>

              <button onClick={() => setIsEditing(true)}>
                ✏️ Edytuj
              </button>

              <button onClick={() => onDelete(book._id)}>
                🗑 Usuń
              </button>
            </div>
          </>
        )}

        <Notes book={book} onNotesUpdate={onNotesUpdate} />
      </div>
    </div>
  );
};

export default BookItem;
