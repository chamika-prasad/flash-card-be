const bcrypt = require('bcrypt');
const settingService = require('../services/settingService.js');

const updateLimit = async (req, res) => {
    try {
        const { limit } = req.body;
        const limitValue = await settingService.updateLimit(limit);
        res.status(201).json(limitValue);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLimit = async (req, res) => {
    try {
        const result = await settingService.getLimit();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { updateLimit, getLimit };