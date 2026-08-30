import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  const isLoggedIn = !!token;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col items-center text-center">
          <p className="mb-5 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            AI-Powered Interview Practice
          </p>

          {isLoggedIn ? (
            <>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Hey, {userInfo?.name || "there"}! 👋
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                You're already set up. Start a new interview or review your
                previous interview results.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Practice Interviews.
                <span className="block text-blue-500">Get Better.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                Practice realistic AI-powered interviews based on your role and
                difficulty level. Get personalized questions, feedback, and
                track your progress.
              </p>
            </>
          )}

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            {/* START INTERVIEW */}
            <div className="group relative">
              <button
                type="button"
                disabled={!isLoggedIn}
                onClick={() => {
                  if (isLoggedIn) {
                    navigate("/interview");
                  }
                }}
                className={`rounded-lg px-6 py-3 font-semibold transition ${
                  isLoggedIn
                    ? "cursor-pointer bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
                    : "cursor-not-allowed bg-slate-800 text-slate-500"
                }`}
              >
                Start New Interview
              </button>

              {!isLoggedIn && (
                <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-56 -translate-x-1/2 rounded-lg border border-blue-500/30 bg-slate-900 px-4 py-2 text-center text-sm text-blue-400 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
                  Please login or register first
                </div>
              )}
            </div>

            {/* MY INTERVIEWS */}
            <div className="group relative">
              <button
                type="button"
                disabled={!isLoggedIn}
                onClick={() => {
                  if (isLoggedIn) {
                    navigate("/my-interviews");
                  }
                }}
                className={`rounded-lg border px-6 py-3 font-semibold transition ${
                  isLoggedIn
                    ? "cursor-pointer border-slate-700 bg-slate-900 text-slate-300 hover:border-blue-500 hover:bg-slate-800 hover:text-blue-400"
                    : "cursor-not-allowed border-slate-800 bg-slate-900 text-slate-600"
                }`}
              >
                My Interviews
              </button>

              {!isLoggedIn && (
                <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-56 -translate-x-1/2 rounded-lg border border-blue-500/30 bg-slate-900 px-4 py-2 text-center text-sm text-blue-400 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
                  Please login or register first
                </div>
              )}
            </div>
          </div>

          {!isLoggedIn && (
            <p className="mt-5 text-sm text-slate-500">
              Login or create an account to start practicing.
            </p>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            HOW IT WORKS
          </p>

          <h2 className="mt-2 text-3xl font-bold">Practice smarter with AI</h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Everything you need to practice, evaluate, and improve your
            interview performance.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/40">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 font-bold text-blue-400">
              01
            </div>

            <h3 className="text-xl font-semibold">Choose Your Interview</h3>

            <p className="mt-3 leading-6 text-slate-400">
              Select your target role, difficulty level, and number of
              questions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/40">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 font-bold text-blue-400">
              02
            </div>

            <h3 className="text-xl font-semibold">Answer AI Questions</h3>

            <p className="mt-3 leading-6 text-slate-400">
              Practice with personalized interview questions generated for your
              chosen role.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/40">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 font-bold text-blue-400">
              03
            </div>

            <h3 className="text-xl font-semibold">Get Your Results</h3>

            <p className="mt-3 leading-6 text-slate-400">
              Receive an overall score, answer evaluation, and detailed feedback
              to improve.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-semibold text-blue-400">
              READY TO PRACTICE?
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Your next interview starts now.
            </h2>

            <p className="mt-2 text-slate-400">
              Build confidence by practicing before the real interview.
            </p>
          </div>

          <button
            type="button"
            disabled={!isLoggedIn}
            onClick={() => {
              if (isLoggedIn) {
                navigate("/interview");
              }
            }}
            className={`rounded-lg px-6 py-3 font-semibold transition ${
              isLoggedIn
                ? "cursor-pointer bg-blue-600 text-white hover:bg-blue-500"
                : "cursor-not-allowed bg-slate-800 text-slate-500"
            }`}
          >
            Start Practicing
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
