# AI Interview Platform (MERN + Tailwind + Groq)

A powerful AI-driven interview preparation platform built with the MERN stack. It analyzes your resume and job description to generate personalized technical and behavioral questions, a preparation roadmap, and a match score.

## 🚀 Features

- **AI Interview Report**: Upload your resume (PDF) and job description to get a detailed analysis.
- **Dynamic Question Generation**: Technical and behavioral questions tailored to your profile using Groq (Llama-3).
- **Preparation Roadmap**: A step-by-step plan to bridge your skill gaps.
- **Modern UI**: Completely migrated from SCSS to Tailwind CSS for a sleek, responsive, and dark-themed experience.
- **Secure Auth**: JWT-based authentication with secure cookie storage.
- **PDF Generation**: Download your optimized resume as a PDF.

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Vite, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **AI**: Groq SDK (Llama-3-70b)
- **Utilities**: Puppeteer (PDF generation), pdf-parse (Resume parsing), Vitest (Testing)

## 📋 Prerequisites

- Node.js installed
- MongoDB URI (Atlas or Local)
- Groq API Key (Optional, but recommended for AI features)

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/lakshayvashisth09-netizen/interview-ai.git
cd interview-ai
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` folder:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```
Start backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```
Start frontend:
```bash
npm run dev
```

## 🧪 Running Tests
```bash
cd Backend
npm test
```

## 🔒 Security Note
The `.env` file is ignored by Git to protect your credentials. Always use the provided `.env.example` as a template for new environments.

---
Built for Hackathon 🚀
