import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import api from "../services/api.ts";
import type { Interview, InterviewResponse } from "../types";

const Interview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState<Interview | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Read aloud is OFF by default.
  const [readAloud, setReadAloud] = useState<boolean>(false);

  useEffect(() => {
    const getInterview = async () => {
      try {
        const { data } = await api.get<InterviewResponse>(`/interview/${id}`);

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

  const speakQuestion = (question: string) => {
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

      if (currentQuestion === interview!.Questions.length - 1) {
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

      if (currentQuestion === interview!.Questions.length - 1) {
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
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-canvas text-sm text-muted">
        Loading interview...
      </div>
    );
  }

  if (error && !interview) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-canvas px-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  const question = interview!.Questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / interview!.Questions.length) * 100;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-canvas">
      <div className="app-shell py-10">
        <div className="mx-auto w-full max-w-3xl">
          <div className="card p-6 sm:p-8">
            {/* HEADER */}
            <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                  InterviewAI
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink">
                  {interview!.Role} Interview
                </h1>

                <p className="mt-1.5 text-sm text-muted">
                  Difficulty:{" "}
                  <span className="font-medium text-ink-soft">
                    {interview!.Difficulty}
                  </span>
                </p>
              </div>

              <span className="w-fit rounded-md border border-line bg-canvas px-3 py-1.5 text-xs font-medium tabular-nums text-ink-soft">
                Question {currentQuestion + 1} of {interview!.Questions.length}
              </span>
            </div>

          {/* PROGRESS */}
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-xs text-muted">
              <span>Progress</span>
              <span className="tabular-nums">{Math.round(progress)}%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-brand-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* QUESTION */}
          <div className="mt-6 rounded-lg border border-line bg-canvas p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                Question {currentQuestion + 1}
              </span>

              {/* READ ALOUD CONTROL */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleReadAloud}
                  className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                    readAloud
                      ? "border-brand-200 bg-brand-50 text-brand-700"
                      : "border-line-strong bg-surface text-muted hover:text-ink"
                  }`}
                >
                  {readAloud ? "Read aloud: on" : "Read aloud: off"}
                </button>

                {readAloud && (
                  <button
                    type="button"
                    onClick={() => speakQuestion(question.question)}
                    className="rounded-md border border-line-strong bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors duration-150 hover:border-brand-500 hover:text-brand-700"
                  >
                    Read again
                  </button>
                )}
              </div>
            </div>

            <h2 className="text-lg font-medium leading-7 text-ink sm:text-xl">
              {question.question}
            </h2>
          </div>

          {/* ANSWER */}
          <div className="mt-5">
            <label htmlFor="answer" className="field-label">
              Your Answer
            </label>

            <textarea
              id="answer"
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setAnswer(e.target.value)
              }
              disabled={submitting}
              className="field-control min-h-[160px] resize-y leading-6"
            />
          </div>

          {/* ERROR */}
          {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

          {/* ACTIONS */}
          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleSkipQuestion}
              disabled={submitting}
              className="btn btn-secondary"
            >
              Skip
            </button>

            <button
              type="button"
              onClick={handleSubmitAnswer}
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting
                ? "Saving..."
                : currentQuestion === interview!.Questions.length - 1
                  ? "Submit & Finish"
                  : "Submit Answer"}
            </button>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Interview;