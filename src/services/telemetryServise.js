const telemetryRepository = require('../repositories/telemetryRepository.js');

const createTelemetry = async (userId, flashCardId, action, startAt, endAt) => {
    // Validate input
    if (!userId || !flashCardId || !action || !startAt || !endAt) {
        throw new Error('All fields are required.');
    }

    const telemetry = await telemetryRepository.createTelemetry(userId, flashCardId, action, startAt, endAt);
    return telemetry;
};

module.exports = {
    createTelemetry,
};
