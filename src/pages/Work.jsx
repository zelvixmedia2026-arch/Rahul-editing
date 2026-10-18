import { useEffect, useRef } from "react";
import "./Work.css";
import videos from "../data/videos";
import About from "./About";
import Creator from "./Creator";
import Contact from "./Contact";

/* ====== CAROUSEL SETTINGS ====== */
const AUTO_SCROLL = false; // false = smooth manual row (recommended), true = endless auto-move
const SPEED = 60;          // seconds per loop, only used when AUTO_SCROLL is true
const GAP = 20;            // space between videos in px
const VIDEO_WIDTH = 300;   // video width in px
/* =============================== */

const keyframes = `
@keyframes vmMove {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
.vm-wrap:hover .vm-track { animation-play-state: paused; }
`;

const styles = {
  wrap: {
    width: "100%",
    overflowX: AUTO_SCROLL ? "hidden" : "auto",
    overflowY: "hidden",
    padding: "15px 0 25px",
  },
  track: {
    display: "flex",
    width: "max-content",
    animation: AUTO_SCROLL ? `vmMove ${SPEED}s linear infinite` : "none",
    willChange: AUTO_SCROLL ? "transform" : "auto",
  },
  group: {
    display: "flex",
    flex: "0 0 auto",
    gap: GAP,
    paddingRight: GAP,
  },
  item: {
    position: "relative",
    flex: "0 0 auto",
    width: VIDEO_WIDTH,
    aspectRatio: "16 / 9",
    overflow: "hidden",
    background: "#071f21",
  },
  video: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  number: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: "6px 9px",
    background: "#ffd45c",
    color: "#0d3f42",
    fontSize: 10,
    fontWeight: 800,
    pointerEvents: "none",
  },
};

/* Plays the video only while it is on screen, pauses it otherwise */
function VideoCard({ video }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={styles.item}>
      <video
        ref={ref}
        style={styles.video}
        src={video.src}
        muted
        loop
        playsInline
        preload="none"
      />
      <span style={styles.number}>{String(video.id).padStart(2, "0")}</span>
    </div>
  );
}

export default function Work() {
  // Two copies only for the endless auto-move. Otherwise just one.
  const groups = AUTO_SCROLL ? [0, 1] : [0];

  return (
    <main className="work-page">
      {AUTO_SCROLL && <style>{keyframes}</style>}

      {/* ========== HERO ========== */}
      <section className="work-hero">
        <div className="hero-content">
          <p className="hero-eyebrow">
             VIDEO EDITOR<span>● CONTENT CREATOR</span>
          </p>

          <h1>
            I TURN IDEAS  <span>INTO STORIES.</span>
          </h1>

          <p className="hero-description">
           Crafting engaging edits, cinematic visuals and content that makes people stop scrolling
          </p>

          <div className="hero-actions">
            <a href="#work" className="hero-btn primary-btn">
              EXPLORE MY WORK<span>→</span>
            </a>
            <a href="#contact" className="hero-btn secondary-btn">
              LET'S CONNECT<span>→</span>
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <h2>18</h2>
              <p>PROJECTS TO SHOWCASE</p>
            </div>
            <div>
              <h2>CREATIVE</h2>
              <p>EDITING APPROACH</p>
            </div>
            <div>
              <h2>3+</h2>
              <p>YEARS EXPERIENCE</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-frame">
            <div className="visual-top">
              <span>SHOWREEL</span>
              <span>HD</span>
            </div>

            <div className="visual-center">
              <div className="play-symbol">▶</div>
              <p>WATCH SHOWREEL</p>
            </div>

            <div className="visual-bottom">
              <span>RAHUL EDITING</span>
              <span>VIDEO EDITOR</span>
            </div>
          </div>

          <div className="visual-tag">AVAILABLE FOR WORK</div>
        </div>
      </section>

      {/* ========== SHOWCASE + VIDEOS ========== */}
      <section className="work-showcase" id="work">
        <div className="showcase-heading">
          <div>
            <p className="section-eyebrow">SELECTED WORK</p>
            <h2>
              Latest edits<span>.</span>
            </h2>
          </div>

          <p className="showcase-description">
            A look at some of the videos I have edited recently. Scroll
            sideways to see more.
          </p>
        </div>

        <div className="vm-wrap" style={styles.wrap}>
          <div className="vm-track" style={styles.track}>
            {groups.map((group) => (
              <div style={styles.group} key={group} aria-hidden={group === 1}>
                {videos.map((video) => (
                  <VideoCard video={video} key={video.id} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <About />

      {/* ========== BRANDS + CREATORS ========== */}
      <Creator />

      {/* ========== CONTACT ========== */}
      <Contact />
    </main>
  );
}