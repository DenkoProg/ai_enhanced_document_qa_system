const multer = require('multer');
const { processDocument } = require('../services/textProcessing');

const upload = multer({ dest: 'uploads/' });

exports.uploadDocument = [
  upload.single('file'),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) return res.status(400).json({ error: 'No file uploaded' });

      const status = await processDocument(file);
      res.status(200).json({ message: 'Document processed successfully', status });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Document processing failed' });
    }
  },
];
