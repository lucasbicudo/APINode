import express from 'express';
import AuthorController from '../controllers/authorsController.js';

const router = express.Router();

router.get('/authors', AuthorController.listAuthors);
router.get('/authors/:id', AuthorController.listAuthorById);
router.post('/authors', AuthorController.createAuthors);
router.put('/authors/:id', AuthorController.updateAuthors);
router.delete('/authors/:id', AuthorController.deleteAuthor);

export default router;
