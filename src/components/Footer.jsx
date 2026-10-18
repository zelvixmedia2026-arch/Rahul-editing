import "./Footer.css";

/* ====== EDIT RAHUL'S REAL DETAILS HERE (same as in Contact.jsx) ====== */
const WHATSAPP_NUMBER = "919972865271";
const EMAIL = "Itsmerahul.edit@gmail.com";
const INSTAGRAM = ""; // e.g. "https://instagram.com/yourhandle"
const YOUTUBE = "";   // e.g. "https://youtube.com/@yourchannel"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Creator", href: "/#creator" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              RAHUL EDITING<span>.</span>
            </a>
            <p>
              Video editing for creators and brands. Clean cuts, strong
              storytelling, delivered on the date I promise.
            </p>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4>QUICK LINKS</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>GET IN TOUCH</h4>
            <ul>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              {INSTAGRAM && (
                <li>
                  <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
              )}
              {YOUTUBE && (
                <li>
                  <a href={YOUTUBE} target="_blank" rel="noopener noreferrer">
                    YouTube
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {year} Rahul Editing. All rights reserved.</p>

          <p className="footer-credit">
            Designed &amp; developed by{" "}
            <a
              href="https://zelvixmedia.online"
              target="_blank"
              rel="noopener noreferrer"
            >
              ZELVIX MEDIA
            </a>
          </p>

          <button type="button" className="footer-top-btn" onClick={scrollTop}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}