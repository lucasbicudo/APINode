import express from 'express';
import BookController from '../controllers/booksController.js';

const router = express.Router();

router.get('/books', BookController.listBooks);
router.post('/books', BookController.createBooks);
router.put('/books/:id', BookController.updateBooks);

export default router;
