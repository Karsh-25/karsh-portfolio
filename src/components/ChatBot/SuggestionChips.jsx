import React from "react";

const SUGGESTIONS = [
  { label: "🎮 Projects", text: "Show me your projects" },
  { label: "💻 Skills", text: "What are your skills?" },
  { label: "📄 Resume", text: "Can I see your resume?" },
  { label: "📞 Contact", text: "How do I contact you?" },
  { label: "🏆 Experience", text: "Tell me about your experience" },
  { label: "🚀 Best Project", text: "What's your best project?" },
  { label: "🎨 Unity Assets", text: "Show me your Unity assets" },
];

export default function SuggestionChips({ onSelect }) {
  return (
    <div className="cb-suggestions">
      {SUGGESTIONS.map((s) => (
        <button key={s.label} type="button" className="cb-suggestion-chip" onClick={() => onSelect(s.text)}>
          {s.label}
        </button>
      ))}
    </div>
  );
}
