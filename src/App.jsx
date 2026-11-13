import "./App.css";
import SectionCard from "./components/SectionCard.jsx";

function App() {
  const sections = [
    {
      number: "01",
      title: "The Unsaid",
      description: "The words we never found the courage to say.",
      icon: "✉",
      color: "#E9D5CA",
      link: "#unsaid",
    },
    {
      number: "02",
      title: "The Keepsake",
      description: "Little moments we wish we could keep forever.",
      icon: "♡",
      color: "#E5DFC9",
      link: "#keepsake",
    },
    {
      number: "03",
      title: "The Someday",
      description: "Letters to the people we have yet to become.",
      icon: "✧",
      color: "#DCE2D9",
      link: "#someday",
    },
  ];

  return (
    <div className="website">

    
      <nav className="navbar">
        <a href="#" className="logo">
          the unsent<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#spaces">Explore</a>
          <a href="#echo">Echo Wall</a>
        </div>

        <a href="#spaces" className="nav-button">
          Leave a note ↗
        </a>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-decoration">✿ &nbsp; A DIGITAL TIME CAPSULE &nbsp; ✿</div>

        <h1>
          Some things are
          <br />
          easier to <em>leave here.</em>
        </h1>

        <p className="hero-description">
          Anonymous thoughts. Unforgettable moments.
          Messages to the person we're becoming.
        </p>

        <a href="#spaces" className="primary-button">
          Find your space <span>↗</span>
        </a>

        <p className="hero-footer">
          YOU DON'T HAVE TO SAY WHO YOU ARE TO BE HEARD.
        </p>
      </header>

      w
      <main>
        <section className="spaces" id="spaces">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THREE LITTLE CORNERS OF THE INTERNET</span>
              <h2>Where would you like to begin?</h2>
            </div>

            <span className="handwritten">Take your time ♡</span>
          </div>

          <div className="section-grid">
            {sections.map((section) => (
              <SectionCard
                key={section.number}
                {...section}
              />
            ))}
          </div>
        </section>

        {/* Echo preview */}
        <section className="echo-section" id="echo">
          <div className="echo-intro">
            <span className="eyebrow">A LITTLE HUMAN CONNECTION</span>
            <h2>Leave an <em>echo.</em></h2>
            <p>
              Sometimes we don't need advice.
              We just need to know someone understands.
            </p>
          </div>

          <div className="echo-note">
            <div className="note-label">
              <span>✉ A NOTE FROM A STRANGER</span>
              <span>ANONYMOUS</span>
            </div>

            <blockquote>
              "I hope one day I stop feeling like I'm running
              out of time to become the person I want to be."
            </blockquote>

            <div className="note-bottom">
              <span>Someone left these words here.</span>
              <span className="echo-heart">♡</span>
            </div>
          </div>
        </section>

        {/* Section destinations */}
        <section className="destination-section">
          <div id="unsaid" className="destination">
            <span>01 · THE UNSAID</span>
            <h2>What have you been holding in?</h2>
            <p>Some words deserve somewhere to go.</p>
          </div>

          <div id="keepsake" className="destination">
            <span>02 · THE KEEPSAKE</span>
            <h2>What do you never want to forget?</h2>
            <p>Little moments can leave the biggest marks.</p>
          </div>

          <div id="someday" className="destination">
            <span>03 · the someday</span>
            <h2>What would you tell your future self?</h2>
            <p>Leave a little reminder for the person you're becoming.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <a href="#" className="logo">the unsent<span>.</span></a>
        <p>You don't have to say who you are to be heard.</p>
        <span>MADE OF WORDS, MEMORIES & LITTLE PIECES OF US. ♡</span>
      </footer>

    </div>
  );
}

export default App
