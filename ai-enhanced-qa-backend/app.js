require('dotenv').config();
const express = require('express');
const cors = require('cors');

const documentRoutes = require('./routes/documentRoutes');
const qaRoutes = require('./routes/qaRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/documents', documentRoutes);
app.use('/api/qa', qaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
