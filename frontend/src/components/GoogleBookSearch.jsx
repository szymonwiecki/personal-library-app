import { useState, useRef, useEffect } from 'react';
import { searchBooks } from '../api/googleBooksApi';

const GoogleBookSearch = ({ onAdd }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const wrapperRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError('');
      setResults([]);
      
      const books = await searchBooks(query); // Używamy Twojej funkcji API
      
      if (!books || !books.length) {
        setError('Brak wyników wyszukiwania');
      } else {
        setResults(books);
      }
    } catch (err) {
      setError('Błąd połączenia z Google Books API');
    } finally {
      setLoading(false);
    }
  };

  // Kliknięcie poza komponentem czyści wyniki
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 relative" ref={wrapperRef}>
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        🔍 Google Books
      </h2>

      <form onSubmit={handleSearch} className="flex gap-2 relative z-10">
        <input
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          placeholder="Szukaj książki lub autora..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? '...' : 'Szukaj'}
        </button>
      </form>

      {/* Komunikat błędu */}
      {error && <p className="mt-3 text-red-500 text-sm font-medium">{error}</p>}

      {/* Wyniki wyszukiwania - GRID */}
      {results.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((book) => (
            <div key={book.id} className="border border-gray-200 rounded-lg p-3 flex gap-3 hover:shadow-md transition bg-gray-50">
              {/* Miniatura */}
              <div className="flex-shrink-0 w-16 h-24 bg-gray-200 rounded overflow-hidden">
                {book.thumbnail ? (
                  <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Brak img</div>
                )}
              </div>

              {/* Treść */}
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">{book.title}</h3>
                <p className="text-xs text-gray-600 mb-1">{book.author}</p>
                {book.firstPublishedYear && (
                  <p className="text-xs text-gray-400 mb-2">{book.firstPublishedYear}</p>
                )}
                
                <button 
                  onClick={() => {
                    onAdd(book);
                    setResults([]); // Zamknij po dodaniu
                    setQuery('');
                  }}
                  className="mt-auto bg-green-600 hover:bg-green-700 text-white text-xs py-1.5 px-3 rounded self-start transition"
                >
                  ➕ Dodaj
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoogleBookSearch;