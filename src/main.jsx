import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

const Icon = ({ name, size = 18 }) => {
  const paths = {
    check: <path d="m4 12 5 5L20 6" />,
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    spark: (
      <path d="m12 3 1.85 6.15L20 11l-6.15 1.85L12 19l-1.85-6.15L4 11l6.15-1.85L12 3Z" />
    ),
    layers: (
      <>
        <rect x="4" y="5" width="16" height="12" rx="2" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </>
    ),
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />,
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
};

function Navbar({ onGetStarted }) {
  return (
    <header className="nav-wrap">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="#top">
          <span className="brand-mark">
            <Icon name="check" size={15} />
          </span>
          FocusList
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">About us</a>
        </div>
        <button className="nav-cta" onClick={onGetStarted}>
          Get started <Icon name="arrow" size={15} />
        </button>
        <button className="menu-button" aria-label="Open menu">
          <Icon name="menu" />
        </button>
      </nav>
    </header>
  );
}

const tasks = [
  ["Morning workout", "Personal", "07:30", "mint"],
  ["Complete project report", "Work", "10:00", "orange"],
  ["Team meeting", "Work", "11:30", "purple"],
  ["Read documentation", "Learning", "15:00", "blue"],
];

function TaskList({ compact = false }) {
  return (
    <div className={`task-list ${compact ? "compact" : ""}`}>
      {tasks.map(([task, label, time, color], index) => (
        <div className="task-row" key={task}>
          <span className={`task-check ${index === 0 ? "done" : ""}`}>
            {index === 0 && <Icon name="check" size={10} />}
          </span>
          <div className="task-copy">
            <strong>{task}</strong>
            <span>
              <i className={`tag-dot ${color}`} />
              {label}
            </span>
          </div>
          {!compact && <time>{time}</time>}
        </div>
      ))}
    </div>
  );
}

function ProductPreview({ large = false }) {
  return (
    <div className={`product-preview ${large ? "preview-large" : ""}`}>
      <div className="app-window">
        <aside className="app-sidebar">
          <a className="mini-brand">
            <span className="brand-mark">
              <Icon name="check" size={10} />
            </span>
            FocusList
          </a>
          <div className="side-item active">
            <span>▣</span> Today <b>4</b>
          </div>
          <div className="side-item">
            <span>□</span> Upcoming
          </div>
          <div className="side-item">
            <span>☆</span> Important
          </div>
          <p>MY LISTS</p>
          <div className="side-item">
            <i className="list-dot mint" /> Personal
          </div>
          <div className="side-item">
            <i className="list-dot purple" /> Work
          </div>
          <div className="side-item">
            <i className="list-dot orange" /> Learning
          </div>
          <button className="new-list">
            <Icon name="plus" size={12} /> New list
          </button>
          <div className="profile">
            <span>PM</span>
            <small>
              Pushkar Mahadik
              <br />
              <b>Free plan</b>
            </small>
          </div>
        </aside>
        <main className="app-main">
          <div className="app-top">
            <div>
              <span className="eyebrow">TUESDAY, MAY 14</span>
              <h3>
                Good morning, Pushkar <span>✦</span>
              </h3>
            </div>
            <div className="avatar">PM</div>
          </div>
          <div className="progress-line">
            <div>
              <span>Today's progress</span>
              <strong>1 of 4 completed</strong>
            </div>
            <div className="track">
              <i />
            </div>
          </div>
          <div className="today-title">
            <h4>
              Today's tasks <em>4</em>
            </h4>
            <button>
              <Icon name="plus" size={13} /> Add task
            </button>
          </div>
          <TaskList />
        </main>
      </div>
      {!large && (
        <div className="floating-phone">
          <div className="phone-notch" />
          <div className="phone-top">
            9:41 <span>•••</span>
          </div>
          <b>Today</b>
          <small>Tuesday, May 14</small>
          <div className="phone-progress">
            <i />
          </div>
          <TaskList compact />
          <button className="phone-add">
            <Icon name="plus" size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

function Hero({ onGetStarted }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="kicker">
            <span>
              <Icon name="spark" size={12} />
            </span>{" "}
            YOUR DAY, YOUR FLOW
          </p>
          <h1>
            Organize your life.
            <br />
            <i>Simplify</i> your day.
          </h1>
          <p className="hero-description">
            A calmer way to plan your tasks, focus on what matters, and make
            every day feel a little more effortless.
          </p>
          <div className="hero-actions">
            <button className="button primary" onClick={onGetStarted}>
              Start organizing <Icon name="arrow" size={16} />
            </button>
            <a className="text-link" href="#how-it-works">
              See how it works <span>↓</span>
            </a>
          </div>
          <div className="proof">
            <div className="avatars">
              <b>AM</b>
              <b>DS</b>
              <b>SC</b>
              <b>+1k</b>
            </div>
            <span>
              Loved by people who get things done
              <br />
              <strong>
                ★★★★⯪ <i>4.5/5</i>
              </strong>
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orb" />
          <div className="visual-label top-label">
            <span className="tiny-check">
              <Icon name="check" size={9} />
            </span>{" "}
            Focus on today
          </div>
          <ProductPreview />
          <div className="visual-label bottom-label">
            <span>✦</span>
            <div>
              <b>Keep your flow</b>
              <small>One task at a time</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  [
    "spark",
    "Smart task management",
    "Turn a busy day into a clear, focused plan.",
  ],
  [
    "layers",
    "Multiple lists",
    "Keep work, life, and ideas beautifully separate.",
  ],
  ["bolt", "Quick add", "Capture a thought before it slips away."],
  [
    "calendar",
    "Daily planning",
    "Start every morning with a calm, clear view.",
  ],
  ["chart", "Progress tracking", "See the small wins that move you forward."],
  [
    "check",
    "Simple by design",
    "Everything you need, with nothing in your way.",
  ],
];
function FeatureCard({ item }) {
  const [icon, title, description] = item;
  return (
    <article className="feature-card">
      <span className="feature-icon">
        <Icon name={icon} size={18} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="#start" aria-label={`Learn more about ${title}`}>
        <Icon name="arrow" size={15} />
      </a>
    </article>
  );
}

function FeaturesSection({ onGetStarted }) {
  return (
    <section className="features-section" id="features">
      <div className="section-intro">
        <p className="kicker">
          <span>
            <Icon name="spark" size={12} />
          </span>{" "}
          DESIGNED FOR CLARITY
        </p>
        <h2>
          Everything you need to
          <br />
          <i>get in your flow.</i>
        </h2>
        <p>
          Built around the small rituals that make a big difference—so you can
          spend less time managing work and more time making progress.
        </p>
      </div>
      <div className="dashboard-area" id="how-it-works">
        <div className="dashboard-glow" />
        <ProductPreview large />
        <div className="metric-card">
          <span className="metric-icon">
            <Icon name="chart" size={15} />
          </span>
          <p>THIS WEEK</p>
          <b>
            82<small>%</small>
          </b>
          <div className="bars">
            <i />
            <i />
            <i />
            <i />
            <i className="high" />
            <i className="high" />
            <i className="high" />
          </div>
          <em>↑ 12% from last week</em>
        </div>
      </div>
      <div className="feature-grid">
        {features.map((feature) => (
          <FeatureCard item={feature} key={feature[1]} />
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="about">
      <a className="brand" href="#top">
        <span className="brand-mark">
          <Icon name="check" size={15} />
        </span>
        FocusList
      </a>
      <p>Make room for what matters.</p>
      <span>© 2025 FocusList. Made for better days.</span>
    </footer>
  );
}

function LandingPage({ onGetStarted }) {
  return (
    <>
      <Navbar onGetStarted={onGetStarted} />
      <main>
        <Hero onGetStarted={onGetStarted} />
        <FeaturesSection onGetStarted={onGetStarted} />
      </main>
      <Footer />
    </>
  );
}

export { LandingPage };

createRoot(document.getElementById("root")).render(<App />);
