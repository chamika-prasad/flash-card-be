import { Router } from 'express';
import { getAllFlashCardCategories, createFlashCardCategory, getAllFlashCards, createFlashCard,getFlashCardCategoryById ,addRating, getRating,hideFlashCard} from '../controllers/flashCardController.js';

const router = Router();

router.get('/categories', getAllFlashCardCategories);
router.get('/categories/:flashCardSetId', getFlashCardCategoryById);
router.get('/get-rating/:categoryId', getRating);
router.post('/categories', createFlashCardCategory);
router.get('/:flashCardSetId', getAllFlashCards);
router.post('/', createFlashCard);
router.post('/rating', addRating);
router.post('/hide', hideFlashCard);

export default router;