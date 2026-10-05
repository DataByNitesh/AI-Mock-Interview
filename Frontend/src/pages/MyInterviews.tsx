import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api.ts";
import {
  getScoreTone,
  scoreBarTone,
  scoreTextTone,
} from "../utils/scoreTone.ts";
import type { Interview, MyInterviewsResponse } from "../types";

const MyInterviews = () => {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        setError("");

        const { data } = await api.get<MyInterviewsResponse>(
          "/interview/my-interviews",
        );

        setInterviews(data.interviews);
      } catch (error) {
        setError(error?.response?.data?.message || "Failed to load interviews");
      } finally {
        setLoading(false);
      }
    };

    getMyInterviews();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-canvas text-sm text-muted">
        Loading interviews...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-canvas px-4">
        <div className="text-center">
          <p className="text-sm text-red-700">{error}</p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-secondary mt-5"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-canvas">
      <div className="app-shell py-10">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink">
              My Interviews
            </h1>

            <p className="mt-1.5 text-sm text-muted">
              Your mock interview history and progress.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/interview")}
            className="btn btn-primary w-full sm:w-auto"
          >
            New Interview
          </button>
        </div>

        {/* EMPTY STATE */}
        {interviews.length === 0 ? (
          <div className="card px-6 py-14 text-center">
            <h2 className="text-base font-semibold text-ink">
              No interviews yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              Create your first AI mock interview and start practicing.
            </p>

            <button
              type="button"
              onClick={() => navigate("/interview")}
              className="btn btn-primary mt-6"
            >
              Start Interview
            </button>
          </div>
        ) : (
          /* INTERVIEWS */
          <div>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Your Interview History
              </h2>

              <span className="h-px flex-1 bg-line" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {interviews.map((interview) => {
                const tone = getScoreTone(interview.overallScore);

                return (
                  <div className="card flex flex-col p-6" key={interview._id}>
                    {/* CARD HEADER */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold leading-6 text-ink">
                        {interview.Role}
                      </h3>

                      <span
                        className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium ${
                          interview.status === "completed"
                            ? "border-success-200 bg-success-50 text-success-700"
                            : "border-brand-200 bg-brand-50 text-brand-700"
                        }`}
                      >
                        {interview.status || "in-progress"}
                      </span>
                    </div>

                    {/* META */}
                    <p className="mt-1.5 text-xs text-faint">
                      {interview.Difficulty} •{" "}
                      {new Date(interview.createdAt).toLocaleDateString()}
                    </p>

                    {/* COMPLETED */}
                    {interview.status === "completed" ? (
                      <>
                        <div className="mt-5 border-t border-line pt-5">
                          <p className="text-xs font-medium uppercase tracking-wider text-muted">
                            Overall Score
                          </p>

                          <h4
                            className={`mt-1.5 text-4xl font-bold leading-none tabular-nums ${scoreTextTone[tone]}`}
                          >
                            {interview.overallScore ?? "N/A"}
                            <span className="text-base font-medium text-faint">
                              {" "}
                              / 10
                            </span>
                          </h4>

                          <div
                            className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-line"
                            role="presentation"
                          >
                            <div
                              className={`h-full rounded-full ${scoreBarTone[tone]}`}
                              style={{
                                width: `${Math.min(100, Math.max(0, (Number(interview.overallScore) || 0) * 10))}%`,
                              }}
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          className="btn btn-secondary mt-auto w-full"
                          onClick={() =>
                            navigate(`/interview/${interview._id}/result`)
                          }
                        >
                          View Results →
                        </button>
                      </>
                    ) : (
                      /* IN PROGRESS */
                      <>
                        <div className="mt-5 border-t border-line pt-5">
                          <p className="text-xs font-medium uppercase tracking-wider text-muted">
                            Questions
                          </p>

                          <p className="mt-1.5 text-sm text-ink-soft">
                            {interview.Questions?.length || 0} questions
                          </p>

                          <p className="mt-3 text-xs text-faint">
                            Not completed yet.
                          </p>
                        </div>

                        <button
                          type="button"
                          className="btn btn-primary mt-auto w-full"
                          onClick={() => navigate(`/interview/${interview._id}`)}
                        >
                          Continue Interview
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyInterviews;