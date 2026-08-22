# AI Mock Interview

A full-stack AI-powered mock interview application that allows users to practice interviews with dynamically generated questions, AI-based answer evaluation, scores, and feedback.

## Features

- User registration and login
- JWT authentication and protected routes
- Create interviews based on:
  - Job role
  - Difficulty level
  - Number of questions
- AI-generated interview questions using Gemini API
- Submit answers and receive AI-based evaluation
- Skip questions during an interview
- Text-to-speech to read interview questions aloud
- Individual question scores and feedback
- Overall interview score
- View completed interview results
- View and continue previous interviews
- Interview history stored in MongoDB

## Tech Stack

**Frontend**
- React
- React Router
- Axios
- Tailwind CSS
- Web Speech API

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Gemini API
- REST APIs

## How It Works

1. User registers or logs in.
2. User selects a job role, difficulty level, and number of questions.
3. Gemini AI generates interview questions.
4. User answers using text or speech-to-text.
5. The user can listen to questions using text-to-speech.
6. AI evaluates submitted answers.
7. Scores and feedback are stored in MongoDB.
8. The user can review completed interviews and previous results.

## API Endpoints

### Authentication

```text
POST /auth/register
POST /auth/login
