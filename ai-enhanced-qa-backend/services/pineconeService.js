const { Pinecone } = require('@pinecone-database/pinecone');

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

exports.upsertVectors = async (vectors) => {
  await index.upsert(vectors);
};

exports.queryVectors = async (vector, topK = 5) => {
  const queryResponse = await index.query({
    vector,
    topK,
    includeMetadata: true,
  });
  return queryResponse.matches;
};
