const express = require('express');
const { createTelemetry } = require('../controllers/telemetryController.js');

const router = express.Router();

router.post('/', createTelemetry);

module.exports = router;
