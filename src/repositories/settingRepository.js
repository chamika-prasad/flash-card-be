const db = require('../configs/db.js');

const updateLimit = async (limit) => {
    await db.query('UPDATE Settings SET daily_limit = ?', [limit]);
    return { limit };
};

const getLimit = async () => {
    const [rows] = await db.query('SELECT daily_limit FROM Settings LIMIT 1');
    return rows[0];
};

module.exports = { updateLimit, getLimit };
