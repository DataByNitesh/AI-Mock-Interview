import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/api";

const InterviewResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getInterviewResult = async () => {
      try {
        const { data } = await api.get(`/interview/${id}`);

        setInterview(data.interview);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load interview result",
        );
      } finally {
        setLoading(false);
      }
    };

    getInterviewResult();
  }, [id]);

  if (loading) {
    return <div className="result-message">Loading interview result...</div>;
  }

  if (error) {
    return <div className="result-message error-message">{error}</div>;
  }

  if (!interview) {
    return <div className="result-message">Interview not found</div>;
  }

  return (
    <div className="result-container">
      <div className="result-header">
        <button
          className="back-button"
          onClick={() => navigate("/my-interviews")}
        >
          ← Back to My Interviews
        </button>

        <div className="result-title">
          <h1>{interview.Role} Interview Result</h1>

          <p>Difficulty: {interview.Difficulty}</p>
        </div>
      </div>

      <div className="overall-result">
        <div className="overall-score">
          <span className="score-label">Overall Score</span>

          <h2>
            {interview.overallScore ?? "N/A"}
            <span>/10</span>
          </h2>
        </div>

        <div className="overall-feedback">
          <h3>AI Feedback</h3>

          <p>{interview.overallFeedback || "No overall feedback available."}</p>
        </div>
      </div>

      <div className="question-results">
        <h2>Question Breakdown</h2>

        {interview.Questions.map((item, index) => (
          <div className="result-question-card" key={item._id || index}>
            <div className="question-result-header">
              <span className="question-number">Question {index + 1}</span>

              {item.skipped ? (
                <span className="skipped-badge">Skipped</span>
              ) : (
                <span className="question-score">
                  Score: {item.score ?? "N/A"} / 10
                </span>
              )}
            </div>

            <h3>{item.question}</h3>

            {item.skipped ? (
              <div className="skipped-answer">This question was skipped.</div>
            ) : (
              <div className="answer-section">
                <h4>Your Answer</h4>

                <p>{item.answer || "No answer provided."}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="result-actions">
        <button
          className="result-new-interview-button"
          onClick={() => navigate("/interview")}
        >
          Start New Interview
        </button>

        <button
          className="result-history-button"
          onClick={() => navigate("/my-interviews")}
        >
          My Interviews
        </button>
      </div>
    </div>
  );
};

export default InterviewResult;
