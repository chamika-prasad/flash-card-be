import flashCardRepository from '../repositories/flashCardRepository.js';

const getAllFlashCardCategories = async () => {
  const categories = await flashCardRepository.getAllFlashCardCategories();
  return categories;
};

const createFlashCardCategory = async (name,userId) => {
  // Validate input
  const category = await flashCardRepository.createFlashCardCategory(name,userId);
  return category;
};

const getAllFlashCards = async (flashCardSetId) => {
  const flashCards = await flashCardRepository.getAllFlashCards(flashCardSetId);
  return flashCards;
};

const createFlashCard = async (question, answer, categoryId,userId) => {
  // Validate input
  const flashCard = await flashCardRepository.createFlashCard(question, answer, categoryId,userId);
  return flashCard;
};

export default {
  getAllFlashCardCategories,
  createFlashCardCategory,
  getAllFlashCards,
  createFlashCard
};