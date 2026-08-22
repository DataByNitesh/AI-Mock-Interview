import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import InterviewSetup from "./pages/InterviewSetup.jsx";
import Interview from "./pages/Interview.jsx";
import MyInterviews from "./pages/MyInterviews.jsx";
import InterviewResult from "./pages/InterviewResult.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#f8fafc",
            border: "1px solid #1e3a5f",
            padding: "16px 20px",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: "500",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
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
