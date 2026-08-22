import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

const InterviewSetup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "",
    difficulty: "Beginner",
    questionCount: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      const { data } = await api.post("/interview/create", {
        ...form,
        questionCount: Number(form.questionCount),
      });

      navigate(`/interview/${data.interview._id}`);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setup-container">
      <form className="setup-form" onSubmit={handleSubmit}>
        <h2>Start Mock Interview</h2>

        <p className="setup-description">
          Create a personalized AI interview based on your role and experience
          level.
        </p>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="role">What role are you applying for?</label>

          <input
            id="role"
            type="text"
            name="role"
            placeholder="e.g. Frontend Developer"
            value={form.role}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Choose your difficulty level</label>

          <select
            id="difficulty"
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="questionCount">How many questions do you want?</label>

          <input
            id="questionCount"
            type="number"
            name="questionCount"
            placeholder="1 - 10"
            min="1"
            max="10"
            value={form.questionCount}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="start-button" disabled={loading}>
          {loading ? "Generating Questions..." : "Start Interview"}
        </button>
      </form>
    </div>
  );
};

export default InterviewSetup;
