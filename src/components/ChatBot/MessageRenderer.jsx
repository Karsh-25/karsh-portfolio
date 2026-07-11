import React from "react";
import { ArrowUpRight, Download, Mail, Github, Linkedin, Instagram, X as XIcon } from "lucide-react";

const ICONS = { github: Github, linkedin: Linkedin, instagram: Instagram, x: XIcon };

/*
  MessageRenderer
  ----------------
  One switch statement, one component per response "type". This is the
  piece that keeps the bot from ever dumping a wall of text — every
  intent maps to a small UI element instead.
*/
export default function MessageRenderer({ type, data }) {
  switch (type) {
    case "projects":
      return (
        <div className="cb-project-grid">
          {data.map((p, i) => (
            <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="cb-project-card">
              <img src={p.img} alt={p.title} />
              <div>
                <h4>{p.title}</h4>
                <span>{p.year}</span>
              </div>
            </a>
          ))}
        </div>
      );

    case "skills":
      return (
        <div className="cb-skills">
          {Object.entries(data).map(([group, items]) => (
            <div key={group} className="cb-skill-group">
              <span className="cb-skill-label">{group}</span>
              <div className="cb-chip-row">
                {items.map((s) => (
                  <span key={s} className="cb-chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "resume":
      return (
        <a href={data.url} download={data.fileName} className="cb-resume-card">
          <Download size={18} />
          <div>
            <strong>Download Resume</strong>
            <span>{data.fileName}</span>
          </div>
        </a>
      );

    case "contact":
      return (
        <div className="cb-contact-cards">
          <a href={`mailto:${data.email}`} className="cb-contact-card">
            <Mail size={16} /> {data.email}
          </a>
          {data.socials
            .filter((s) => s.url && s.url !== "#")
            .map((s) => {
              const Icon = ICONS[s.icon] || ArrowUpRight;
              return (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="cb-contact-card">
                  <Icon size={16} /> {s.label}
                </a>
              );
            })}
        </div>
      );

    case "socials":
      return (
        <div className="cb-social-row">
          {data
            .filter((s) => s.url && s.url !== "#")
            .map((s) => {
              const Icon = ICONS[s.icon] || ArrowUpRight;
              return (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="cb-social-btn" aria-label={s.label}>
                  <Icon size={16} />
                </a>
              );
            })}
        </div>
      );

    case "buttons":
      return (
        <div className="cb-contact-cards">
          {data.map((s) => {
            const Icon = ICONS[s.icon] || ArrowUpRight;
            return (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="cb-contact-card">
                <Icon size={16} /> {s.label}
              </a>
            );
          })}
        </div>
      );

    case "experience":
      return data.length ? (
        <div className="cb-timeline">
          {data.map((e, i) => (
            <div key={i} className="cb-timeline-item">
              <strong>{e.role}</strong> — {e.org}
              <span>{e.period}</span>
              <p>{e.desc}</p>
            </div>
          ))}
        </div>
      ) : null;

    default:
      return null;
  }
}
