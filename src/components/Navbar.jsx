import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css"; // keep whatever CSS import your file already had

const sectionLinks = [
  { label: "Home", id: "top" },
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Creator", id: "creator" },
  { label: "Contact", id: "contact" },
];

function scrollToSection(id) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("top");
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  // Coming from another page: go home, then scroll to the section
  useEffect(() => {
    const id = location.state?.scrollTo;
    if (onHome && id) {
      const timer = setTimeout(() => scrollToSection(id), 120);
      return () => clearTimeout(timer);
    }
  }, [location, onHome]);

  // Highlights the link of the section you are currently looking at
  useEffect(() => {
    if (!onHome) return;

    const targets = [
      { el: document.querySelector(".work-hero"), id: "top" },
      { el: document.getElementById("work"), id: "work" },
      { el: document.getElementById("about"), id: "about" },
      { el: document.getElementById("creator"), id: "creator" },
      { el: document.getElementById("contact"), id: "contact" },
    ].filter((t) => t.el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = targets.find((t) => t.el === entry.target);
            if (match) setActiveId(match.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" } // thin line across the middle of the screen
    );

    targets.forEach((t) => observer.observe(t.el));
    return () => observer.disconnect();
  }, [onHome]);

  const handleSection = (e, id) => {
    e.preventDefault();
    setOpen(false);

    if (onHome) {
      scrollToSection(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a
          href="/"
          className="navbar-logo"
          onClick={(e) => handleSection(e, "top")}
        >
          <span className="logo-typing">RAHUL EDITING</span>
          <span className="logo-dot">.</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {sectionLinks.map((link, index) => (
            <a
              key={link.id}
              href={link.id === "top" ? "/" : `/#${link.id}`}
              className={`nav-link ${
                onHome && activeId === link.id ? "active" : ""
              }`}
              style={{ "--link-index": index }}
              onClick={(e) => handleSection(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}