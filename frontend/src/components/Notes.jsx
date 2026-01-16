import { useState } from 'react';
import { addNote, deleteNote } from '../api/notesApi';
import './Notes.css';


const Notes = ({ book, onNotesUpdate }) => {
  const [content, setContent] = useState('');

  const handleAdd = async () => {
    const updatedBook = await addNote(book._id, content);
    onNotesUpdate(updatedBook);
    setContent('');
  };

  const handleDelete = async (noteId) => {
    const updatedBook = await deleteNote(book._id, noteId);
    onNotesUpdate(updatedBook);
  };


  return (
    <div className="notes">
        <h4>📝 Notatki</h4>

        {book.notes.map(note => (
            <div key={note._id} className="note">
            <span>{note.content}</span>
            <button onClick={() => handleDelete(note._id)}>❌</button>
            </div>
        ))}

        <input
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Nowa notatka"
        />
        <button onClick={handleAdd}>➕</button>
    </div>

  );
};

export default Notes;
