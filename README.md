
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
- Use **text-to-speech** to hear interview questions

### 📊 Results & History

- Receive an **overall interview score**
- Get AI-generated feedback on interview performance
- View individual scores for answered questions
- Review feedback for each evaluated answer
- Skipped questions are treated as **0 score**
- View previous interviews in **My Interviews**
- Users can only access their own interview history

### 🔐 Authentication & Security

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected interview APIs
- User-specific interview data
- Ownership checks for interview history
- Unauthorized users cannot access protected interview functionality

### 🎨 Modern TypeScript Frontend

- Frontend migrated from **JavaScript to TypeScript**
- Improved type safety and maintainability
- Redesigned user interface with a new visual style
- Improved layout, spacing, navigation, and information hierarchy
- Responsive interview and results experience

---

## 🛠 Tech Stack

### Frontend

- React.js
- TypeScript
- Tailwind CSS
- Axios
- React Router
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### AI & Browser APIs

- Google Gemini API
- Web Speech API

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 🏗 Architecture

```text
                 ┌─────────────────────┐
                 │ React + TypeScript  │
                 │      Frontend       │
                 │       Vercel        │
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
```

---

## 📁 Project Structure

```text
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
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/DataByNitesh/AI-Mock-Interview.git
cd AI-Mock-Interview
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🔑 Demo Account

**Email:** `demo@test.com`  
**Password:** `demo@password`

---

## 🌐 Deployment

The application is deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **AI:** Google Gemini API

The frontend uses React Router with Vercel SPA routing support so client-side routes can also be loaded directly or refreshed in the browser.

---

## 🔒 Security

- Passwords are hashed using **bcrypt**
- Authentication uses **JWT**
- Protected routes require valid authentication
- Interview data is associated with the authenticated user
- Users cannot access another user's interview history
- API keys and database credentials are stored using environment variables

---

## 👨‍💻 Author

**Nitesh Kadam**

BSc Computer Science | MERN Stack Developer

Built with React, TypeScript, Node.js, MongoDB, and Gemini AI.

🔗 **GitHub:** https://github.com/DataByNitesh  
🔗 **LinkedIn:** https://www.linkedin.com/in/nitesh-s-kadam/

---

## 📌 Project Highlights

- Full-stack MERN application
- React frontend migrated to **TypeScript**
- AI-powered question generation and evaluation
- JWT authentication and protected APIs
- MongoDB data persistence
- Speech-to-text and text-to-speech support
- Production deployment with Vercel and Render
- Responsive, redesigned user interface
