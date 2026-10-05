import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/api.ts";
import {
  getScoreTone,
  scoreBadgeTone,
  scoreTextTone,
} from "../utils/scoreTone.ts";
import type { Interview, InterviewResponse } from "../types";

const InterviewResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getInterviewResult = async () => {
      try {
        const { data } = await api.get<InterviewResponse>(`/interview/${id}`);
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
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-canvas">
        <p className="text-sm text-muted">Loading interview result...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-canvas px-6">
        <div className="rounded-md border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-canvas">
        <p className="text-sm text-muted">Interview not found</p>
      </div>
    );
  }

  const overallTone = getScoreTone(interview.overallScore);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-canvas">
      <div className="app-shell py-10">
        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            className="btn btn-secondary mb-6 -ml-1"
            onClick={() => navigate("/my-interviews")}
          >
            Back to My Interviews
          </button>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-success-700">
              Interview Complete
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {interview.Role} Interview Result
            </h1>

            <p className="mt-2 text-sm text-muted">
              Difficulty:{" "}
              <span className="font-medium text-ink-soft">
                {interview.Difficulty}
              </span>
            </p>
          </div>
        </div>

        {/* Overall Result */}
        <div className="mb-10 grid gap-4 md:grid-cols-[200px_1fr]">
          {/* Score */}
          <div className="card flex flex-col items-center justify-center p-6 text-center">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              Overall Score
            </span>

            <h2
              className={`mt-2 text-4xl font-bold tabular-nums ${scoreTextTone[overallTone]}`}
            >
              {interview.overallScore ?? "N/A"}
              <span className="text-lg font-medium text-faint">/10</span>
            </h2>
          </div>

          {/* Feedback */}
          <div className="card p-6">
            <h3 className="mb-2.5 text-sm font-semibold text-ink">
              AI Feedback
            </h3>

            <p className="text-sm leading-7 text-muted">
              {interview.overallFeedback || "No overall feedback available."}
            </p>
          </div>
        </div>

        {/* Question Breakdown */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-ink">
              Question Breakdown
            </h2>

            <p className="mt-1 text-sm text-muted">
              Review your answers and AI evaluation.
            </p>
          </div>

          <div className="space-y-3">
            {interview.Questions.map((item, index) => (
              <div className="card p-5" key={item._id || index}>
                {/* Question Header */}
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                    Question {index + 1}
                  </span>

                  {item.skipped ? (
                    <span className="rounded-md border border-line bg-canvas px-2 py-1 text-xs font-medium text-muted">
                      Skipped
                    </span>
                  ) : (
                    <span
                      className={`rounded-md border px-2 py-1 text-xs font-medium tabular-nums ${scoreBadgeTone[getScoreTone(item.score)]}`}
                    >
                      {item.score ?? "N/A"} / 10
                    </span>
                  )}
                </div>

                {/* Question */}
                <h3 className="mb-4 text-[15px] font-medium leading-6 text-ink">
                  {item.question}
                </h3>

                {item.skipped ? (
                  <p className="rounded-md border border-line bg-canvas px-4 py-3 text-sm text-faint">
                    This question was skipped.
                  </p>
                ) : (
                  <div className="rounded-md border border-line bg-canvas p-4">
                    <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-faint">
                      Your Answer
                    </h4>

                    <p className="whitespace-pre-wrap text-sm leading-7 text-muted">
                      {item.answer || "No answer provided."}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/interview")}
          >
            Start New Interview
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/my-interviews")}
          >
            My Interviews
          </button>
        </div>
      </div>
    </main>
  );
};

export default InterviewResult;