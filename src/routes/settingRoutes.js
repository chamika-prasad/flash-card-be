const express = require('express');
const { updateLimit, getLimit } = require('../controllers/settingController.js');

const router = express.Router();

router.put('/', updateLimit);
router.get('/', getLimit);

module.exports = router;