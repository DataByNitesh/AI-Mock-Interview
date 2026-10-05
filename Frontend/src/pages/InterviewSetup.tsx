import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../services/api.ts";
import type { InterviewResponse, InterviewSetupForm } from "../types";

const InterviewSetup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<InterviewSetupForm>({
    role: "",
    difficulty: "Beginner",
    questionCount: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      const interviewRequest = api.post<InterviewResponse>("/interview/create", {
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
    <main className="min-h-[calc(100vh-4rem)] bg-canvas">
      <div className="app-shell py-12 sm:py-16">
        <div className="mx-auto max-w-xl">
          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
              InterviewAI
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Start Mock Interview
            </h1>

            <p className="mt-2.5 text-sm leading-6 text-muted">
              Create a personalized AI interview based on your role and
              experience level.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form
            className="card p-6 sm:p-8"
            onSubmit={handleSubmit}
          >
            {/* Role */}
            <div className="mb-6">
              <label htmlFor="role" className="field-label">
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
                className="field-control"
              />
            </div>

            {/* Difficulty */}
            <div className="mb-6">
              <label htmlFor="difficulty" className="field-label">
                Choose your difficulty level
              </label>

              <select
                id="difficulty"
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className="field-control cursor-pointer"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            {/* Question Count */}
            <div className="mb-8">
              <label htmlFor="questionCount" className="field-label">
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
                className="field-control"
              />

              <p className="mt-2 text-xs text-faint">
                Choose between 1 and 10 questions.
              </p>
            </div>

            {/* Button */}
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Generating Questions..." : "Start Interview"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default InterviewSetup;