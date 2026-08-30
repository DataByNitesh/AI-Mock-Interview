import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

const MyInterviews = () => {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        setError("");

        const { data } = await api.get("/interview/my-interviews");

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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        Loading interviews...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="text-center">
          <p className="text-red-400">{error}</p>

          <button
            onClick={() => navigate("/")}
            className="mt-4 rounded-lg border border-slate-700 px-5 py-2 text-sm text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">My Interviews</h1>

            <p className="mt-2 text-slate-400">
              Your mock interview history and progress.
            </p>
          </div>

          <button
            onClick={() => navigate("/interview")}
            className="w-fit rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            + New Interview
          </button>
        </div>

        {/* EMPTY STATE */}
        {interviews.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-12 text-center">
            <h2 className="text-xl font-semibold text-white">
              No interviews yet
            </h2>

            <p className="mt-2 text-slate-400">
              Create your first AI mock interview and start practicing.
            </p>

            <button
              onClick={() => navigate("/interview")}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Start Interview
            </button>
          </div>
        ) : (
          /* INTERVIEWS */
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {interviews.map((interview) => (
              <div
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-slate-700"
                key={interview._id}
              >
                {/* CARD HEADER */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold text-white">
                    {interview.Role}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      interview.status === "completed"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {interview.status || "in-progress"}
                  </span>
                </div>

                {/* META */}
                <p className="mt-3 text-sm text-slate-400">
                  {interview.Difficulty} •{" "}
                  {new Date(interview.createdAt).toLocaleDateString()}
                </p>

                {/* COMPLETED */}
                {interview.status === "completed" ? (
                  <div className="mt-6">
                    <p className="text-sm text-slate-400">Overall Score</p>

                    <h3 className="mt-1 text-3xl font-bold text-white">
                      {interview.overallScore ?? "N/A"}
                      <span className="text-base font-normal text-slate-500">
                        {" "}
                        / 10
                      </span>
                    </h3>

                    <button
                      className="mt-5 w-full rounded-lg border border-slate-700 px-4 py-3 font-medium text-slate-200 transition hover:border-blue-500 hover:text-blue-400"
                      onClick={() =>
                        navigate(`/interview/${interview._id}/result`)
                      }
                    >
                      View Full Result
                    </button>
                  </div>
                ) : (
                  /* IN PROGRESS */
                  <div className="mt-6">
                    <p className="text-sm text-slate-400">
                      {interview.Questions?.length || 0} questions
                    </p>

                    <button
                      className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500"
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
    </div>
  );
};

export default MyInterviews;
