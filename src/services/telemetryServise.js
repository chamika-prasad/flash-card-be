import telemetryRepository from '../repositories/telemetryRepository.js';

const createTelemetry = async (userId, flashCardId, action, startAt, endAt) => {
    // Validate input
    if (!userId || !flashCardId || !action || !startAt || !endAt) {
      throw new Error('All fields are required.');
    }
  
    const telemetry = await telemetryRepository.createTelemetry(userId, flashCardId, action, startAt, endAt);
    return telemetry;
  };
  
  export default {
    createTelemetry,
  };
  