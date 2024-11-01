const { answerQuestion } = require('../services/openaiService');

exports.getAnswer = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question is required' });

    const { answer, relevantChunks } = await answerQuestion(question);
    res.status(200).json({ answer, relevantChunks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get answer' });
  }
};
