import React from "react";
import MessageRenderer from "./MessageRenderer";

export default function ChatMessage({ from, text, type, data }) {
  const isUser = from === "user";
  return (
    <div className={`cb-msg-row ${isUser ? "cb-msg-user" : "cb-msg-bot"}`}>
      <div className="cb-bubble">
        {text && <p>{text}</p>}
        {type && type !== "text" && data && <MessageRenderer type={type} data={data} />}
      </div>
    </div>
  );
}
