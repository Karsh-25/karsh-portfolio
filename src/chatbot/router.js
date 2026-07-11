import { INTENTS, GREETING_WORDS } from "./intents";

/*
  router.js
  ---------
  Replaces plain keyword-includes matching with weighted synonym +
  phrase scoring, so the bot "feels smart" without calling any AI:

    - phrase match  (multi-word synonym found in the message)  -> +3
    - word match    (single-word synonym found as a whole token) -> +1
    - exact-intent word count / message word count ratio        -> small bonus,
      rewards messages that are basically just the synonym itself
      ("resume?" scores higher confidence than "hey can you maybe
      send me your resume sometime")

  A message can match more than one intent (e.g. "unity projects" hits
  both "unity" and "projects") — we keep the highest-scoring one, and
  only fall back to GPT if nothing clears the confidence bar.
*/

const DEFAULT_MIN_SCORE = 1;

function normalize(input) {
  return input
    .toLowerCase()
    .replace(/[^\w\s'-]/g, " ") // strip punctuation, keep words/apostrophes
    .replace(/\s+/g, " ")
    .trim();
}

function scoreIntent(intent, normalized, tokens) {
  let score = 0;
  let hits = 0;

  for (const phrase of intent.phrases || []) {
    if (normalized.includes(phrase)) {
      score += 3;
      hits += phrase.split(" ").length;
    }
  }

  for (const word of intent.words || []) {
    if (tokens.includes(word)) {
      score += 1;
      hits += 1;
    }
  }

  if (score > 0 && tokens.length > 0) {
    // Reward short, on-topic messages: "resume" (1/1) beats a long
    // rambling sentence that happens to contain the same word once.
    score += Math.min(1, hits / tokens.length);
  }

  return score;
}

/**
 * Match a raw user message against known intents.
 * @param {string} message
 * @returns {{ id: string, confidence: number, action?: object } | null}
 *          null means "no confident local match — send to GPT"
 */
export function matchIntent(message) {
  const normalized = normalize(message);
  if (!normalized) return null;

  const tokens = normalized.split(" ");

  if (tokens.length <= 2 && tokens.every((t) => GREETING_WORDS.includes(t))) {
    return { id: "greeting", confidence: 1 };
  }

  let best = null;

  for (const intent of INTENTS) {
    const score = scoreIntent(intent, normalized, tokens);
    const threshold = intent.minScore ?? DEFAULT_MIN_SCORE;

    if (score >= threshold && (!best || score > best.score)) {
      best = { id: intent.id, score, action: intent.action };
    }
  }

  if (!best) return null;

  return {
    id: best.id,
    confidence: best.score,
    action: best.action,
  };
}

/**
 * Convenience wrapper for router.js's message-flow: returns whether the
 * message should be handled locally, and if so, with which intent.
 */
export function routeMessage(message) {
  const match = matchIntent(message);
  return {
    handledLocally: match !== null,
    intent: match,
  };
}
