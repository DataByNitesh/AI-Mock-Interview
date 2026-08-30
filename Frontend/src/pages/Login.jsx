import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api.js";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", form);

      console.log(data);

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
      console.error(error.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12">
      <div className="w-full max-w-md">
        <form
          className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>

            <p className="mt-2 text-sm text-slate-400">
              Login to continue your interview practice
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
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
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
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
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Login
          </button>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="cursor-pointer font-medium text-blue-400 transition-colors hover:text-blue-300"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
