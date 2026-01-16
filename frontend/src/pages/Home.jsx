import { useEffect, useState } from 'react';
import {
  getBooks,
  addBook,
  deleteBook,
  updateBook,
  toggleFavorite // 🔥 BRAKUJĄCY IMPORT
} from '../api/booksApi';

import GoogleBookSearch from '../components/GoogleBookSearch';
import BookList from '../components/BookList';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);


  const filteredBooks = books
    .filter(book =>
        book.title.toLowerCase().includes(filter.toLowerCase()) ||
        book.author.toLowerCase().includes(filter.toLowerCase())
    )
    .filter(book => (showFavorites ? book.isFavorite : true));



  useEffect(() => {
    const loadBooks = async () => {
        try {
        setLoading(true);
        const data = await getBooks();
        setBooks(data);
        } catch {
        setError('Błąd pobierania książek');
        } finally {
        setLoading(false);
        }
    };

    loadBooks();
  }, []);


  // ➕ dodanie książki
  const handleAddBook = async (book) => {
    const newBook = await addBook(book);
    setBooks(prev => [newBook, ...prev]);
  };

  // 🗑 usuwanie
  const handleDeleteBook = async (id) => {
    await deleteBook(id);
    setBooks(prev => prev.filter(b => b._id !== id));
  };

  // ✏️ edycja
  const handleUpdateBook = async (id, data) => {
    const updated = await updateBook(id, data);
    setBooks(prev =>
      prev.map(b => (b._id === id ? updated : b))
    );
  };

  // 📝 dodanie notatki
  const handleUpdateNotes = (updatedBook) => {
    setBooks(prev =>
      prev.map(b => (b._id === updatedBook._id ? updatedBook : b))
    );
  };

  const handleToggleFavorite = async (id) => {
  const updated = await toggleFavorite(id);
    setBooks(prev =>
        prev.map(b => (b._id === id ? updated : b))
    );
  };


return (
  <div>
    <h1>📚 Moja biblioteczka</h1>

    {/* Google Books */}
    <GoogleBookSearch onAdd={handleAddBook} />

    {/* 🔎 Wyszukiwanie w mojej bibliotece */}
    <input
      placeholder="🔎 Szukaj w mojej bibliotece..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
    />

    {/* ⭐ tylko ulubione */}
    <label style={{ display: 'block', marginBottom: '15px' }}>
      <input
        type="checkbox"
        checked={showFavorites}
        onChange={() => setShowFavorites(!showFavorites)}
      />{' '}
      ⭐ Tylko ulubione
    </label>

    {/* ⏳ LOADER + ❌ BŁĘDY — 🔥 DOKŁADNIE TUTAJ */}
    {loading && <div className="loader" />}
    {error && <p style={{ color: 'red' }}>{error}</p>}

    {/* 📚 LISTA KSIĄŻEK */}
    {!loading && !error && (
      <BookList
        books={filteredBooks}
        onDelete={handleDeleteBook}
        onUpdate={handleUpdateBook}
        onToggleFavorite={handleToggleFavorite}
        onNotesUpdate={handleUpdateNotes}
      />
    )}
  </div>
);

};

export default Home;
