import React from 'react';
import DocumentUpload from './components/DocumentUpload';
import QuestionAnswering from './components/QuestionAnswering';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
      <div className="App">
        <h1>AI-Enhanced Document QA System</h1>
        <DocumentUpload />
        <QuestionAnswering />
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
  );
}

export default App;
