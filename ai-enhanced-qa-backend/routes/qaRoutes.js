const express = require('express');
const router = express.Router();
const { getAnswer } = require('../controllers/qaController');

// Route to handle question answering
router.post('/ask', getAnswer);

module.exports = router;
