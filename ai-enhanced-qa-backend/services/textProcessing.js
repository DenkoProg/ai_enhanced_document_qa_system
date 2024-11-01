const fs = require('fs');
const pdfParse = require('pdf-parse');
const { v4: uuidv4 } = require('uuid');
const { getEmbeddingBatch } = require('./openaiService');
const { upsertVectors } = require('./pineconeService');
const {requestWithRetry} = require("../utils");
const {BATCH_SIZE} = require("../constants");

exports.processDocument = async (file) => {
  let textContent = '';
  const fileBuffer = fs.readFileSync(file.path);

  if (file.mimetype === 'application/pdf') {
    const data = await pdfParse(fileBuffer);
    textContent = data.text;
  } else if (file.mimetype === 'text/plain') {
    textContent = fileBuffer.toString();
  } else {
    throw new Error('Unsupported file type');
  }

  const chunks = splitTextIntoChunks(textContent);
  const vectors = [];

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const embeddings = await requestWithRetry(() => getEmbeddingBatch(batch));

    embeddings.forEach((embedding, index) => {
      vectors.push({
        id: uuidv4(),
        values: embedding,
        metadata: { text: batch[index] },
      });
    });
  }

  console.log("Vectors to be upserted:", vectors);
  await upsertVectors(vectors);
  fs.unlinkSync(file.path);

  return 'Completed';
};

function splitTextIntoChunks(text, maxLength = 500) {
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [];
  const chunks = [];
  let chunk = '';

  for (const sentence of sentences) {
    if ((chunk + sentence).length > maxLength) {
      chunks.push(chunk.trim());
      chunk = '';
    }
    chunk += sentence + ' ';
  }

  if (chunk) {
    chunks.push(chunk.trim());
  }
  return chunks;
}
