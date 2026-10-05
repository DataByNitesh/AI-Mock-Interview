import { useLocation, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");

    navigate("/login");
  };

  const isHome = pathname === "/";
  const isMyInterviews =
    pathname === "/my-interviews" || pathname.startsWith("/interview");
  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";

  const linkClass = (isActive: boolean) =>
    [
      "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150",
      isActive
        ? "bg-brand-50 text-brand-700"
        : "text-muted hover:bg-canvas hover:text-ink",
    ].join(" ");

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur-sm">
      <div className="app-shell flex h-16 items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 rounded-md text-ink transition-opacity duration-150 hover:opacity-80"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <svg
              viewBox="0 0 32 32"
              className="h-5 w-5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="12.5" y="7.5" width="7" height="11" rx="3.5" />
              <path d="M9.5 15.5a6.5 6.5 0 0 0 13 0" />
              <path d="M16 22v3" />
            </svg>
          </span>

          <span className="text-[15px] font-semibold tracking-tight">
            InterviewAI
          </span>
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => navigate("/")}
            className={linkClass(isHome)}
          >
            Home
          </button>

          {token && (
            <>
              <button
                type="button"
                onClick={() => navigate("/my-interviews")}
                className={linkClass(isMyInterviews)}
              >
                My Interviews
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="ml-1 rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors duration-150 hover:bg-canvas hover:text-red-700"
              >
                Logout
              </button>
            </>
          )}

          {!token && (
            <>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className={linkClass(isLogin)}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className={`${linkClass(isRegister)} bg-brand-600 text-white hover:bg-brand-700 hover:text-white`}
              >
                Register
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;