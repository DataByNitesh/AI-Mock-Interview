import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-badge">AI-Powered Interview Practice</p>

          <h1>
            Practice Interviews.
            <span> Get Better.</span>
          </h1>

          <p className="hero-description">
            Practice realistic AI-powered interviews based on your role and
            difficulty level. Get personalized questions, detailed feedback, and
            track your progress.
          </p>

          <div className="hero-actions">
            <button
              className="hero-primary-button"
              onClick={() => navigate("/interview")}
            >
              Start Mock Interview
            </button>

            <button
              className="hero-secondary-button"
              onClick={() => navigate("/my-interviews")}
            >
              View My Interviews
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-header">
            <span className="hero-card-dot"></span>
            <p>AI Mock Interview</p>
          </div>

          <div className="hero-question">
            <span>Question 01</span>

            <h3>
              Explain the difference between useState and useEffect in React.
            </h3>
          </div>

          <div className="hero-progress">
            <div className="hero-progress-info">
              <span>Interview Progress</span>
              <span>1 / 5</span>
            </div>

            <div className="hero-progress-bar">
              <div className="hero-progress-fill"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <p>HOW IT WORKS</p>

          <h2>Practice smarter with AI</h2>

          <span>
            Everything you need to practice, evaluate, and improve your
            interview performance.
          </span>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">01</div>

            <h3>Choose Your Interview</h3>

            <p>
              Select your target role, difficulty level, and number of
              questions.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">02</div>

            <h3>Answer AI Questions</h3>

            <p>
              Practice with personalized interview questions generated for your
              chosen role.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">03</div>

            <h3>Get Your Results</h3>

            <p>
              Receive an overall score, answer evaluation, and detailed feedback
              to improve.
            </p>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div>
          <p>READY TO PRACTICE?</p>

          <h2>Your next interview starts now.</h2>

          <span>Build confidence by practicing before the real interview.</span>
        </div>

        <button
          className="hero-primary-button"
          onClick={() => navigate("/interview")}
        >
          Start Practicing
        </button>
      </section>
    </div>
  );
};

export default Home;
