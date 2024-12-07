import db from '../configs/db.js';

const getAllFlashCardCategories = async () => {
    const [rows] = await db.query('SELECT * FROM flashcardset');
    return rows;
};

const createFlashCardCategory = async (name, userId, description) => {
    const [result] = await db.query('INSERT INTO flashcardset (name,user_id,description) VALUES (?,?,?)', [name, userId, description]);
    return { id: result.insertId, name, userId, description };
};

const getFlashCardCategoryById = async (flashCardSetId) => {
    const [result] = await db.query('SELECT * FROM flashcardset WHERE id = ?', [flashCardSetId]);
    return result[0];
};

const getAllFlashCards = async (flashCardSetId) => {
    const [rows] = await db.query('SELECT * FROM flashcard WHERE flash_card_set_id = ?',
        [flashCardSetId]
    );
    return rows;
};

const createFlashCard = async (question, answer, categoryId, userId) => {
    const [result] = await db.query('INSERT INTO flashcard (question, answer, flash_card_set_id,user_id) VALUES (?, ?, ?,?)', [question, answer, categoryId, userId]);
    return { id: result.insertId, question, answer, categoryId, userId };
};

const addRating = async (user_id, flash_card_set_id, description,rating) => {
    const [result] = await db.query('INSERT INTO Rating (user_id, flash_card_set_id, description,rating) VALUES (?, ?, ?,?)', [user_id, flash_card_set_id, description, rating]);
    return { id: result.insertId, user_id, flash_card_set_id, description, rating };
};

const getRating = async () => {
    const [rows] = await db.query('SELECT * FROM Rating');
    return rows;
};

export default {
    getAllFlashCardCategories,
    createFlashCardCategory,
    getAllFlashCards,
    createFlashCard,
    getFlashCardCategoryById,
    addRating,
    getRating
};