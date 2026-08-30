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
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <p className="text-lg text-slate-400">Loading interview result...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <p className="text-lg text-slate-400">Interview not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <button
            className="mb-6 cursor-pointer rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:bg-slate-800 hover:text-blue-400"
            onClick={() => navigate("/my-interviews")}
          >
            ← Back to My Interviews
          </button>

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
              Interview Complete
            </p>

            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              {interview.Role} Interview Result
            </h1>

            <p className="mt-2 text-slate-400">
              Difficulty: {interview.Difficulty}
            </p>
          </div>
        </div>

        {/* Overall Result */}
        <div className="mb-8 grid gap-6 md:grid-cols-[220px_1fr]">
          {/* Score */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
            <span className="text-sm font-medium text-slate-400">
              Overall Score
            </span>

            <h2 className="mt-3 text-5xl font-bold text-blue-400">
              {interview.overallScore ?? "N/A"}
              <span className="text-2xl text-slate-500">/10</span>
            </h2>
          </div>

          {/* Feedback */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
            <h3 className="mb-3 text-xl font-semibold text-white">
              AI Feedback
            </h3>

            <p className="leading-7 text-slate-400">
              {interview.overallFeedback || "No overall feedback available."}
            </p>
          </div>
        </div>

        {/* Question Breakdown */}
        <div>
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-white">
              Question Breakdown
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review your answers and AI evaluation.
            </p>
          </div>

          <div className="space-y-5">
            {interview.Questions.map((item, index) => (
              <div
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                key={item._id || index}
              >
                {/* Question Header */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm font-semibold text-blue-400">
                    Question {index + 1}
                  </span>

                  {item.skipped ? (
                    <span className="w-fit rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                      Skipped
                    </span>
                  ) : (
                    <span className="w-fit rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                      Score: {item.score ?? "N/A"} / 10
                    </span>
                  )}
                </div>

                {/* Question */}
                <h3 className="mb-6 text-lg font-semibold leading-relaxed text-white">
                  {item.question}
                </h3>

                {item.skipped ? (
                  <div className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-4 text-sm text-slate-500">
                    This question was skipped.
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                    <h4 className="mb-2 text-sm font-semibold text-slate-300">
                      Your Answer
                    </h4>

                    <p className="whitespace-pre-wrap leading-7 text-slate-400">
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
            className="cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
            onClick={() => navigate("/interview")}
          >
            Start New Interview
          </button>

          <button
            className="cursor-pointer rounded-lg border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-300 transition hover:border-blue-500 hover:bg-slate-800 hover:text-blue-400"
            onClick={() => navigate("/my-interviews")}
          >
            My Interviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewResult;
