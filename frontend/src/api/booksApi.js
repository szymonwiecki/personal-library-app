const API_URL = 'http://localhost:5000/api/books';

export const getBooks = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addBook = async (book) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  return res.json();
};

export const addNote = async (bookId, content) => {
  const res = await fetch(`${API_URL}/${bookId}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  return res.json();
};

export const deleteBook = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};

export const updateBook = async (id, book) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  return res.json();
};

export const toggleFavorite = async (id) => {
  const res = await fetch(
    `http://localhost:5000/api/books/${id}/favorite`,
    { method: 'PATCH' }
  );
  return res.json();
};



