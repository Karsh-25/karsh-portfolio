import React, { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";
import ChatMessage from "./ChatMessage";
import SuggestionChips from "./SuggestionChips";
import TypingIndicator from "./TypingIndicator";
import { matchIntent } from "../../chatbot/router";
import buildResponse from "../../chatbot/responses";
import { PROFILE } from "../../chatbot/portfolioData";
import spiderLogo from "../../assets/spider-emblem.png";


function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      type: "text",
      text: `Hey, I'm ${PROFILE.name.split(" ")[0]}'s assistant. Ask me anything about the work here.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

 const FALLBACK_REPLIES = [
  "I'm not sure about that one yet — try asking about my projects, skills, cuteness, or how abut roasting you.",
  "That one's outside my wheelhouse 😅 — ask me about Pushkar's games, skills, or how to reach him!",
  "Don't have an answer for that, but I've got plenty on projects, skills, and how to be friend with a chatbot.",
];

function pickFallback() {
  return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
}

function handleSend(rawText) {
  const text = (rawText ?? input).trim();
  if (!text) return;

  setMessages((m) => [...m, { from: "user", text }]);
  setInput("");
  setTyping(true);

  setTimeout(() => {
    const match = matchIntent(text);
    const response = match ? buildResponse(match.id) : null;

    if (match?.action?.scrollTo) scrollToSection(match.action.scrollTo);

    setTyping(false);
    setMessages((m) => [
      ...m,
      response ? { from: "bot", ...response } : { from: "bot", type: "text", text: pickFallback() },
    ]);
  }, 850 + Math.random() * 400); // ~0.85–1.25s, feels natural rather than robotic-fixed
}

  return (
    <div className="cb-window">
      <div className="cb-window-bg">
        <img src={spiderLogo} alt="" />
      </div>
      <div className="cb-header">
        <span>Ask {PROFILE.name.split(" ")[0]}</span>
        <button type="button" onClick={onClose} aria-label="Close chat">
          <X size={16} />
        </button>
      </div>

      <div className="cb-body" ref={scrollRef}>
        {messages.map((m, i) => (
          <ChatMessage key={i} {...m} />
        ))}
        {typing && <TypingIndicator />}
        {messages.length === 1 && <SuggestionChips onSelect={handleSend} />}
      </div>

      <form
        className="cb-input-row"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about projects, skills, resume..."
          aria-label="Message"
        />
        <button type="submit" aria-label="Send">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
