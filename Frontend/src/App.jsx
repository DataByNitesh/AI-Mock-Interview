import { BrowserRouter, Routes, Route } from "react-router";

function Login() {
  return <h1>Login</h1>;
}

function Register() {
  return <h1>Register</h1>;
}

function InterviewSetup() {
  return <h1>Interview Setup</h1>;
}

function Interview() {
  return <h1>Interview</h1>;
}

function MyInterviews() {
  return <h1>My Interviews</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/interview" element={<InterviewSetup />} />
        <Route path="/interview/:id" element={<Interview />} />
        <Route path="/my-interviews" element={<MyInterviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
