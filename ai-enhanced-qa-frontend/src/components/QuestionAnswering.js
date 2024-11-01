import React, { useState } from 'react';
import axios from 'axios';
import RelevantChunks from './RelevantChunks';
import '../App.css';

function QuestionAnswering() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [relevantChunks, setRelevantChunks] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAskQuestion = async () => {
        if (!question) return;

        setLoading(true);
        setAnswer('');
        setRelevantChunks([]);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/qa/ask`, { question });
            setAnswer(response.data.answer);
            setRelevantChunks(response.data.relevantChunks);
        } catch (error) {
            setAnswer('Failed to retrieve answer.');
        }

        setLoading(false);
    };

    return (
        <div className="question-answering">
            <h2>Ask a Question</h2>
            <div className="ask-question-container">
                <input
                    type="text"
                    placeholder="Type your question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button onClick={handleAskQuestion} disabled={loading}>
                    Ask
                    {loading && <span className="spinner"></span>}
                </button>
            </div>
            {answer && (
                <div className="answer-container">
                    <h3>Answer:</h3>
                    <p>{answer}</p>
                    {relevantChunks.length > 0 && (
                        <RelevantChunks chunks={relevantChunks} />
                    )}
                </div>
            )}
        </div>
    );
}

export default QuestionAnswering;
