import { useState } from 'react';
import { addNote, deleteNote } from '../api/notesApi';

const Notes = ({ book, onNotesUpdate }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const updatedBook = await addNote(book._id, content);
      onNotesUpdate(updatedBook);
      setContent('');
    } catch (error) {
      console.error("Błąd dodawania notatki", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      const updatedBook = await deleteNote(book._id, noteId);
      onNotesUpdate(updatedBook);
    } catch (error) {
      console.error("Błąd usuwania notatki", error);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
            📝 Notatki ({book.notes?.length || 0})
        </h4>

        {/* Lista notatek */}
        <div className="space-y-2 mb-4">
            {book.notes && book.notes.length > 0 ? (
                book.notes.map(note => (
                    <div key={note._id} className="group flex justify-between items-start bg-gray-50 p-2.5 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                        <span className="text-sm text-gray-700 leading-snug break-words pr-2">
                            {note.content}
                        </span>
                        <button 
                            onClick={() => handleDelete(note._id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                            title="Usuń notatkę"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-xs text-gray-400 italic">Brak notatek. Dodaj pierwszą poniżej.</p>
            )}
        </div>

        {/* Dodawanie notatki */}
        <div className="flex gap-2">
            <input
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Wpisz nową notatkę..."
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <button 
                onClick={handleAdd}
                disabled={loading || !content.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition shadow-sm flex items-center justify-center w-10"
            >
                {loading ? '...' : '➕'}
            </button>
        </div>
    </div>
  );
};

export default Notes;