const Book = require('../models/Book');

// GET all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Błąd pobierania książek' });
  }
};

// GET single book
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Nie znaleziono książki' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Błąd pobierania książki' });
  }
};

// POST add book
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: 'Błąd dodawania książki' });
  }
};

// PUT update book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: 'Błąd edycji książki' });
  }
};

// DELETE book
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Książka usunięta' });
  } catch (error) {
    res.status(500).json({ message: 'Błąd usuwania książki' });
  }
};

// POST add note
exports.addNote = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    book.notes.push({ content: req.body.content });
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: 'Błąd dodawania notatki' });
  }
};
