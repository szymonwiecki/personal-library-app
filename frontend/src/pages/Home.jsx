import { useEffect, useState, useContext } from 'react';
import { getBooks, addBook, deleteBook, updateBook, toggleFavorite } from '../api/booksApi';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import GoogleBookSearch from '../components/GoogleBookSearch';
import BookList from '../components/BookList';

const Home = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

  // Handlery (bez zmian w logice)
  const handleAddBook = async (book) => {
    const newBook = await addBook(book);
    setBooks(prev => [newBook, ...prev]);
  };

  const handleDeleteBook = async (id) => {
    await deleteBook(id);
    setBooks(prev => prev.filter(b => b._id !== id));
  };

  const handleUpdateBook = async (id, data) => {
    const updated = await updateBook(id, data);
    setBooks(prev => prev.map(b => (b._id === id ? updated : b)));
  };

  const handleUpdateNotes = (updatedBook) => {
    setBooks(prev => prev.map(b => (b._id === updatedBook._id ? updatedBook : b)));
  };

  const handleToggleFavorite = async (id) => {
    const updated = await toggleFavorite(id);
    setBooks(prev => prev.map(b => (b._id === id ? updated : b)));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 mb-6 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
          📚 Moja biblioteczka
        </h1>
        <button 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition shadow-sm" 
          onClick={handleLogout}
        >
          Wyloguj
        </button> 
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Google Books */}
        <div className="mb-8">
           <GoogleBookSearch onAdd={handleAddBook} />
        </div>

        {/* Filtry i Wyszukiwanie */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
            <input 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="🔎 Szukaj w mojej bibliotece..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            
            <label className="flex items-center gap-2 cursor-pointer select-none whitespace-nowrap text-gray-700 font-medium">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                checked={showFavorites}
                onChange={() => setShowFavorites(!showFavorites)}
              />
              ⭐ Tylko ulubione
            </label>
        </div>

        {/* Loader i Błędy */}
        {loading && (
          <div className="flex justify-center my-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        )}
        {error && <p className="text-red-500 text-center font-bold bg-red-100 p-3 rounded">{error}</p>}

        {/* Lista */}
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
    </div>
  );
};

export default Home;