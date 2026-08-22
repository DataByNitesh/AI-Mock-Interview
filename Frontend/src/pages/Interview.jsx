import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import api from "../services/api";

const Interview = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const getInterview = async () => {
      try {
        const { data } = await api.get(`/interview/${id}`);

        setInterview(data.interview);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load interview");
      } finally {
        setLoading(false);
      }
    };

    getInterview();
  }, [id]);

  const speakQuestion = (question) => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(question);

    speech.rate = 0.9;

    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    if (interview?.Questions?.[currentQuestion]) {
      speakQuestion(interview.Questions[currentQuestion].question);
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [interview, currentQuestion]);

  const moveToNextQuestion = () => {
    setAnswer("");

    setCurrentQuestion((prev) => prev + 1);
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      setError("Please write an answer or skip the question.");

      return;
    }

    try {
      setSubmitting(true);

      setError("");

      await api.post(`/interview/${id}/answer`, {
        questionIndex: currentQuestion,
        answer: answer.trim(),
      });

      if (currentQuestion === interview.Questions.length - 1) {
        await handleFinishInterview();

        return;
      }

      moveToNextQuestion();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save answer");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkipQuestion = async () => {
    try {
      setSubmitting(true);

      setError("");

      await api.post(`/interview/${id}/skip`, {
        questionIndex: currentQuestion,
      });

      if (currentQuestion === interview.Questions.length - 1) {
        await handleFinishInterview();

        return;
      }

      moveToNextQuestion();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to skip question");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinishInterview = async () => {
    try {
      setSubmitting(true);

      setError("");

      await toast.promise(
        api.post(`/interview/${id}/finish`),
        {
          loading: "AI is analyzing your answers and generating your result...",
          success: "Your interview result is ready!",
          error: (error) =>
            error.response?.data?.message ||
            "Failed to generate interview result",
        },
        {
          style: {
            minWidth: "320px",
          },
        },
      );

      window.speechSynthesis.cancel();

      navigate(`/interview/${id}/result`);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to finish interview");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="interview-message">Loading interview...</div>;
  }

  if (error && !interview) {
    return <div className="interview-message error-message">{error}</div>;
  }

  const question = interview.Questions[currentQuestion];

  const progress = ((currentQuestion + 1) / interview.Questions.length) * 100;

  return (
    <div className="interview-container">
      <div className="interview-card">
        <div className="interview-header">
          <div>
            <h2>{interview.Role} Interview</h2>

            <p>{interview.Difficulty}</p>
          </div>

          <span>
            Question {currentQuestion + 1} of {interview.Questions.length}
          </span>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="question-section">
          <h3>{question.question}</h3>

          <button
            type="button"
            className="read-button"
            onClick={() => speakQuestion(question.question)}
          >
            🔊 Read Again
          </button>
        </div>

        <textarea
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={submitting}
        />

        {error && <p className="error-message">{error}</p>}

        <div className="interview-actions">
          <button
            type="button"
            className="skip-button"
            onClick={handleSkipQuestion}
            disabled={submitting}
          >
            Skip
          </button>

          <button
            type="button"
            className="submit-answer-button"
            onClick={handleSubmitAnswer}
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : currentQuestion === interview.Questions.length - 1
                ? "Submit & Finish"
                : "Submit Answer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interview;
