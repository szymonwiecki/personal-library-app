import { useState, useRef, useEffect } from 'react';
import { searchBooks } from '../api/googleBooksApi';
import './GoogleBookSearch.css';

const GoogleBookSearch = ({ onAdd }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const wrapperRef = useRef(null);

  const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError('');
      setResults([]); // 🔥 czyścimy stare wyniki

      // 🔥 loader widoczny min. 1.5s
      const [books] = await Promise.all([
        searchBooks(query),
        delay(800)
      ]);

      if (!books.length) {
        setError('Brak wyników wyszukiwania');
      }

      setResults(books);
    } catch (err) {
      setError('Błąd połączenia z Google Books API');
    } finally {
      setLoading(false);
    }
  };

  // 👇 chowanie wyników po kliknięciu poza wyszukiwarką
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setResults([]);
        setError('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <h2 style={{ marginBottom: '10px' }}>🔍 Google Books</h2>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          placeholder="Szukaj książki lub autora..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Szukam...' : 'Szukaj'}
        </button>
      </form>

      {/* ⏳ LOADER — ZAWSZE WIDOCZNY */}
      {loading && <div className="loader" />}

      {/* ❌ BŁĄD */}
      {!loading && error && (
        <p style={{ color: 'red', textAlign: 'center' }}>
          {error}
        </p>
      )}

      {/* 📚 WYNIKI */}
      {!loading &&
        !error &&
        results.map((book) => (
          <div key={book.id} className="google-result">
            <div className="google-thumbnail">
              {book.thumbnail && (
                <img src={book.thumbnail} alt={book.title} />
              )}
            </div>

            <div className="google-main">
              <strong>{book.title}</strong> – {book.author}

              <div className="google-details">
                <p>{book.description}</p>

                {book.firstPublishedYear && (
                  <div>
                    📅 Pierwsze wydanie: {book.firstPublishedYear}
                  </div>
                )}
              </div>
            </div>

            <div className="google-actions">
              <button onClick={() => onAdd(book)}>
                ➕ Dodaj
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default GoogleBookSearch;
