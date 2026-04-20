import { useEffect, useState } from "react";
import "./App.css";
import { Github, Linkedin, Instagram, Mail, ArrowUpRight, X } from "lucide-react";

// 🔥 PROJECT DATA (ADD UNLIMITED PROJECTS HERE)
const projects = [
  {
    title: "Loop Cars",
    desc: "Skill-based endless racing where precision drifting, timing, and control define every lap.",
    year: "2025",
    img: "/images/LoopCars.jpg",
    link: "https://play.google.com/store/apps/details?id=com.Karsh.LoopCars"
  },
  {
    title: "Pen Fight",
    desc: "A fun 1v1 tabletop battle game bringing the classic pen-fight experience into simple 3D gameplay.",
    year: "2023",
    img: "/images/PenFight.jpg",
    link: "https://play.google.com/store/apps/details?id=com.GameGanesh.PenFight3D"
  },
  {
    title: "Boat Racers 3D",
    desc: "Realistic 3D boat racing with physics-driven controls and skill-based gameplay across immersive waterscapes.",
    year: "2024",
    img: "/images/Boat.jpg",
    link: "https://play.google.com/store/apps/details?id=com.Karsh.PlayWithFriends"
  },
  {
    title: "Gopi Mario",
    desc: "A Brand new Meme based game on our childhood love Mario.",
    year: "2026",
    img: "/images/GopiMario.jpg",
    link: "https://pushkarmishra0025.itch.io/gopimario2-0"
  }
];
// Unicorn iframe
const UnicornScene = () => {
  return (
    <iframe
      src="https://www.unicorn.studio/embed/x5Cig57owgyLw5v8cyTM"
      title="Unicorn Scene"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        position: "absolute",
        top: 0,
        left: 0
      }}
    />
  );
};

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

const Section = ({ id, title, kicker, children }) => (
  <section id={id} className="section">
    <div className="section-inner">
      <span className="kicker">{kicker}</span>
      <h2 className="section-title">{title}</h2>
      <div className="section-body">{children}</div>
    </div>
  </section>
);

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="portfolio">

      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav-solid" : ""}`}>
        <a href="#top" className="brand">
          <span className="brand-mark">PM</span>
          <span className="brand-name">Pushkar Mishra</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
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
      <main className="content">

        {/* ABOUT */}
        <Section id="about" kicker="01 / About" title="A little about me.">
  <p>
    I’m a developer who loves building things that people can actually play with —
    from fast-paced Unity games to small AI-powered tools.  
    <br /><br />
    Currently a CSE (Data Science) undergrad, I spend most of my time experimenting
    with gameplay systems, interactions, and ideas that start simple but get
    surprisingly deep.  
    <br /><br />
    I enjoy mixing logic with creativity — whether it’s designing a game loop,
    optimizing mobile performance, or training something smart enough to remove
    backgrounds from images.  
    <br /><br />
    Still learning, always building, and occasionally breaking things just to see
    how they work.
  </p>
</Section>

        
        <Section id="skills" kicker="03 / Skills" title="What I bring.">
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
      <h4>Game & Creative Dev</h4>
      <ul>
        <li>Unity (2D & 3D)</li>
        <li>Gameplay Systems & Game Loops</li>
        <li className="inline-skills">
          <span>Blender</span>
          <span>UI/UX Design</span>
        </li>
      </ul>
    </div>

    <div>
      <h4>Tools & AI</h4>
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

        {/* Games */}
        <Section id="work" kicker="03 / Developed Games" title="Side Quests">
          <div className="project-grid">

            {projects.map((p, i) => (
              <a
  key={i}
  href={p.link}
  target="_blank"
  rel="noopener noreferrer"
  className="project-card"
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
            <a href="#"><X size={18} /></a>
            <a href="#"><Github size={18} /></a>
            <a href="#"><Linkedin size={18} /></a>
            <a href="#"><Instagram size={18} /></a>
            <a href="mailto:pushkarmishra2525@gmail.com"><Mail size={18} /></a>
          </div>
        </Section>

        {/* FOOTER */}
        <footer className="footer">
          <span>© {new Date().getFullYear()} Pushkar Mishra</span>
          <span>Crafted with care ✦ and a bit of sky.</span>
        </footer>

      </main>
    </div>
  );
}

export default App;