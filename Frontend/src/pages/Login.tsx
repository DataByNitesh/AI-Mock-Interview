import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../services/api.ts";
import type { LoginForm, LoginResponse } from "../types";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const loginRequest = api.post<LoginResponse>("/auth/login", form);

      const { data } = await toast.promise(
        loginRequest,
        {
          loading: "Authenticating securely...",
          success: (res) => `Welcome back, ${res.data.Login.Name}!`,
          error: (error) =>
            error.response?.data?.message || "Failed to log in. Try again.",
        },
        {
          style: {
            minWidth: "320px",
          },
        },
      );

      localStorage.setItem("token", data.Login.Token);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          name: data.Login.Name,
          email: data.Login.Email,
        }),
      );

      navigate("/");
    } catch (error) {
      console.error(error?.response?.data?.message || "Error logging in");
    } finally {
      setLoading(false);
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
              Welcome back
            </h1>

            <p className="mt-1.5 text-sm text-muted">
              Login to continue your interview practice
            </p>
          </div>

          <div className="space-y-4">
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
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="field-control"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary mt-6 w-full">
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-6 text-center text-sm text-muted">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-medium text-brand-700 transition-colors duration-150 hover:text-brand-600"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;