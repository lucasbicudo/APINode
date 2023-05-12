import express from 'express';
import EditorController from '../controllers/editorController.js';

const router = express.Router();

router.get('/editor', EditorController.listEditor);
router.get('/editor/:id', EditorController.listEditorById);
router.post('/editor', EditorController.createEditor);
router.put('/editor/:id', EditorController.updateEditor);
router.delete('/editor/:id', EditorController.deleteEditor);

export default router;
