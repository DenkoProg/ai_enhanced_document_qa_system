import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../App.css';

function DocumentUpload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        toast.info('Uploading...');

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/documents/upload`, formData);
            toast.success('Upload successful!');
        } catch (error) {
            toast.error('Upload failed. Please try again.');
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>Upload Document</h2>

            <div className="file-upload-container">
                <input type="file" accept=".pdf,.txt" onChange={handleFileChange} />
                <button onClick={handleUpload} disabled={loading}>
                    Upload
                    {loading && <span className="spinner"></span>}
                </button>
            </div>
        </div>
    );
}

export default DocumentUpload;
