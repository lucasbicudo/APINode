import express from 'express';
import BookController from '../controllers/booksController.js';

const router = express.Router();

router.get('/books', BookController.listBooks);
router.get('/books/editor/:id', BookController.listBookByPublisherId);
router.get('/books/:id', BookController.listBookById);
router.post('/books', BookController.createBooks);
router.put('/books/:id', BookController.updateBooks);
router.delete('/books/:id', BookController.deleteBook);

export default router;
