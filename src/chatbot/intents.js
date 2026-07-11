/*
  intents.js
  ----------
  Every intent the local router understands. Each intent has:

    id        - unique key, also used as the MessageRenderer "type"
    words     - single-word synonyms (matched against individual tokens)
    phrases   - multi-word synonyms (matched as substrings of the raw
                message — these are weighted higher since a phrase match
                is a much stronger signal than one loose word)
    action    - optional { scrollTo } for the "navigate the page" behavior
    minScore  - override the default confidence threshold for this intent
                (useful for short/ambiguous words like "cv")

  This is intentionally just data. router.js does the scoring, so adding
  a new intent later is a one-object addition here — nothing else to touch.
*/

export const INTENTS = [
  {
    id: "projects",
    words: ["projects", "project", "games", "game", "portfolio", "made", "built", "app", "apps", "stuff", "quests"],
    phrases: [
      "side quests",
      "things you built",
      "things you made",
      "what have you built",
      "what have you made",
      "show me your projects",
      "your work",
      "game dev",
    ],
    action: { scrollTo: "#work" },
  },
  {
  id: "age",
  words: ["age", "old"],
  phrases: ["how old is pushkar", "how old are you", "pushkar's age"],
},
{
  id: "location",
  words: ["location", "noida", "based"],
  phrases: ["where is pushkar from", "where are you based", "where do you live", "where is pushkar based"],
},
{
  id: "role",
  words: ["role", "job", "profession"],
  phrases: ["what does pushkar do", "what do you do", "what is pushkar's job"],
},
{
  id: "canBuild",
  words: ["build", "create", "make"],
  phrases: ["what can pushkar build", "what can you build", "what do you build"],
},
{
  id: "allGames",
  words: ["chopsticks", "skiking"],
  phrases: ["what games has pushkar built", "list your games", "all your games", "games you made"],
},
{
  id: "shouldHire",
  words: [],
  phrases: ["should i hire pushkar", "why hire pushkar", "why should i hire you"],
  minScore: 2,
},
{
  id: "private",
  words: ["address", "password", "passwords", "bank"],
  phrases: [
    "phone number", "bank details", "relationship status", "college id",
    "personal documents", "current location", "your family", "his family",
  ],
  minScore: 1,
},
{
  id: "funnyCooler",
  words: ["cooler"],
  phrases: ["who is cooler", "who's cooler"],
},
{
  id: "funnyBatman",
  words: ["batman"],
  phrases: ["beat batman", "fight batman"],
},
{
  id: "funnyRoast",
  words: ["roast", "insult", "burn"],
  phrases: [
    "roast me", "roast yourself", "roast pushkar",
    "insult me", "give me a burn", "say something mean", "be mean to me",
  ],
},
{
  id: "selfTired",
  words: ["tired", "sleepy", "exhausted"],
  phrases: ["i'm tired", "im tired", "so tired", "i'm exhausted"],
},
{
  id: "selfBored",
  words: ["bored"],
  phrases: ["i'm bored", "im bored", "so bored"],
},
{
  id: "selfBroke",
  words: ["broke", "poor"],
  phrases: ["i'm broke", "im broke", "so broke"],
},
{
  id: "selfStressed",
  words: ["stressed", "anxious", "overwhelmed"],
  phrases: ["i'm stressed", "im stressed", "so stressed", "i'm overwhelmed"],
},
{
  id: "selfConfused",
  words: ["confused", "lost"],
  phrases: ["i'm confused", "im confused", "i'm lost"],
},
{
  id: "selfStuck",
  words: ["stuck"],
  phrases: ["i'm stuck", "im stuck", "stuck on something"],
},
{
  id: "selfSmartClaim",
  words: [],
  phrases: ["i'm smart", "im smart", "i'm a genius", "i'm intelligent"],
},
{
  id: "selfDumbClaim",
  words: [],
  phrases: ["i'm dumb", "im dumb", "i'm stupid", "i'm an idiot"],
},
{
  id: "selfDeveloper",
  words: ["developer", "programmer", "coder"],
  phrases: ["i'm a developer", "im a developer", "i also code", "i'm a programmer"],
},
{
  id: "botAlone",
  words: ["alone", "lonely"],
  phrases: ["are you alone", "are you lonely", "do you get lonely"],
},
{
  id: "botCrazy",
  words: ["crazy", "insane"],
  phrases: ["are you crazy", "are you insane"],
},
{
  id: "botMad",
  words: ["mad", "angry"],
  phrases: ["are you mad", "are you angry"],
},
{
  id: "selfStudent",
  words: [],
  phrases: ["i'm a student", "im a student", "i'm also studying"],
},
{
  id: "selfExcited",
  words: ["excited", "hyped"],
  phrases: ["i'm excited", "im excited", "so hyped", "i'm hyped"],
},
{
  id: "funnyCoffee",
  words: ["coffee","chai","tea"],
  phrases: ["do you like coffee", "you drink coffee","chai piyoge","drink tea"],
},
{
  id: "funnySarcastic",
  words: ["sarcastic", "sarcasm"],
  phrases: ["why are you so sarcastic", "why so sarcastic"],
},
{
  id: "botRelationship",
  words: ["girlfriend", "boyfriend", "single", "dating"],
  phrases: ["does he have a girlfriend", "do you have a boyfriend", "are you single", "are you dating anyone"],
},
{
  id: "selfRelationship",
  words: [],
  phrases: [
    "i have a girlfriend", "i have a boyfriend",
    "i'm single", "im single", "i'm dating", "im dating",
    "i'm taken", "im taken",
  ],
},
{
  id: "funnyLove",
  words: ["love","cute","sweet","handsome","hot"],
  phrases: ["i love pushkar", "love pushkar","cute","sweet","he is hot","he is handsome","is he cute?","is he smart?"],
},
{
  id: "funnySingle",
  words: [], // no longer owns these words alone
  phrases: ["is pushkar single", "does pushkar have a girlfriend", "does pushkar have a boyfriend"],
},
{
  id: "funny",
  words: ["funny", "joke", "jokes", "laugh"],
  phrases: ["tell me something funny", "say something funny", "make me laugh", "tell a joke"],
},
  {
    id: "bestProject",
    words: ["best", "favorite", "favourite", "proudest"],
    phrases: ["best project", "favorite project", "proudest work", "top project"],
    minScore: 2, // "best" alone is too generic — require a real phrase hit
  },
  {
    id: "unity",
    words: ["unity", "gameplay"],
    phrases: ["unity assets", "unity workflow", "unity dev", "game engine"],
  },
  {
    id: "assetStore",
    words: [],
    phrases: ["asset store", "unity asset store", "published assets", "unity package"],
  },
  {
    id: "playStore",
    words: [],
    phrases: ["play store", "google play", "download the game", "android app"],
  },
 {
  id: "skills",
  words: ["skills", "skillset", "abilities", "stack", "languages"],
  phrases: [
    "tech stack", "what do you know", "what can you do", "technologies you use",
    "does he know", "is he good with", "does he use", // ← add these three
  ],
  action: { scrollTo: "#skills" },
},

  {
    id: "resume",
    words: ["resume", "cv", "biodata"],
    phrases: ["download cv", "download resume", "curriculum vitae", "your resume", "send resume", "get resume"],
  },
  {
    id: "experience",
    words: ["experience", "background", "history", "worked"],
    phrases: ["work experience", "years of experience", "where have you worked"],
  },
  {
    id: "education",
    words: ["education", "degree", "college", "university", "studying", "student"],
    phrases: ["where do you study", "what are you studying"],
  },
  {
    id: "contact",
    words: ["hire", "contact", "email", "reach", "freelance", "available", "collab", "collaborate"],
    phrases: [
      "work together",
      "get in touch",
      "reach out",
      "hire you",
      "let's talk",
      "lets talk",
      "how do i contact",
      "are you available",
      "for hire",
    ],
    action: { scrollTo: "#contact" },
  },
  {
  id: "funnyLooks",
  words: ["handsome", "hot", "attractive"],
  phrases: ["good looking", "is pushkar hot", "is pushkar attractive"],
},
{
  id: "funnyDumb",
  words: ["dumb", "stupid", "idiot"],
  phrases: ["are you dumb", "are you stupid"],
},
{
  id: "funnyLazy",
  words: ["lazy"],
  phrases: ["are you lazy", "is pushkar lazy"],
},
{
  id: "funnyRich",
  words: ["rich", "salary", "money"],
  phrases: ["are you rich", "is pushkar rich", "how much does he make"],
},
{
  id: "funnyFamous",
  words: ["famous", "celebrity"],
  phrases: ["are you famous", "is pushkar famous"],
},
{
  id: "funnySingle",
  words: ["single", "girlfriend", "boyfriend"],
  phrases: ["is pushkar single", "does pushkar have a girlfriend"],
},
{
  id: "funnyAlive",
  words: ["alive", "conscious", "sentient"],
  phrases: ["are you alive", "are you sentient", "are you conscious"],
},
{
  id: "funnyTired",
  words: ["tired", "sleep", "sleepy"],
  phrases: ["do you sleep", "are you tired", "do you get tired"],
},
{
  id: "funnyProve",
  words: [],
  phrases: ["prove it", "prove that", "citation needed"],
},
{
  id: "funnyAnnoying",
  words: ["annoying"],
  phrases: ["are you annoying", "is this annoying"],
},
  {
    id: "github",
    words: ["github", "repo", "repos", "repository", "code"],
    phrases: ["source code", "your github"],
  },
  {
    id: "linkedin",
    words: ["linkedin"],
    phrases: [],
  },
  {
    id: "socials",
    words: ["socials", "social", "instagram", "twitter"],
    phrases: ["social media", "follow you"],
  },
  {
    id: "about",
    words: ["about", "who", "yourself", "bio"],
    phrases: ["about you", "who are you", "tell me about you", "who is pushkar"],
    action: { scrollTo: "#about" },
  },
  {
    id: "achievements",
    words: ["achievements", "awards", "wins", "accomplishments"],
    phrases: ["what have you achieved", "notable achievements"],
  },
  {
  id: "funnyMeet",
  words: ["meet", "meetup"],
  phrases: ["can i meet pushkar", "meet pushkar", "meet you"],
},

{
  id: "funnyAI",
  words: ["robot", "ai", "human"],
  phrases: ["are you real", "are you human", "are you a bot", "are you ai"],
},
{
  id: "funnySmart",
  words: [],
  phrases: ["are you smart", "how smart are you"],
},
{
  id: "isGood",
  words: [],
  phrases: ["is he good", "is pushkar good", "is he any good", "how good is pushkar", "is he skilled"],
  minScore: 2, // "good" alone is too generic to trust as a signal
},
{
  id: "thanks",
  words: ["thanks", "thank", "thx", "ty"],
  phrases: ["thank you", "thanks a lot", "appreciate it"],
},
{
  id: "bye",
  words: ["bye", "goodbye", "cya", "farewell"],
  phrases: ["see you", "talk later", "gotta go", "have to go"],
},
{
  id: "help",
  words: ["help", "menu", "options", "commands"],
  phrases: ["what can i ask", "what can i ask you", "show me options", "i don't know what to ask", "not sure what to ask"],
},
{
  id: "pricing",
  words: ["price", "pricing", "rate", "rates", "cost", "charge", "charges", "fee", "fees", "expensive", "cheap"],
  phrases: ["how much does he charge", "what are his rates", "how much would it cost", "is he expensive"],
},
{
  id: "isLegit",
  words: ["legit", "scam"],
  phrases: ["is this real", "is this legit", "is this a scam", "is this site real"],
},
{
  id: "botIdentity",
  words: [],
  phrases: ["what are you", "are you a real person", "what's your name", "whats your name", "are you pushkar"],
  minScore: 2,
},
{
  id: "smalltalkAck",
  words: ["ok", "okay", "cool", "nice", "lol", "haha", "great", "awesome", "wow"],
  phrases: [],
},
{
  id: "elaborate",
  words: ["more", "elaborate"],
  phrases: ["tell me more", "more info", "more details", "what else", "anything else"],
},
{
  id: "funnyBored",
  words: ["bored", "boring"],
  phrases: ["do you get bored", "is this boring"],
},
{
  id: "funnyDate",
  words: ["date", "dating"],
  phrases: ["can i date pushkar", "date pushkar", "date you"],
},
  {
    id: "currentWork",
    words: ["currently", "now", "working"],
    phrases: ["working on right now", "current work", "what are you building", "what's next"],
  },
];

// Generic small-talk / navigation words that should never be sent to GPT
// even though they don't carry portfolio content on their own.
export const GREETING_WORDS = ["hi", "hello", "hey", "yo", "sup", "what's", "whats", "up"];
