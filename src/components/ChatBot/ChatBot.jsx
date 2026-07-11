import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatWindow from "./ChatWindow";
import "./chatbot.css";

/*
  ChatBot
  -------
  Drop <ChatBot darkMode={darkMode} /> once, anywhere inside the root
  <div className={`portfolio ...`}> in App.js. It's fixed-position, so
  placement in the JSX tree doesn't matter — only that it's rendered.
*/
export default function ChatBot({ darkMode = true }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`cb-root ${darkMode ? "dark" : "light"}`}>
      {open && <ChatWindow onClose={() => setOpen(false)} />}

      <button
        type="button"
        className="cb-launcher"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <MessageCircle size={22} />
      </button>
    </div>
  );
}
