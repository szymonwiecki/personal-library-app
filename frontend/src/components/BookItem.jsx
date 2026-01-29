import { useState } from 'react';
import Notes from './Notes';
// import './BookItem.css'; // ❌ USUŃ TEN IMPORT

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
    <div className="bg-white rounded-xl p-5 mb-5 flex flex-col sm:flex-row gap-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 animate-fade-in">
      
      {/* Miniatura */}
      {book.thumbnail && (
        <div className="w-full sm:w-32 flex-shrink-0">
          <img 
            src={book.thumbnail} 
            alt={book.title} 
            className="w-full h-auto rounded-md object-cover shadow-sm"
          />
        </div>
      )}

      {/* Treść */}
      <div className="flex-1 flex flex-col">
        {isEditing ? (
          <div className="flex flex-col gap-3 mb-3">
            <input
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            <div className="flex gap-2 mt-2">
              <button 
                onClick={handleSave}
                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition"
              >
                💾 Zapisz
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 bg-gray-400 hover:bg-gray-500 text-white rounded text-sm transition"
              >
                ❌ Anuluj
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-auto">
                <h3 className="text-xl font-bold text-gray-900 leading-tight">{book.title}</h3>
                <p className="text-gray-600 mt-1 font-medium">{book.author}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => onToggleFavorite(book._id)}
                title="Ulubione"
                className={`px-3 py-1.5 rounded text-sm transition border ${
                    book.isFavorite 
                    ? 'bg-yellow-100 text-yellow-600 border-yellow-200 hover:bg-yellow-200' 
                    : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                }`}
              >
                {book.isFavorite ? '⭐ Ulubione' : '☆ Dodaj do ulubionych'}
              </button>

              <button 
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 rounded text-sm transition"
              >
                ✏️ Edytuj
              </button>

              <button 
                onClick={() => onDelete(book._id)}
                className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 border border-red-200 rounded text-sm transition"
              >
                🗑 Usuń
              </button>
            </div>
          </>
        )}

        {/* Notatki - zakładam, że Notes w środku ma jakieś style, 
            ale kontener tutaj zapewni odstęp */}
        <div className="mt-4 pt-4 border-t border-gray-100">
             <Notes book={book} onNotesUpdate={onNotesUpdate} />
        </div>
      </div>
    </div>
  );
};

export default BookItem;