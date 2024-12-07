import flashCardService from '../services/flashCardService.js';
import { verifyToken } from '../utils/jwtUtils.js';

export const getAllFlashCardCategories = async (req, res) => {
  try {
    const categories = await flashCardService.getAllFlashCardCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFlashCardCategoryById = async (req, res) => {
  try {
    const { flashCardSetId } = req.params;
    const category = await flashCardService.getFlashCardCategoryById(flashCardSetId);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFlashCardCategory = async (req, res) => {
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

export const getAllFlashCards = async (req, res) => {
  try {
    const { flashCardSetId } = req.params;
    console.log(flashCardSetId);
    const flashCards = await flashCardService.getAllFlashCards(flashCardSetId);
    res.status(200).json(flashCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFlashCard = async (req, res) => {
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

export const addRating = async (req, res) => {
  try {
    const { flash_card_set_id, description, rating } = req.body;
    console.log(rating, description, flash_card_set_id);
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verifyToken(token);
    const userId = decoded.id;
    console.log(userId);
    const rateItem = await flashCardService.addRating(userId, flash_card_set_id, description,rating);
    res.status(201).json(rateItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRating = async (req, res) => {
  // try {
  //   console.log("hello");
    
  //   const ratings = await flashCardService.getRating();
  //   res.status(200).json(ratings);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  console.log("gggg");
  
};