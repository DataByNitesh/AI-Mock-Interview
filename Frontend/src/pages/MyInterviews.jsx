import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../services/api";

const MyInterviews = () => {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        const { data } = await toast.promise(
          api.get("/interview/my-interviews"),
          {
            loading: "Loading your interviews...",
            success: "Interviews loaded!",
            error: (error) =>
              error.response?.data?.message || "Failed to load interviews",
          },
        );

        setInterviews(data.interviews);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load interviews");
      } finally {
        setLoading(false);
      }
    };

    getMyInterviews();
  }, []);

  if (loading) {
    return <div className="page-message">Loading interviews...</div>;
  }

  if (error) {
    return <div className="page-message error-message">{error}</div>;
  }

  return (
    <div className="my-interviews-container">
      <div className="my-interviews-header">
        <div>
          <h1>My Interviews</h1>

          <p>Your mock interview history and progress.</p>
        </div>

        <button
          className="new-interview-button"
          onClick={() => navigate("/interview")}
        >
          + New Interview
        </button>
      </div>

      {interviews.length === 0 ? (
        <div className="empty-state">
          <h2>No interviews yet</h2>

          <p>Create your first AI mock interview and start practicing.</p>

          <button onClick={() => navigate("/interview")}>
            Start Interview
          </button>
        </div>
      ) : (
        <div className="interviews-grid">
          {interviews.map((interview) => (
            <div className="interview-item" key={interview._id}>
              <div className="interview-item-header">
                <h2>{interview.Role}</h2>

                <span className={`status ${interview.status || "in-progress"}`}>
                  {interview.status || "in-progress"}
                </span>
              </div>

              <p className="interview-meta">
                {interview.Difficulty} •{" "}
                {new Date(interview.createdAt).toLocaleDateString()}
              </p>

              {interview.status === "completed" ? (
                <div className="completed-info">
                  <p className="score">Overall Score</p>

                  <h3>
                    {interview.overallScore ?? "N/A"}

                    <span> / 10</span>
                  </h3>

                  <button
                    className="view-result-button"
                    onClick={() =>
                      navigate(`/interview/${interview._id}/result`)
                    }
                  >
                    View Full Result
                  </button>
                </div>
              ) : (
                <div className="in-progress-info">
                  <p>{interview.Questions.length} questions</p>

                  <button
                    className="continue-button"
                    onClick={() => navigate(`/interview/${interview._id}`)}
                  >
                    Continue Interview
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInterviews;
