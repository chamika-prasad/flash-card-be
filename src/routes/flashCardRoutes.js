import { Router } from 'express';
import { getAllFlashCardCategories, createFlashCardCategory, getAllFlashCards, createFlashCard,getFlashCardCategoryById ,addRating, getRating} from '../controllers/flashCardController.js';

const router = Router();

router.get('/categories', getAllFlashCardCategories);
router.get('/categories/:flashCardSetId', getFlashCardCategoryById);
router.post('/categories', createFlashCardCategory);
router.get('/:flashCardSetId', getAllFlashCards);
router.post('/', createFlashCard);
router.post('/rating', addRating);
router.get('/rating', getRating);

export default router;