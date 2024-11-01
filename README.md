# AI-Enhanced Document QA System

## Objective

The AI-Enhanced Document QA System is a document ingestion and question-answering system leveraging advanced AI models and vector databases. This project demonstrates the use of state-of-the-art AI tools and APIs, showcasing expertise in natural language processing (NLP) and information retrieval.

## Overview

https://github.com/user-attachments/assets/fe5e7529-3ad7-4cd6-a87b-df0580853d97

## Table of Contents

- [Objective](#objective)
- [Overview](#overview)
- [Components](#components)
  - [1. Backend (Node.js)](#1-backend-nodejs)
  - [2. Frontend (React)](#2-frontend-react)
  - [3. AI Integration](#3-ai-integration)
  - [4. Python Script](#4-python-script)
- [Requirements](#requirements)
- [Setup Instructions](#setup-instructions)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Environment Variables](#2-environment-variables)
  - [3. Backend Setup](#3-backend-setup)
  - [4. Frontend Setup](#4-frontend-setup)
  - [5. Python Script Setup](#5-python-script-setup)
- [Usage](#usage)
- [Evaluation Criteria](#evaluation-criteria)
- [Approach and Challenges](#approach-and-challenges)

## Components

### 1. Backend (Node.js)

The backend is built using Node.js with Express. It provides endpoints to handle document ingestion, question-answering, and processing. The backend pipeline includes:

- **Endpoints**:
  - **Document Ingestion**: Accepts PDF or plain text files.
  - **Question Answering**: Answers user questions based on ingested documents.

- **Pipeline**:
  - **Text Extraction**: Extracts and chunks text from PDF or text files.
  - **Named Entity Recognition (NER)**: Extracts named entities (e.g., people, places).
  - **Vector Embedding Generation**: Converts document chunks to embeddings for efficient retrieval.
  - **Vector Storage with Pinecone**: Stores embeddings in Pinecone for fast retrieval during question-answering.
  - **Error Handling and Input Validation**: Ensures robust API behavior and validation.

### 2. Frontend (React)

The frontend is built using React and provides a user-friendly interface to interact with the system.

- **Features**:
  - **Document Upload**: Allows users to upload PDF or text files for ingestion.
  - **Question Input**: Allows users to ask questions based on uploaded documents.
  - **Answer Display**: Shows the AI-generated answer and highlights relevant document chunks with confidence scores.

### 3. AI Integration

The AI system integrates with external OpenAI API for:

- **Text Analysis**: Processes documents and extracts meaningful data.
- **Question Answering**: Generates answers based on retrieved document chunks.
- **Retrieval-Augmented Generation (RAG)**:
  - Retrieves relevant document chunks from Pinecone.
  - Enhances question prompts with retrieved context.

### 4. Python Script

A Python script is provided for additional processing and enrichment of document data.

- **Functionality**:
  - **Topic Modeling**: Performs basic topic modeling on ingested documents.
  - **Metadata Updates**: Updates document metadata in Pinecone with extracted topics.

## Requirements

- **Backend**: Node.js, Express
- **Frontend**: React
- **Vector Database**: Pinecone for storage and retrieval of embeddings
- **AI API**: OpenAI API
- **Python Script**: Topic modeling using Gensim and NLTK

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/DenkoProg/ai-enhanced-document-qa-system.git
cd ai-enhanced-document-qa-system
```

### 2. Environment Variables

Create `.env` files in both `ai-enhanced-qa-backend` and `ai-enhanced-qa-frontend` with the following variables:

#### Backend `.env`

```env
# API keys
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key

# Pinecone
PINECONE_INDEX_NAME=your_index_name

# Server
PORT=5000
```

#### Frontend `.env`

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

### 3. Backend Setup

Navigate to the backend folder, install dependencies, and start the server.

```bash
cd ai-enhanced-qa-backend
npm install
npm start
```

The backend server should be running on `http://localhost:5000`.

### 4. Frontend Setup

Navigate to the frontend folder, install dependencies, and start the frontend server.

```bash
cd ai-enhanced-qa-frontend
npm install
npm start
```

The frontend should be running on `http://localhost:3000`.

### 5. Python Script Setup

Install the necessary Python dependencies and run the topic modeling script.

```bash
cd ai-enhanced-qa-backend/scripts
pip install -r requirements.txt
python topic_modeling.py
```

## Usage

1. **Upload a Document**:
   - Use the frontend to upload a PDF or text file.
   - The backend processes the document, extracting text and generating embeddings.

2. **Ask a Question**:
   - Type a question related to the uploaded document in the input field.
   - The system will retrieve relevant chunks from Pinecone, enhance the question with context, and generate an answer using the AI API.

3. **View Answer and Relevant Chunks**:
   - The answer and relevant document chunks, along with confidence scores, will be displayed.

## Evaluation Criteria

- **Successful Integration**: Proper integration with Pinecone and the OpenAI API (GPT-3.5-Turbo).
- **Effective RAG System**: Retrieval-augmented generation is implemented effectively.
- **Quality of Processing**: Document processing, NER, and information retrieval are accurate.
- **Frontend Design and UX**: User-friendly interface for uploading documents, asking questions, and displaying results.
- **Code Quality**: Code organization, documentation, error handling, and edge-case management.
- **Performance Optimization**: Efficient use of API calls and handling rate limits effectively.

## Approach and Challenges

### Approach

1. **Backend Setup**:
   - Set up the Node.js server with endpoints for document ingestion and question answering.
   - Integrated Pinecone for vector storage and retrieval.
   - Used OpenAI's API for embedding generation and question answering.

2. **Frontend Interface**:
   - Built a React-based interface for document upload and question answering.
   - Provided visual feedback on the processing status and results.

3. **Python Script**:
   - Implemented a topic modeling script to enrich document metadata in Pinecone.

4. **RAG System**:
   - Enhanced question prompts with context from relevant document chunks retrieved from Pinecone, using them as context for the question-answering API.

### Challenges

- **Handling API Rate Limits**:
  - Implemented retries with exponential backoff to handle rate limits effectively.
- **Document Chunking and Embedding**:
  - Devised an efficient chunking strategy for long documents to ensure optimal embedding and retrieval.
- **Frontend State Management**:
  - Ensured smooth UX by managing loading states and error handling effectively.

