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

const UnicornScene = () => {
  useEffect(() => {
    const canvas = document.getElementById("spider-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const glow = document.querySelector(".spider-glow");

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      glow.style.left = mouse.x - 85 + "px";
      glow.style.top = mouse.y - 85 + "px";
    });

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStrands();
    });

    const strands = [];
    const spiders = [];

    function createCluster(cx, cy, count, spread) {
      for (let i = 0; i < count; i++) {
        const angle1 = Math.random() * Math.PI * 2;
        const angle2 = Math.random() * Math.PI * 2;

        const r1 = Math.random() * spread;
        const r2 = Math.random() * spread;

        strands.push({
          x1: cx + Math.cos(angle1) * r1,
          y1: cy + Math.sin(angle1) * r1,

          x2: cx + Math.cos(angle2) * r2,
          y2: cy + Math.sin(angle2) * r2,

          sag: 20 + Math.random() * 60,
          thickness: 0.2 + Math.random() * 0.4,
          sway: Math.random() * 10,
        });
      }
    }

    function generateStrands() {
      strands.length = 0;

      createCluster(120, 120, 80, 280);
      createCluster(window.innerWidth - 120, 160, 72, 320);

      createCluster(180, window.innerHeight - 150, 66, 300);

      createCluster(
        window.innerWidth - 160,
        window.innerHeight - 140,
        55,
        280
      );

      createCluster(window.innerWidth / 2, 90, 35, 220);

      createCluster(
        window.innerWidth / 2 - 260,
        window.innerHeight / 2,
        30,
        180
      );

      createCluster(
        window.innerWidth / 2 + 260,
        window.innerHeight / 2 + 120,
        28,
        200
      );
    }

    class Spider {
      constructor() {
        this.strand =
          strands[Math.floor(Math.random() * strands.length)];

        this.progress = Math.random();

        this.speed =
          0.0008 + Math.random() * 0.0012;

        this.scale =
          0.38 + Math.random() * 0.2;

        this.legSwing =
          Math.random() * Math.PI * 2;
      }

      update() {
        this.progress += this.speed;

        this.legSwing += 0.08;

        if (this.progress >= 1) {
          this.progress = 0;

          this.strand =
            strands[Math.floor(Math.random() * strands.length)];
        }
      }

      draw() {
        const s = this.strand;

        const t = this.progress;

        const midX = (s.x1 + s.x2) / 2;
        const midY = (s.y1 + s.y2) / 2 + s.sag;

        const x =
          (1 - t) * (1 - t) * s.x1 +
          2 * (1 - t) * t * midX +
          t * t * s.x2;

        const y =
          (1 - t) * (1 - t) * s.y1 +
          2 * (1 - t) * t * midY +
          t * t * s.y2;

        const tangentX =
          2 * (1 - t) * (midX - s.x1) +
          2 * t * (s.x2 - midX);

        const tangentY =
          2 * (1 - t) * (midY - s.y1) +
          2 * t * (s.y2 - midY);

        const angle =
          Math.atan2(tangentY, tangentX);

        const distToMouse =
          Math.hypot(x - mouse.x, y - mouse.y);

        if (distToMouse > 160) return;

        const vis =
          (160 - distToMouse) / 160;

        ctx.save();

        ctx.translate(x, y);

        ctx.rotate(angle + Math.PI / 2);

        ctx.scale(this.scale, this.scale);

        ctx.shadowBlur = 8;

        ctx.shadowColor =
          `rgba(255,0,0,${vis * 0.4})`;

        const bodyGradient =
          ctx.createRadialGradient(
            0,
            -2,
            1,
            0,
            0,
            10
          );

        bodyGradient.addColorStop(
          0,
          `rgba(55,55,55,${vis})`
        );

        bodyGradient.addColorStop(
          0.4,
          `rgba(20,20,20,${vis})`
        );

        bodyGradient.addColorStop(
          1,
          `rgba(0,0,0,${vis})`
        );

        ctx.fillStyle = bodyGradient;

        ctx.beginPath();
        ctx.ellipse(0, 5, 5, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(0, -4, 3.5, 4.5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle =
          `rgba(255,40,40,${vis})`;

        ctx.beginPath();

        ctx.arc(-1.3, -5.5, 0.7, 0, Math.PI * 2);

        ctx.arc(1.3, -5.5, 0.7, 0, Math.PI * 2);

        ctx.fill();

        ctx.strokeStyle =
          `rgba(15,15,15,${vis})`;

        ctx.lineWidth = 0.9;

        for (let side = -1; side <= 1; side += 2) {
          for (let i = 0; i < 4; i++) {
            const offsetY = -4 + i * 4;

            const swing =
              Math.sin(this.legSwing + i) * 2;

            ctx.beginPath();

            ctx.moveTo(0, offsetY);

            ctx.quadraticCurveTo(
              6 * side,
              offsetY + swing,
              11 * side,
              offsetY + 5
            );

            ctx.stroke();
          }
        }

        ctx.restore();
      }
    }

    generateStrands();

    for (let i = 0; i < 12; i++) {
      spiders.push(new Spider());
    }

    function draw() {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const time = Date.now() * 0.001;

      strands.forEach((s, index) => {
        const midX = (s.x1 + s.x2) / 2;
        const midY = (s.y1 + s.y2) / 2;

        const length =
          Math.hypot(s.x2 - s.x1, s.y2 - s.y1);

        if (length > 350) return;

        const distToMouse =
          Math.hypot(midX - mouse.x, midY - mouse.y);

        if (distToMouse > 300) return;

        const glow =
          (300 - distToMouse) / 300;

        const waveX =
          Math.sin(time * 2 + index) * s.sway;

        const waveY =
          Math.cos(time * 2 + index) * 6;

        const curveX =
          midX + waveX;

        const curveY =
          midY + s.sag + waveY;

        ctx.beginPath();

        ctx.moveTo(s.x1, s.y1);

        ctx.quadraticCurveTo(
          curveX,
          curveY,
          s.x2,
          s.y2
        );

        ctx.strokeStyle =
          `rgba(255,255,255,${glow * 0.18})`;

        ctx.lineWidth = s.thickness;

        

        ctx.shadowColor =
          `rgba(255,255,255,${glow * 0.18})`;

        ctx.stroke();

        ctx.shadowBlur = 0;
      });

      spiders.forEach((spider) => {
        spider.update();
        spider.draw();
      });

      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "black",
        overflow: "hidden",
      }}
    >
      <div
        className="spider-glow"
        style={{
          position: "absolute",
          width: "170px",
          height: "170px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,0,0,0.32) 0%, rgba(255,0,0,0.12) 35%, transparent 75%)",
          filter: "blur(30px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle, transparent 35%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
          zIndex: 4,
        }}
      />

      <canvas
        id="spider-canvas"
        style={{
          position: "absolute",
          inset: 0,
        }}
      />
    </div>
  );
};

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
            Between Logic and Imagination, <br />
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
