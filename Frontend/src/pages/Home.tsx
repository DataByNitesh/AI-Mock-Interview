import { useNavigate } from "react-router";

const steps = [
  {
    number: "01",
    title: "Pick your role & difficulty",
    description:
      "Choose the job role and how tough you want it.",
  },
  {
    number: "02",
    title: "Answer AI questions",
    description: "Type or speak your answers at your own pace.",
  },
  {
    number: "03",
    title: "Get scored instantly",
    description: "See your score and detailed feedback per answer.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const isLoggedIn = !!token;

  return (
    <main className="bg-canvas">
      {/* HERO */}
      <section className="app-shell py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            AI-powered interview practice
          </p>

          {isLoggedIn ? (
            <>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Ready for your next interview?
              </h1>

              <p className="mt-4 text-lg leading-8 text-muted">
                Practice realistic interviews, get AI-powered feedback, and
                track your progress.
              </p>
            </>
          ) : (
            <>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Practice interviews.
                <span className="block text-brand-700">Get better.</span>
              </h1>

              <p className="mt-4 text-lg leading-8 text-muted">
                Practice realistic AI-powered interviews based on your role and
                difficulty level. Get personalized questions, feedback, and
                track your progress.
              </p>
            </>
          )}

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
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
                className="btn btn-primary"
              >
                Start New Interview
              </button>

              {!isLoggedIn && (
                <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-56 -translate-x-1/2 rounded-md border border-line bg-surface px-3 py-2 text-center text-xs text-muted opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
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
                className="btn btn-secondary"
              >
                My Interviews
              </button>

              {!isLoggedIn && (
                <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-56 -translate-x-1/2 rounded-md border border-line bg-surface px-3 py-2 text-center text-xs text-muted opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
                  Please login or register first
                </div>
              )}
            </div>
          </div>

          {!isLoggedIn && (
            <p className="mt-5 text-sm text-muted">
              Login or create an account to start practicing.
            </p>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section className="app-shell pb-16">
        <div className="border-t border-line pt-12">
          <h2 className="text-xl font-semibold text-ink">
            Your personal interview coach
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="card p-5">
                <span className="text-xs font-semibold tabular-nums text-brand-600">
                  {step.number}
                </span>

                <h3 className="mt-3 text-[15px] font-semibold text-ink">
                  {step.title}
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="app-shell pb-20">
        <div className="card flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-lg font-semibold text-ink">
              Ready to practice?
            </h2>

            <p className="mt-1.5 text-sm text-muted">
              Start an interview and see how you perform.
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
            className="btn btn-primary w-full sm:w-auto"
          >
            Start Practicing
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;