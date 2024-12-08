const flashCardService = require('../services/flashCardService.js');
const { verifyToken } = require('../utils/jwtUtils.js');

const getAllFlashCardCategories = async (req, res) => {
  try {
    const categories = await flashCardService.getAllFlashCardCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFlashCardCategoryById = async (req, res) => {
  try {
    const { flashCardSetId } = req.params;
    const category = await flashCardService.getFlashCardCategoryById(flashCardSetId);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFlashCardCategory = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verifyToken(token);
    const userId = decoded.id;
    const { name, description } = req.body;
    const category = await flashCardService.createFlashCardCategory(name, userId, description);
    res.status(201).json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllFlashCards = async (req, res) => {
  try {
    const { flashCardSetId } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verifyToken(token);
    const userId = decoded.id;
    console.log("userId in controller:", userId);
    console.log("flashCardSetId in controller:", flashCardSetId);
    
    const flashCards = await flashCardService.getAllFlashCards(userId, flashCardSetId);
    res.status(200).json(flashCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFlashCard = async (req, res) => {
  try {
    const { question, answer, categoryId } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verifyToken(token);
    const userId = decoded.id;
    const flashCard = await flashCardService.createFlashCard(question, answer, categoryId, userId);
    res.status(201).json(flashCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addRating = async (req, res) => {
  try {
    const { flash_card_set_id, description, rating } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verifyToken(token);
    const userId = decoded.id;
    const rateItem = await flashCardService.addRating(userId, flash_card_set_id, description, rating);
    res.status(201).json(rateItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRating = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const ratings = await flashCardService.getRating(categoryId);
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const hideFlashCard = async (req, res) => {
  try {
    const { flashCardId } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verifyToken(token);
    const userId = decoded.id;
    const hideItem = await flashCardService.hideFlashCard(userId, flashCardId);
    res.status(200).json(hideItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllFlashCardCategories,
  getFlashCardCategoryById,
  createFlashCardCategory,
  getAllFlashCards,
  createFlashCard,
  addRating,
  getRating,
  hideFlashCard,
};
