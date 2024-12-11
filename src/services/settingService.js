const settingRepository = require('../repositories/settingRepository.js');

const updateLimit = async (limit) => {
    const limitValue = await settingRepository.updateLimit(limit);
    return limitValue;
};

const getLimit = async () => {
    const limitValue = await settingRepository.getLimit();
    return limitValue;
};

module.exports = { updateLimit, getLimit };
