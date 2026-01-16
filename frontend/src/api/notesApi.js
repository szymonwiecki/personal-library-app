const API_URL = 'http://localhost:5000/api/books';

export const addNote = async (bookId, content) => {
  const res = await fetch(`${API_URL}/${bookId}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  return res.json();
};

export const deleteNote = async (bookId, noteId) => {
  const res = await fetch(
    `http://localhost:5000/api/books/${bookId}/notes/${noteId}`,
    {
      method: 'DELETE',
    }
  );
  return res.json(); 
};
