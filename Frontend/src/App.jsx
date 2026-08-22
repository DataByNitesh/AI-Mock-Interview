import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import InterviewSetup from "./pages/InterviewSetup.jsx";
import Interview from "./pages/Interview.jsx";
import MyInterviews from "./pages/MyInterviews.jsx";
import InterviewResult from "./pages/InterviewResult.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/interview" element={<InterviewSetup />} />
        <Route path="/interview/:id" element={<Interview />} />
        <Route path="/my-interviews" element={<MyInterviews />} />
        <Route path="/interview/:id/result" element={<InterviewResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
