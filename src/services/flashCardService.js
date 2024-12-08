import flashCardRepository from '../repositories/flashCardRepository.js';

const getAllFlashCardCategories = async () => {
  const categories = await flashCardRepository.getAllFlashCardCategories();
  return categories;
};

const getFlashCardCategoryById = async (flashCardSetId) => {
  const categories = await flashCardRepository.getFlashCardCategoryById(flashCardSetId);
  return categories;
};

const createFlashCardCategory = async (name,userId,description) => {
  // Validate input
  const category = await flashCardRepository.createFlashCardCategory(name,userId,description);
  return category;
};

const getAllFlashCards = async (userId,flashCardSetId) => {
  const flashCards = await flashCardRepository.getAllFlashCards(userId,flashCardSetId);
  return flashCards;
};

const createFlashCard = async (question, answer, categoryId,userId) => {
  // Validate input
  const flashCard = await flashCardRepository.createFlashCard(question, answer, categoryId,userId);
  return flashCard;
};

const addRating = async (user_id, flash_card_set_id, description,rating) => {
  // Validate input
  const ratingItem = await flashCardRepository.addRating(user_id, flash_card_set_id, description,rating);
  return ratingItem;
};

const getRating = async (categoryId) => {
  const ratings = await flashCardRepository.getRating(categoryId);
  return ratings;
};

const hideFlashCard = async (userId,flashCardId) => {
  const hideItem = await flashCardRepository.hideFlashCard(userId,flashCardId);
  return hideItem;
};

export default {
  getAllFlashCardCategories,
  createFlashCardCategory,
  getAllFlashCards,
  createFlashCard,
  getFlashCardCategoryById,
  addRating,
  getRating,
  hideFlashCard
};