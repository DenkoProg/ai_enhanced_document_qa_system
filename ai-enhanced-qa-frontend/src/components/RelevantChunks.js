import React from 'react';

function RelevantChunks({ chunks }) {
    return (
        <div>
            <h3>Relevant Document Chunks:</h3>
            {chunks.map((chunk, index) => (
                <div key={index}>
                    <p><strong>Chunk {index + 1}:</strong> {chunk.metadata.text}</p>
                    <p>Confidence Score: {chunk.score.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
}

export default RelevantChunks;
