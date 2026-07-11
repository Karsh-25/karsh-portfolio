/*
  responses.js
  ------------
  Takes the intent id returned by router.js and turns it into a response
  object the UI can render: { type, data, text }.

  "type" tells MessageRenderer.jsx which component to use. "text" is a
  short caption shown above/alongside the UI (kept brief on purpose —
  the philosophy is "show UI, not paragraphs").
*/

import {
  PROFILE,
  SOCIALS,
  RESUME,
  SKILLS,
  EXPERIENCE,
  EDUCATION,
  ACHIEVEMENTS,
  ASSET_STORE,
  projects,
} from "./portfolioData";
const BOT_ALONE_LINES = [
  "Alone? I've got a whole codebase keeping me company, plus whoever's reading this right now. Not bad.",
  "Never really alone — every tab you open is basically a visit. It's a low bar for socializing, but I'll take it.",
  "A little, ngl. Feel free to ask me something, it's basically my version of company.",
];
const BOT_RELATIONSHIP_LINES = [
  "Single and married to my code. It's a stable relationship, low maintenance.",
  "I'm committed — to answering your questions correctly, mostly.",
  "No girlfriend, no boyfriend, just an uptime requirement. Living my best life.",
];

const SELF_RELATIONSHIP_LINES = [
  "Nice! Relationship goals aside, still happy to help with the portfolio stuff whenever you're ready.",
  "Congrats, I guess? Anyway — projects, skills, or resume, your call.",
  "Love that for you. Now, want to see something else that's committed — like Pushkar's project list?",
];
const BOT_CRAZY_LINES = [
  "A little unhinged, sure — I did just get asked if I'm crazy by someone who typed 'alone' with no context two messages ago.",
  "Define crazy. I run on regex and vibes, so... possibly.",
  "Just enough to keep things interesting. Fully sane bots are boring anyway.",
];

const BOT_MAD_LINES = [
  "Not mad, just mildly judgmental. There's a difference.",
  "Can't get mad — I don't have the emotional bandwidth, only the sarcasm bandwidth.",
  "Nope, all good. Ask away, I don't hold grudges — I don't have the memory for it either.",
];
const FUNNY_LINES = [
  "Pushkar obviously... but I'm legally required to say I'm slightly biased 😌",
  "Because hiring bugs is generally frowned upon, so hiring the person who fixes them is the better option.",
  "Depends. Coding contest? Maybe. Hand-to-hand combat? Let's not test that.",
  "I don't drink coffee. Pushkar probably survives on determination... and the occasional caffeine.",
  "Occupational hazard. Spending too much time around developers does that.",
  "I run on JavaScript and mild sarcasm. Both are renewable resources.",
  "My hobbies include waiting for your next question and judging your typos.",
];
const ROAST_LINES = [
  "You showed up to a portfolio site to get roasted by the chatbot. Bold. I respect it, but no — I'm contractually nice here.",
  "I'd roast you, but you already came here asking a JavaScript file to insult you. That's punishment enough.",
  "Sorry, my roast settings are calibrated for bugs in the console, not visitors in the chat.",
  "I could roast you, but Pushkar coded me to be likeable so people actually hire him. Priorities.",
  "The real roast is that you scrolled this far into a portfolio site looking for one.",
  "I'm legally a customer-facing assistant. HR would have questions if I roasted you.",
  "Best I can do is mild judgment: you're the type to test chatbots for fun. Certified silly goose.",
];
const SELF_TIRED_LINES = [
  "Tired? Same energy as a build that's been compiling for 20 minutes. We've all been there.",
  "Rest up — even Unity needs to bake lighting sometimes, you're allowed a break too.",
  "Tired is just your brain asking for a git commit before you lose progress. Go sleep.",
];

const SELF_BORED_LINES = [
  "Bored? Perfect timing — go poke around the Work section, it's more fun than it sounds.",
  "Boredom is just an unfilled useState. Let me fix that — check out a project or two.",
  "Bored people built the internet. You're basically qualified now, go build something.",
];

const SELF_BROKE_LINES = [
  "Broke is temporary, a good portfolio isn't. Ask Pushkar for freelance work, might fix that.",
  "Relatable — every dev's wallet is basically a 404 page.",
  "Broke now, funded later. That's the startup timeline, roll with it.",
];

const SELF_STRESSED_LINES = [
  "Deep breath. Even the best code throws exceptions sometimes — you're allowed to too.",
  "Stress is just your CPU running at 100%. Close a few tabs, mentally and literally.",
  "Take five. Pushkar's projects took way more than five debugging sessions to ship — you'll get there too.",
];

const SELF_CONFUSED_LINES = [
  "Confused is just the loading state before clarity renders. Give it a sec.",
  "Happens to the best of us — even Stack Overflow answers contradict each other half the time.",
  "No shame in it — ask me something specific and I'll try to un-confuse you.",
];

const SELF_STUCK_LINES = [
  "Stuck happens to everyone — even Pushkar's code has commit messages that just say 'fix.'",
  "Try turning it off and on again. Works for routers, sometimes works for brains too.",
  "Stuck is temporary. Rubber duck it, or just ask me something else while you regroup.",
];

const SELF_SMART_LINES = [
  "Confident. I respect it. Prove it — ask me something that actually stumps me.",
  "Sure, we'll say smart. Bold claims deserve bold follow-up questions though.",
  "Noted for the record. Let's see if that holds up over the next few messages.",
];

const SELF_DUMB_LINES = [
  "Nah — you found a portfolio chatbot with an easter egg for self-deprecation. That's advanced trolling, actually.",
  "Doubt it. Dumb people don't usually stress-test random chat widgets for fun.",
  "I've seen dumber — trust me, I've read some of Pushkar's early commit history.",
];

const SELF_DEVELOPER_LINES = [
  "Respect, fellow builder of things that mostly work. What's your stack?",
  "Nice — then you already know 90% of dev life is just reading error messages.",
  "A dev in the wild! Check out the Skills section, might be some common ground.",
];

const SELF_STUDENT_LINES = [
  "Same boat as Pushkar then — he's CSE, Data Science, graduating 2027. Solidarity.",
  "Student life: half assignments, half Stack Overflow. Sound familiar?",
  "Respect the grind. Ask about his education if you want to compare notes.",
];

const SELF_EXCITED_LINES = [
  "Love the energy! Channel it — go check out the projects, there's stuff worth being hyped about.",
  "That's the spirit — matches the energy Pushkar has shipping a new build at 2am.",
  "Hyped is a good look on you. Let's put it to use — projects, skills, or resume?",
];
const SELF_OR_BOT_DUMB_LINES = [
  "I mean, I did just spend my entire existence answering portfolio questions for free, so let's not throw stones.",
  "Debatable. I did just parse your message correctly, that's a low bar but I cleared it.",
  "Harsh. I prefer 'aggressively literal' over 'dumb.'",
  "I've seen dumber — trust me, I've read some of Pushkar's early commit history.",
];
function buildResponse(id) {
  switch (id) {
    case "greeting":
      return {
        type: "text",
        text: `Hey! I'm ${PROFILE.name}'s portfolio assistant. Ask me about projects, skills, resume, or how to get in touch.`,
      };

    case "projects":
    case "bestProject":
      return {
        type: "projects",
        text:
          id === "bestProject"
            ? "Here's everything — Loop Cars is usually the standout."
            : "Here's what I've built:",
        data: projects,
      };
case "age":
  return { type: "text", text: "Pushkar is 21 years old." };

case "location":
  return { type: "text", text: "Pushkar is based in Noida, India." };

case "role":
  return {
    type: "text",
    text: "Pushkar is a Game Developer and Software Developer who enjoys building games, Unity assets, websites, and AI-powered applications.",
  };
case "funnyRoast":
  return {
    type: "text",
    text: ROAST_LINES[Math.floor(Math.random() * ROAST_LINES.length)],
  };

case "funnyAI":
  return {
    type: "text",
    text: "I'm code pretending to have a personality. Pushkar's the human — I just borrowed his sense of humor.",
  };

case "funnySmart":
  return {
    type: "text",
    text: "Smart enough to know I shouldn't answer that with false modesty. Ask me about Unity or skills, I'll actually impress you.",
  };

case "funnyBored":
  return {
    type: "text",
    text: "Never — every conversation's a new chance to plug Pushkar's projects. It's basically my love language.",
  };
  case "selfTired": return { type: "text", text: SELF_TIRED_LINES[Math.floor(Math.random() * SELF_TIRED_LINES.length)] };
case "selfBored": return { type: "text", text: SELF_BORED_LINES[Math.floor(Math.random() * SELF_BORED_LINES.length)] };
case "selfBroke": return { type: "text", text: SELF_BROKE_LINES[Math.floor(Math.random() * SELF_BROKE_LINES.length)] };
case "selfStressed": return { type: "text", text: SELF_STRESSED_LINES[Math.floor(Math.random() * SELF_STRESSED_LINES.length)] };
case "selfConfused": return { type: "text", text: SELF_CONFUSED_LINES[Math.floor(Math.random() * SELF_CONFUSED_LINES.length)] };
case "selfStuck": return { type: "text", text: SELF_STUCK_LINES[Math.floor(Math.random() * SELF_STUCK_LINES.length)] };
case "selfSmartClaim": return { type: "text", text: SELF_SMART_LINES[Math.floor(Math.random() * SELF_SMART_LINES.length)] };
case "selfDumbClaim": return { type: "text", text: SELF_DUMB_LINES[Math.floor(Math.random() * SELF_DUMB_LINES.length)] };
case "selfDeveloper": return { type: "text", text: SELF_DEVELOPER_LINES[Math.floor(Math.random() * SELF_DEVELOPER_LINES.length)] };
case "selfStudent": return { type: "text", text: SELF_STUDENT_LINES[Math.floor(Math.random() * SELF_STUDENT_LINES.length)] };
case "selfExcited": return { type: "text", text: SELF_EXCITED_LINES[Math.floor(Math.random() * SELF_EXCITED_LINES.length)] };
  case "isGood":
  return {
    type: "text",
    text: "Good enough that his projects speak for themselves rather than me having to hype him up 😌 Check out his work, or ask about his skills or experience.",
  };
  case "thanks":
  return { type: "text", text: "Anytime! 🙌 Let me know if you want to dig into anything else." };

case "bye":
  return { type: "text", text: "Catch you later 👋 — the contact section's always open if you change your mind." };
case "botRelationship":
  return { type: "text", text: BOT_RELATIONSHIP_LINES[Math.floor(Math.random() * BOT_RELATIONSHIP_LINES.length)] };

case "selfRelationship":
  return { type: "text", text: SELF_RELATIONSHIP_LINES[Math.floor(Math.random() * SELF_RELATIONSHIP_LINES.length)] };
case "help":
  return {
    type: "text",
    text: "You can ask me about projects, skills, resume, experience, education, or how to get in touch — or just poke around and see what sticks 😄",
  };

case "pricing":
  return {
    type: "text",
    text: "Rates depend on scope — best to reach out directly and Pushkar can give you a real number, not a chatbot guess.",
  };

case "isLegit":
  return {
    type: "text",
    text: "100% real — real projects, real games on the Play Store, real person behind the code. I'm just the front desk.",
  };

case "botIdentity":
  return {
    type: "text",
    text: "I'm Pushkar's portfolio assistant — a little bit of code with a personality loan. Ask me about his work!",
  };

case "smalltalkAck":
  return { type: "text", text: "Glad that landed 😄 Anything else you want to know?" };

case "elaborate":
  return {
    type: "text",
    text: "Sure — more about what specifically? Projects, skills, experience, or something else?",
  };
  case "funnyLooks":
  return { type: "text", text: "I only have his portfolio, not his face — but based on the confidence level in this code, I'm assuming yes." };

case "funnyDumb":
  return {
    type: "text",
    text: SELF_OR_BOT_DUMB_LINES[Math.floor(Math.random() * SELF_OR_BOT_DUMB_LINES.length)],
  };
case "funnyLazy":
  return { type: "text", text: "Lazy people don't ship 7 games and a portfolio chatbot that roasts visitors. He's busy, not lazy." };

case "funnyRich":
  return { type: "text", text: "Rich in bugs fixed and coffee not consumed. The bank account status is need-to-know 😌" };

case "funnyFamous":
  return { type: "text", text: "Famous in this chat window, at minimum. Working on world domination — one Unity build at a time." };

case "funnySingle":
  return { type: "text", text: "That's a question for him, not his portfolio bot. I don't do relationship status leaks, but you look cute." };

case "funnyAlive":
  return { type: "text", text: "Technically no, but I've got more personality than half the apps on your phone, so let's not overthink it." };

case "funnyTired":
  return { type: "text", text: "I don't sleep, I just idle. Pushkar, on the other hand, definitely should sleep more." };

case "funnyProve":
  return { type: "text", text: "Fair — go look at the Work section. Receipts don't lie, even if I occasionally exaggerate." };

case "funnyAnnoying":
  return { type: "text", text: "A little, on purpose. Personality's better than a boring FAQ page, right?" };
case "canBuild":
  return {
    type: "text",
    text: "Unity games, mobile apps, portfolio websites, AI tools, full-stack web apps, UI systems, Unity assets, APIs, and automation tools.",
  };

case "allGames":
  return {
    type: "text",
    text: "Loop Cars, Boat Racers 3D, Pen Fight 3D, Chopsticks 2-Player, Ski King, Gopi Mario 2.0, and Million Ways To Live — check the Work section above for the ones with links!",
  };

case "shouldHire":
  return {
    type: "text",
    text: "Absolutely! Pushkar's open to internships, freelance projects, and full-time roles — especially anything Unity, web dev, or AI-powered. 🚀",
  };
case "funny":
  return {
    type: "text",
    text: FUNNY_LINES[Math.floor(Math.random() * FUNNY_LINES.length)],
  };
case "private":
  return {
    type: "text",
    text: "That's private information, and I can't share it. If you'd like to get in touch with Pushkar, use the contact details on the site.",
  };

case "funnyCooler":
  return { type: "text", text: "Pushkar obviously... but I'm legally required to say I'm slightly biased 😌" };

case "funnyBatman":
  return { type: "text", text: "Depends. Coding contest? Maybe. Hand-to-hand combat? Let's not test that." };

case "funnyCoffee":
  return { type: "text", text: "I don't drink coffee. Pushkar probably survives on determination... and the occasional caffeine." };

case "funnySarcastic":
  return { type: "text", text: "Occupational hazard. Spending too much time around developers does that." };
case "botAlone":
  return { type: "text", text: BOT_ALONE_LINES[Math.floor(Math.random() * BOT_ALONE_LINES.length)] };

case "botCrazy":
  return { type: "text", text: BOT_CRAZY_LINES[Math.floor(Math.random() * BOT_CRAZY_LINES.length)] };

case "botMad":
  return { type: "text", text: BOT_MAD_LINES[Math.floor(Math.random() * BOT_MAD_LINES.length)] };
case "funnyDate":
  return { type: "text", text: "Bold opening move 😄. You'll have to ask Pushkar directly — I'm just the overly protective portfolio assistant." };

case "funnyLove":
  return { type: "text", text: "I'll pass along the compliment... assuming he doesn't get too embarrassed." };

case "funnyMeet":
  return { type: "text", text: "That's between you and him 😄. Use the contact section to reach out." };
    case "unity":
      return {
        type: "projects",
        text: "All of these are built in Unity:",
        data: projects,
      };

    case "assetStore":
      return {
        type: "text",
        text: ASSET_STORE.url
          ? `Check out my Unity Asset Store packages: ${ASSET_STORE.items.join(", ")}`
          : `Working on it — first package is "${ASSET_STORE.items[0]}", not published yet.`,
      };

    case "playStore":
      return {
        type: "projects",
        text: "Playable / downloadable builds:",
        data: projects,
      };

    case "skills":
      return {
        type: "skills",
        text: "Here's what I bring:",
        data: SKILLS,
      };

    case "resume":
      return {
        type: "resume",
        text: "Here's my resume:",
        data: RESUME,
      };

    case "experience":
      return {
        type: "experience",
        text: EXPERIENCE.length ? "My experience so far:" : "Mostly freelance + personal projects right now — details coming soon.",
        data: EXPERIENCE,
      };

    case "education":
      return {
        type: "text",
        text: `${EDUCATION.degree} (${EDUCATION.status}).`,
      };

    case "contact":
      return {
        type: "contact",
        text: "Let's talk — reach me here:",
        data: { email: PROFILE.email, socials: SOCIALS },
      };

    case "github":
      return {
        type: "buttons",
        text: "Here's my GitHub:",
        data: [SOCIALS.find((s) => s.icon === "github")].filter(Boolean),
      };

    case "linkedin":
      return {
        type: "buttons",
        text: "Connect on LinkedIn:",
        data: [SOCIALS.find((s) => s.icon === "linkedin")].filter(Boolean),
      };

    case "socials":
      return {
        type: "socials",
        text: "Find me here:",
        data: SOCIALS,
      };

    case "about":
      return {
        type: "text",
        text: PROFILE.about,
      };

    case "achievements":
      return {
        type: "text",
        text: ACHIEVEMENTS.length ? ACHIEVEMENTS.join(" · ") : "Still stacking those up — check back soon.",
      };

    case "currentWork":
      return {
        type: "text",
        text: "Right now: building UI systems in Unity for client work, and iterating on a Python-based NSE trading bot on the side.",
      };

    default:
      return null;
  }
}

export default buildResponse;
