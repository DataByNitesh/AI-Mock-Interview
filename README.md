# AI Mock Interview 🤖

> A full-stack AI-powered mock interview platform that helps users practice job interviews with dynamically generated questions and AI-powered evaluation.

🔗 **Live Demo:** https://aiinterview-xi.vercel.app/  
📂 **GitHub:** https://github.com/DataByNitesh/AI-Mock-Interview

---

## ✨ Features

### 🎯 AI Mock Interviews
- Select **job role**, **difficulty**, and **number of questions**
- Generate role-specific interview questions using **Google Gemini AI**
- Answer questions one at a time
- **Skip** questions when needed
- Track interview progress with a progress bar
- Submit the interview for AI evaluation

### 🎤 Interview Assistance
- Type answers directly into the answer box
- Use **speech-to-text** to answer questions using your microphone
- Manually use **text-to-speech** to hear interview questions

### 📊 Results & History
- Receive an **overall interview score**
- Get AI-generated feedback on your performance
- View individual scores for answered questions
- Review feedback for each evaluated answer
- Skipped questions are treated as **0 score**
- View previous interviews in **My Interviews**
- Users can only access their own interview history

### 🔐 Authentication & Security
- User registration and login
- JWT-based authentication
- Protected interview APIs
- User-specific interview data
- Unauthorized users cannot access protected interview functionality

---

## 🛠 Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- Axios
- React Router
- Lucide React
- React Hot Toast

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

**AI & Browser APIs**
- Google Gemini API
- Web Speech API

**Deployment**
- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 🏗 Architecture

```text
                 ┌─────────────────────┐
                 │   React Frontend    │
                 │      Vercel         │
                 └──────────┬──────────┘
                            │
                         Axios
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Express Backend   │
                 │       Render        │
                 └──────────┬──────────┘
                            │
                 ┌──────────┴──────────┐
                 ▼                     ▼
        ┌────────────────┐    ┌────────────────┐
        │    MongoDB     │    │   Gemini AI    │
        │  Atlas Database│    │Question/Eval.  │
        └────────────────┘    └────────────────┘
📁 Project Structure
AI-Mock-Interview/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── ...
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
│
└── README.md

🚀 Run Locally
1. Clone the repository
git clone https://github.com/DataByNitesh/AI-Mock-Interview.git
cd AI-Mock-Interview

2. Backend
cd backend
npm install
npm run dev

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

3.Frontend
cd frontend
npm install
npm run dev

Create a .env file:

VITE_API_BASE_URL=http://localhost:5000
🔑 Demo Account
Email: demo@test.com
Password: demo@password

🌐 Deployment

The application is deployed using:

Frontend: Vercel
Backend: Render
Database: MongoDB Atlas
AI: Google Gemini API
👨‍💻 Author

Nitesh Kadam

Built with React, Node.js, MongoDB, and Gemini AI.

🔗 GitHub: https://github.com/DataByNitesh
