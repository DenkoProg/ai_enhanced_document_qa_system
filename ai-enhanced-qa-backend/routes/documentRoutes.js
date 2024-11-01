const express = require('express');
const router = express.Router();
const { uploadDocument } = require('../controllers/documentController');

// Route to upload and process documents
router.post('/upload', uploadDocument);

module.exports = router;
