const axios = require('axios');
const { queryVectors } = require('./pineconeService');
const {requestWithRetry} = require("../utils");
const {OPENAI_API_KEY} = process.env;


exports.getEmbeddingBatch = async (texts) => {
  const response = await requestWithRetry(() =>
    axios.post(
      'https://api.openai.com/v1/embeddings',
      {
        input: texts,
        model: 'text-embedding-ada-002',
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    )
  );
  return response.data.data.map((item) => item.embedding);
};

exports.answerQuestion = async (question) => {
  const questionEmbedding = await exports.getEmbeddingBatch([question]);
  const relevantChunks = await queryVectors(questionEmbedding[0]);

  const context = relevantChunks
    .map((chunk) => chunk.metadata.text)
    .join('\n---\n');

  const messages = [
    { role: "system", content: "Answer the question based on the context below." },
    { role: "user", content: `Context:\n${context}\n\nQuestion:\n${question}\n\nAnswer:` }
  ];

  const response = await requestWithRetry(() =>
    axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        messages,
        model: 'gpt-3.5-turbo',
        max_tokens: 150,
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    )
  );

  const answer = response.data.choices[0].message.content.trim();
  return { answer, relevantChunks };
};
