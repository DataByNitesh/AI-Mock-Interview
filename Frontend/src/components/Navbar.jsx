import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");

    navigate("/login");
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-lg font-semibold text-white transition-colors duration-200 hover:text-blue-400"
        >
          AI Mock Interview
        </button>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/")}
            className="rounded-md px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white"
          >
            Home
          </button>

          {token && (
            <>
              <button
                onClick={() => navigate("/my-interviews")}
                className="rounded-md px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white"
              >
                My Interviews
              </button>

              <button
                onClick={handleLogout}
                className="rounded-md px-4 py-2 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300"
              >
                Logout
              </button>
            </>
          )}

          {!token && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="rounded-md px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-500"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
