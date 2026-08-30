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

  // Read aloud is OFF by default.
  const [readAloud, setReadAloud] = useState(false);

  useEffect(() => {
    const getInterview = async () => {
      try {
        const { data } = await api.get(`/interview/${id}`);

        setInterview(data.interview);
      } catch (error) {
        setError(error?.response?.data?.message || "Failed to load interview");
      } finally {
        setLoading(false);
      }
    };

    getInterview();
  }, [id]);

  // Stop speech whenever the page/question changes.
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentQuestion]);

  const speakQuestion = (question) => {
    if (!readAloud) {
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(question);

    speech.rate = 0.9;

    window.speechSynthesis.speak(speech);
  };

  const toggleReadAloud = () => {
    setReadAloud((prev) => {
      const newValue = !prev;

      if (!newValue) {
        window.speechSynthesis.cancel();
      }

      return newValue;
    });
  };

  const moveToNextQuestion = () => {
    window.speechSynthesis.cancel();

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
      setError(error?.response?.data?.message || "Failed to save answer");
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
      setError(error?.response?.data?.message || "Failed to skip question");
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
            error?.response?.data?.message ||
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
      setError(error?.response?.data?.message || "Failed to finish interview");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        Loading interview...
      </div>
    );
  }

  if (error && !interview) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
        {error}
      </div>
    );
  }

  const question = interview.Questions[currentQuestion];

  const progress = ((currentQuestion + 1) / interview.Questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8">
          {/* HEADER */}
          <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-blue-400">
                AI Mock Interview
              </p>

              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                {interview.Role} Interview
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Difficulty: {interview.Difficulty}
              </p>
            </div>

            <span className="w-fit rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
              Question {currentQuestion + 1} of {interview.Questions.length}
            </span>
          </div>

          {/* PROGRESS */}
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-xs text-slate-400">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* QUESTION */}
          <div className="mt-7 rounded-xl border border-slate-800 bg-slate-950 p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-blue-400">
                Question {currentQuestion + 1}
              </span>

              {/* READ ALOUD CONTROL */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleReadAloud}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    readAloud
                      ? "border-blue-500 bg-blue-500/10 text-blue-400"
                      : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                  }`}
                >
                  {readAloud ? "🔊 Read Aloud: On" : "🔇 Read Aloud: Off"}
                </button>

                {readAloud && (
                  <button
                    type="button"
                    onClick={() => speakQuestion(question.question)}
                    className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                  >
                    🔊 Read Again
                  </button>
                )}
              </div>
            </div>

            <h2 className="text-xl font-semibold leading-relaxed text-white sm:text-2xl">
              {question.question}
            </h2>
          </div>

          {/* ANSWER */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Your Answer
            </label>

            <textarea
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={submitting}
              className="min-h-[180px] w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-relaxed text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* ERROR */}
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

          {/* ACTIONS */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleSkipQuestion}
              disabled={submitting}
              className="rounded-lg border border-yellow-600/60 bg-yellow-500/5 px-6 py-3 font-semibold text-yellow-400 transition hover:border-yellow-500 hover:bg-yellow-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Skip
            </button>

            <button
              type="button"
              onClick={handleSubmitAnswer}
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
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
    </div>
  );
};

export default Interview;
