import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import InterviewSetup from "./pages/InterviewSetup.tsx";
import Interview from "./pages/Interview.tsx";
import MyInterviews from "./pages/MyInterviews.tsx";
import InterviewResult from "./pages/InterviewResult.tsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#1c1917",
            border: "1px solid #e7e5e4",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
          },
        }}
      />

      <Navbar />

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