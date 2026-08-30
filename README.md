Here's the complete README — just copy paste the whole thing:

```markdown
# AI Mock Interview 🤖

> A full-stack AI-powered mock interview platform that generates role-specific questions, evaluates your answers, and gives detailed scores and feedback using Google Gemini AI.

🔗 **[Live Demo](https://aiinterview-xi.vercel.app/)** | 📂 **[GitHub](https://github.com/DataByNitesh/AI-Mock-Interview)**

---

## 🔐 Demo Credentials

**Email:** demo@test.com
**Password:** demo@password

---

## ✨ Features

### Interview
- Choose **job role**, **difficulty level**, and **number of questions**
- Gemini AI generates role-specific interview questions dynamically
- Answer by **typing** or using **speech-to-text**
- **Read question aloud** via text-to-speech (manual trigger)
- **Skip questions** you don't want to answer
- Progress bar tracks interview completion

### Results & History
- Overall score with detailed AI feedback
- Individual score and feedback per question
- Skipped questions counted as 0 — no loopholes
- View all previous interviews in **My Interviews**
- Each user sees only their own interview history

### Auth & Security
- JWT authentication with protected routes
- User-specific data — no cross-user data exposure
- Protected backend APIs on all interview endpoints

---

## 🛠 Tech Stack

### Frontend
- React.js, Tailwind CSS, Axios, React Router

### Backend
- Node.js, Express.js, MongoDB, Mongoose, JWT

### AI & APIs
- Google Gemini API (question generation + answer evaluation)
- Web Speech API (text-to-speech + speech-to-text)

---

## 🌐 Architecture

```
┌──────────────────┐
│  Vercel Frontend │
└────────┬─────────┘
         │ Axios
         ▼
┌──────────────────┐
│  Render Backend  │
└───────┬──────────┘
        │
┌───────┴────────┐
▼                ▼
MongoDB      Gemini AI
```

---

## 🚀 Local Setup

```bash
git clone https://github.com/DataByNitesh/AI-Mock-Interview
cd AI-Mock-Interview
```

### Backend
```bash
cd backend
npm install
npm run dev
```

### Backend .env
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Frontend .env
```
VITE_API_BASE_URL=http://localhost:5000
```

---

## 📁 Project Structure

```
AI-Mock-Interview/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── middleware/
└── frontend/
    └── src/
        ├── components/
        └── pages/
```

---

## 🌐 Deployment
Frontend → Vercel | Backend → Render

---

Built with ❤️ by [Nitesh Kadam](https://github.com/DataByNitesh)
```

Done — one block, copy paste the whole thing. 🎯
