import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import api from "../services/api.ts";
import type { RegisterForm, RegisterResponse } from "../types";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post<RegisterResponse>("/auth/register", form);
      navigate("/login");
    } catch (error) {
      console.error(
        error.response?.data?.message || "Registration error occurred",
      );
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-canvas px-6 py-12">
      <div className="w-full max-w-sm">
        <form className="card p-6 sm:p-8" onSubmit={handleSubmit}>
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
              InterviewAI
            </p>

            <h1 className="mt-2 text-xl font-bold tracking-tight text-ink">
              Create your account
            </h1>

            <p className="mt-1.5 text-sm text-muted">
              Create your account and start practicing
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="field-label">
                Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-control"
              />
            </div>

            <div>
              <label htmlFor="email" className="field-label">
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-control"
              />
            </div>

            <div>
              <label htmlFor="password" className="field-label">
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
                className="field-control"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-6 w-full">
            Create Account
          </button>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium text-brand-700 transition-colors duration-150 hover:text-brand-600"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;