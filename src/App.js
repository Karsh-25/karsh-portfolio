import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ArrowUpRight,
  X,
  Sun,
  Moon,
} from "lucide-react";
import Background3D from "./components/Background3D";
import Reveal from "./components/Reveal";

/* ===== PROJECT DATA ===== */
const projects = [
  {
    title: "Loop Cars",
    desc: "Skill-based endless racing where precision drifting, timing, and control define every lap.",
    year: "2025",
    img: process.env.PUBLIC_URL + "/images/LoopCars.jpg",
    link: "https://play.google.com/store/apps/details?id=com.Karsh.LoopCars",
  },
  {
    title: "Pen Fight",
    desc: "A fun 1v1 tabletop battle game bringing the classic pen-fight experience into simple 3D gameplay.",
    year: "2023",
    img: process.env.PUBLIC_URL + "/images/PenFight.jpg",
    link: "https://play.google.com/store/apps/details?id=com.GameGanesh.PenFight3D",
  },
  {
    title: "Boat Racers 3D",
    desc: "Realistic 3D boat racing with physics-driven controls and skill-based gameplay across immersive waterscapes.",
    year: "2024",
    img: process.env.PUBLIC_URL + "/images/Boat.jpg",
    link: "https://play.google.com/store/apps/details?id=com.Karsh.PlayWithFriends",
  },
  {
    title: "Gopi Mario",
    desc: "A brand new meme-based game built on our childhood love Mario.",
    year: "2026",
    img: process.env.PUBLIC_URL + "/images/GopiMario.jpg",
    link: "https://pushkarmishra0025.itch.io/gopimario2-0",
  },
];

/* ===== HERO (UNCHANGED) ===== */
const UnicornScene = () => (
  <iframe
    src="https://www.unicorn.studio/embed/x5Cig57owgyLw5v8cyTM"
    title="Unicorn Scene"
    style={{
      width: "100%",
      height: "100%",
      border: "none",
      position: "absolute",
      top: 0,
      left: 0,
    }}
  />
);

/* ===== CLOUDS ===== */
const Clouds = () => {
  const clouds = Array.from({ length: 9 });
  return (
    <div className="clouds-layer">
      {clouds.map((_, i) => (
        <div key={i} className={`cloud cloud-${i + 1}`}>
          <div className="puff p1" />
          <div className="puff p2" />
          <div className="puff p3" />
          <div className="puff p4" />
          <div className="puff p5" />
        </div>
      ))}
    </div>
  );
};

/* ===== SECTION WRAPPER ===== */
const Section = ({ id, title, kicker, children }) => (
  <section id={id} className="section">
    <div className="section-inner">
      <Reveal>
        <span className="kicker">{kicker}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="section-title">{title}</h2>
      </Reveal>
      <Reveal delay={0.12}>
        <div className="section-body">{children}</div>
      </Reveal>
    </div>
  </section>
);

function App() {
  const [scrolled, setScrolled] = useState(false);

  // Persist theme preference across reloads
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = window.localStorage.getItem("pm-theme");
    if (saved === "light") return false;
    if (saved === "dark") return true;
    return true; // default: dark Spider-Verse theme
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("pm-theme", darkMode ? "dark" : "light");
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className={`portfolio ${darkMode ? "dark" : "light"}`}>
      {/* Fixed 3D background — active in BOTH modes */}
      <Background3D darkMode={darkMode} />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav-solid" : ""}`}>
        <a className="brand" href="#top" data-testid="nav-brand">
          <span className="brand-mark">PM</span>
          <span className="brand-name">Pushkar Mishra</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            data-testid="theme-toggle-button"
          >
            <span className="theme-toggle-track">
              <span className="theme-toggle-thumb">
                {darkMode ? <Moon size={12} /> : <Sun size={12} />}
              </span>
            </span>
          </button>

          <a href="#contact" className="nav-cta">
            Let's talk <ArrowUpRight size={14} />
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="hero">
        <div className="unicorn-wrap">
          <UnicornScene />
        </div>

        <div className="hero-overlay">
          <h1 className="hero-title glass-text">Pushkar Mishra</h1>
          <p className="hero-sub">Designer · Developer · Dream Architect</p>
        </div>

        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </header>

      {/* SKY */}
      <div className="sky">
        <div className="sun" />
        <Clouds />

        <div className="sky-copy">
          <p className="sky-kicker">— below the clouds —</p>
          <h2 className="sky-title">
            Between logic and imagination, <br />
            Beyond all Right Doing and Wrong.
          </h2>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className={`content ${darkMode ? "dark-theme" : "light-theme"}`}>
        {/* ABOUT */}
        <Section id="about" kicker="01 / About" title="A little about me.">
          <p>
            I'm a developer who loves building things that people can actually
            play with — from fast-paced Unity games to small AI-powered tools.
            <br />
            <br />
            Currently a CSE (Data Science) undergrad, I experiment with
            gameplay systems, interactions, and ideas that start simple but get
            surprisingly deep.
            <br />
            <br />
            Still learning, always building, and occasionally breaking things
            just to see how they work.
          </p>
        </Section>

        {/* SKILLS */}
        <Section id="skills" kicker="02 / Skills" title="What I bring.">
          <div className="skill-cols">
            <div>
              <h4>Programming</h4>
              <ul>
                <li className="inline-skills">
                  <span>C#</span>
                  <span>Python</span>
                  <span>C++</span>
                </li>
                <li className="inline-skills">
                  <span>React</span>
                  <span>HTML</span>
                  <span>CSS</span>
                </li>
                <li className="inline-skills">
                  <span>SQL</span>
                  <span>Web Scraping</span>
                </li>
              </ul>
            </div>

            <div>
              <h4>Game &amp; Creative Dev</h4>
              <ul>
                <li>Unity (2D &amp; 3D)</li>
                <li>Gameplay Systems &amp; Game Loops</li>
                <li className="inline-skills">
                  <span>Blender</span>
                  <span>UI/UX Design</span>
                </li>
              </ul>
            </div>

            <div>
              <h4>Tools &amp; AI</h4>
              <ul>
                <li className="inline-skills">
                  <span>GitHub</span>
                  <span>VS Code</span>
                  <span>Framer</span>
                </li>
                <li className="inline-skills">
                  <span>Figma</span>
                  <span>SEO</span>
                </li>
                <li className="inline-skills">
                  <span>RAG</span>
                  <span>AI Agents</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="work" kicker="03 / Developed Games" title="Side Quests">
          <div className="project-grid">
            {projects.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card"
                  data-testid={`project-card-${i}`}
                >
                  <div className="project-thumb">
                    <img src={p.img} alt={p.title} />
                  </div>

                  <div className="project-meta">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <span>{p.year}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" kicker="04 / Contact" title="Say hello.">
          <p className="contact-blurb">
            Got an idea, a role, or just a good story? I'd love to hear it.
          </p>

          <a className="big-mail" href="mailto:pushkarmishra2525@gmail.com">
            pushkarmishra2525@gmail.com <ArrowUpRight size={28} />
          </a>

          <div className="socials">
            <a href="#" aria-label="X">
              <X size={18} />
            </a>
            <a href="#" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="mailto:pushkarmishra2525@gmail.com" aria-label="Mail">
              <Mail size={18} />
            </a>
          </div>
        </Section>

        {/* FOOTER */}
        <footer className="footer">
          <span>© {new Date().getFullYear()} Pushkar Mishra</span>
          <span>Crafted with care — web-slung across the multiverse.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
