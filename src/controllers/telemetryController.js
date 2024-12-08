import { verifyToken } from '../utils/jwtUtils.js';
import telemetryService from '../services/telemetryServise.js';

export const createTelemetry = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verifyToken(token);
        const userId = decoded.id;
        const { flashCardId, action, startAt, endAt } = req.body;
        let acionInt = 0;
        if (action == "resolve") {
            acionInt = 1;
        }

        const telemetry = await telemetryService.createTelemetry(userId, flashCardId, action, startAt, endAt);
        res.status(201).json({ telemetry });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
