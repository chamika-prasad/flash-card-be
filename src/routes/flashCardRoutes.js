const express = require('express');
const {
    getAllFlashCardCategories,
    createFlashCardCategory,
    getAllFlashCards,
    createFlashCard,
    getFlashCardCategoryById,
    addRating,
    getRating,
    hideFlashCard
} = require('../controllers/flashCardController.js');

const router = express.Router();

router.get('/categories', getAllFlashCardCategories);
router.get('/categories/:flashCardSetId', getFlashCardCategoryById);
router.get('/get-rating/:categoryId', getRating);
router.post('/categories', createFlashCardCategory);
router.get('/:flashCardSetId', getAllFlashCards);
router.post('/', createFlashCard);
router.post('/rating', addRating);
router.post('/hide', hideFlashCard);

module.exports = router;
