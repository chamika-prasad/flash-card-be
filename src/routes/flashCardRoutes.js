import { Router } from 'express';
import { getAllFlashCardCategories, createFlashCardCategory, getAllFlashCards, createFlashCard } from '../controllers/flashCardController.js';

const router = Router();

router.get('/categories', getAllFlashCardCategories);
router.post('/categories', createFlashCardCategory);
router.get('/:flashCardSetId', getAllFlashCards);
router.post('/', createFlashCard);

export default router;