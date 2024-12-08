const db = require('../configs/db.js');

const createTelemetry = async (userId, flashCardId, action, startAt, endAt) => {
    const [result] = await db.query(
        'INSERT INTO Telemetry (user_id, flash_card_id, action, start_at, end_at) VALUES (?, ?, ?, ?, ?)',
        [userId, flashCardId, action, startAt, endAt]
    );
    return {
        id: result.insertId,
        userId,
        flashCardId,
        action,
        startAt,
        endAt,
    };
};

module.exports = {
    createTelemetry,
};
