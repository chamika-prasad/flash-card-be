import db from '../configs/db.js';

const getAllFlashCardCategories = async () => {
    const [rows] = await db.query('SELECT * FROM flashcardset');
    return rows;
};

const createFlashCardCategory = async (name, userId) => {
    const [result] = await db.query('INSERT INTO flashcardset (name,user_id) VALUES (?,?)', [name, userId]);
    console.log(result);

    return { id: result.insertId, name, userId };
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

export default {
    getAllFlashCardCategories,
    createFlashCardCategory,
    getAllFlashCards,
    createFlashCard
};