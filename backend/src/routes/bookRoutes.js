const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);
router.post('/:id/notes', bookController.addNote);
router.delete('/:id/notes/:noteId', bookController.deleteNote);
router.patch('/:id/favorite', bookController.toggleFavorite);



module.exports = router;
