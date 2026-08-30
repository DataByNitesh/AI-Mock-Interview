import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
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

      const interviewRequest = api.post("/interview/create", {
        ...form,
        questionCount: Number(form.questionCount),
      });

      const { data } = await toast.promise(
        interviewRequest,
        {
          loading: "AI is preparing your interview...",
          success: "Interview is ready!",
          error: (error) =>
            error.response?.data?.message || "Failed to prepare interview",
        },
        {
          style: {
            minWidth: "320px",
          },
        },
      );

      navigate(`/interview/${data.interview._id}`);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
        <form
          className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
          onSubmit={handleSubmit}
        >
          {/* Header */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
              AI Mock Interview
            </p>

            <h2 className="text-3xl font-bold text-white">
              Start Mock Interview
            </h2>

            <p className="mt-2 text-slate-400">
              Create a personalized AI interview based on your role and
              experience level.
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Role */}
          <div className="mb-6">
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              What role are you applying for?
            </label>

            <input
              id="role"
              type="text"
              name="role"
              placeholder="e.g. Frontend Developer"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <label
              htmlFor="difficulty"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Choose your difficulty level
            </label>

            <select
              id="difficulty"
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="w-full cursor-pointer rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* Question Count */}
          <div className="mb-8">
            <label
              htmlFor="questionCount"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              How many questions do you want?
            </label>

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
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <p className="mt-2 text-xs text-slate-500">
              Choose between 1 and 10 questions.
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Generating Questions..." : "Start Interview"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterviewSetup;
