const db = require('../configs/db.js');

const getAllFlashCardCategories = async () => {
    const [rows] = await db.query('SELECT * FROM flashcardset');
    return rows;
};

const createFlashCardCategory = async (name, userId, description) => {
    const [result] = await db.query('INSERT INTO flashcardset (name, user_id, description) VALUES (?, ?, ?)', [name, userId, description]);
    return { id: result.insertId, name, userId, description };
};

const getFlashCardCategoryById = async (flashCardSetId) => {
    const [result] = await db.query('SELECT * FROM flashcardset WHERE id = ?', [flashCardSetId]);
    return result[0];
};

const getAllFlashCards = async (userId, flashCardSetId) => {
    const [rows] = await db.query('SELECT fc.* FROM FlashCard fc LEFT JOIN Hide h ON fc.id = h.flash_card_id AND h.user_id = ? WHERE h.flash_card_id IS NULL AND fc.flash_card_set_id = ?',
        [userId, flashCardSetId]
    );
    return rows;
};

const createFlashCard = async (question, answer, categoryId, userId) => {
    const [result] = await db.query('INSERT INTO flashcard (question, answer, flash_card_set_id, user_id) VALUES (?, ?, ?, ?)', [question, answer, categoryId, userId]);
    return { id: result.insertId, question, answer, categoryId, userId };
};

const addRating = async (user_id, flash_card_set_id, description, rating) => {
    const [result] = await db.query('INSERT INTO Rating (user_id, flash_card_set_id, description, rating) VALUES (?, ?, ?, ?)', [user_id, flash_card_set_id, description, rating]);
    return { id: result.insertId, user_id, flash_card_set_id, description, rating };
};

const getRating = async (categoryId) => {
    const [rows] = await db.query('SELECT u.email, r.rating, r.description FROM Rating r JOIN user u ON u.id = r.user_id AND r.flash_card_set_id = ?', [categoryId]);
    return rows;
};

const hideFlashCard = async (userId, flashCardId) => {
    const [result] = await db.query('INSERT INTO Hide (user_id, flash_card_id) VALUES (?, ?)', [userId, flashCardId]);
    return { userId, flashCardId };
};

module.exports = {
    getAllFlashCardCategories,
    createFlashCardCategory,
    getAllFlashCards,
    createFlashCard,
    getFlashCardCategoryById,
    addRating,
    getRating,
    hideFlashCard
};
