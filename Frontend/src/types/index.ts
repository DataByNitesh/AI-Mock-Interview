export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Question {
  _id?: string;
  question: string;
  answer?: string;
  score?: number;
  skipped?: boolean;
}

export type InterviewStatus = "in-progress" | "completed";

export interface Interview {
  _id: string;
  User: string;
  Role: string;
  Difficulty: string;
  status: InterviewStatus;
  Questions: Question[];
  overallScore?: number;
  overallFeedback?: string;
  createdAt: string;
}

export interface LoginResponse {
  message: string;
  Login: {
    Email: string;
    Name: string;
    Token: string;
  };
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface InterviewResponse {
  message?: string;
  interview: Interview;
}

export interface MyInterviewsResponse {
  interviews: Interview[];
}

export interface ErrorResponse {
  message: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface InterviewSetupForm {
  role: string;
  difficulty: string;
  questionCount: string;
}