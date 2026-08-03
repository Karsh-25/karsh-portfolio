/*
  portfolioData.js
  ----------------
  Single source of truth the chatbot pulls from. Reuses real data from
  App.js (projects) instead of duplicating it. Everything else that
  doesn't already live in a component as exported data is centralized
  here — fill in the TODOs with your real links.
*/

export const projects = [
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
  title: "Eyes Wide Open",
  desc: "A Wild West puzzle duel where observation is everything — read the hidden clue, then draw at the exact right moment.",
  year: "2026",
  img: process.env.PUBLIC_URL + "/images/EyesWideOpen.png",
  link: "https://pushkarmishra0025.itch.io/eyes-wide-open",
},
  {
    title: "Gopi Mario",
    desc: "A brand new meme-based game built on our childhood love Mario.",
    year: "2026",
    img: process.env.PUBLIC_URL + "/images/GopiMario.jpg",
    link: "https://pushkarmishra0025.itch.io/gopimario2-0",
  },
];

export const PROFILE = {
  name: "Pushkar Mishra",
  tagline: "Designer · Developer · Dream Architect",
  about:
    "I'm a developer who loves building things people can actually play with — from fast-paced Unity games to small AI-powered tools. Currently a CSE (Data Science) undergrad, experimenting with gameplay systems and ideas that start simple but get surprisingly deep.",
  email: "pushkarmishra2525@gmail.com",
};

export const SOCIALS = [
  // TODO: your App.js socials currently use href="#" placeholders —
  // drop the real URLs in here once you have them, and the chatbot's
  // socials/github/linkedin intents will use them automatically.
  { label: "GitHub", url: "#", icon: "github" },
  { label: "LinkedIn", url: "#", icon: "linkedin" },
  { label: "X", url: "#", icon: "x" },
  { label: "Instagram", url: "#", icon: "instagram" },
];

export const RESUME = {
  // TODO: drop your resume PDF in /public and point this at it, e.g.
  // process.env.PUBLIC_URL + "/PushkarMishra_Resume.pdf"
  url: process.env.PUBLIC_URL + "/resume.pdf",
  fileName: "Pushkar_Mishra_Resume.pdf",
};

export const SKILLS = {
  Programming: ["C#", "Python", "C++", "React", "HTML", "CSS", "SQL", "Web Scraping"],
  "Game & Creative Dev": ["Unity (2D & 3D)", "Gameplay Systems & Game Loops", "Blender", "UI/UX Design"],
  "Tools & AI": ["GitHub", "VS Code", "Framer", "Figma", "SEO", "RAG", "AI Agents"],
};

export const EXPERIENCE = [
  // TODO: add real entries — { role, org, period, desc }
];

export const EDUCATION = {
  degree: "B.Tech, CSE (Data Science)",
  status: "Undergraduate",
};

export const ACHIEVEMENTS = [
  // TODO: add real entries — plain strings or { title, desc }
];

export const ASSET_STORE = {
  // TODO: link once "Glass UI Pack" (mentioned in index.html) is live
  url: null,
  items: ["Glass UI Pack — Unity UI elements for the Built-in pipeline"],
};