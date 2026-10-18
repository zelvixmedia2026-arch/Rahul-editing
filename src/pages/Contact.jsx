import { useState } from "react";
import "./Contact.css";

/* ====== EDIT RAHUL'S REAL DETAILS HERE ======
   WHATSAPP_NUMBER: country code + number, digits only (no +, spaces or dashes)
   Example for India: "919876543210"
   Leave INSTAGRAM / YOUTUBE as "" to hide them. */
const WHATSAPP_NUMBER = "919972865271";
const EMAIL = "Itsmerahul.edit@gmail.com";
const INSTAGRAM = ""; // e.g. "https://instagram.com/yourhandle"
const YOUTUBE = "";   // e.g. "https://youtube.com/@yourchannel"

const projectTypes = [
  "YouTube video",
  "Reels / Shorts",
  "Ad or brand video",
  "Podcast / long-form",
  "Something else",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    type: projectTypes[0],
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (e) => {
    setSent(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buildText = () =>
    `Hi Rahul, I'm ${form.name}.\n` +
    `I need help with: ${form.type}\n\n` +
    `${form.message}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      buildText()
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const emailLink = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Video editing project: ${form.type}`
  )}&body=${encodeURIComponent(buildText())}`;

  return (
    <section className="contact-page" id="contact">
      <div className="contact-grid">
        {/* ===== LEFT: TEXT + CONTACT METHODS ===== */}
        <div className="contact-text">
          <p className="contact-eyebrow">
            <span>●</span> LET'S WORK TOGETHER
          </p>

          <h2>
            Send your footage. I'll take care of the rest<span>.</span>
          </h2>

          <p className="contact-intro">
            Tell me what you're making and I'll get back to you on WhatsApp.
            No long forms, no waiting around.
          </p>

          <ul className="contact-methods">
            <li>
              <span>WHATSAPP</span>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat with Rahul ↗
              </a>
            </li>

            <li>
              <span>EMAIL</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>

            {INSTAGRAM && (
              <li>
                <span>INSTAGRAM</span>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                  Follow my work ↗
                </a>
              </li>
            )}

            {YOUTUBE && (
              <li>
                <span>YOUTUBE</span>
                <a href={YOUTUBE} target="_blank" rel="noopener noreferrer">
                  Watch my edits ↗
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* ===== RIGHT: FORM ===== */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Tell me about your project</h3>

          <label htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={update}
            placeholder="e.g. Aarav"
            required
          />

          <label htmlFor="type">What do you need?</label>
          <select id="type" name="type" value={form.type} onChange={update}>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <label htmlFor="message">Your message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={form.message}
            onChange={update}
            placeholder="Tell me about the video, the deadline, and add a link to your footage (Google Drive, WeTransfer...)"
            required
          />

          <button type="submit" className="contact-btn">
            Send on WhatsApp <span>→</span>
          </button>

          <a className="contact-email" href={emailLink}>
            or send by email instead
          </a>

          {sent && (
            <p className="contact-sent" role="status">
              WhatsApp should have opened with your message ready. Just press
              send there.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}