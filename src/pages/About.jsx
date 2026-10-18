import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./About.css";

const FPS = 25;
const TIMELINE_SECONDS = 60;

function formatTimecode(totalFrames) {
  const frames = totalFrames % FPS;
  const totalSeconds = Math.floor(totalFrames / FPS);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  return [hours, minutes, seconds, frames]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

const clips = [
  { label: "FOOTAGE", size: 28 },
  { label: "CUT", size: 19 },
  { label: "COLOR", size: 24 },
  { label: "EXPORT", size: 27 },
];

export default function About() {
  const timecodeRef = useRef(null);
  const playheadRef = useRef(null);
  const hoveringRef = useRef(false);

  // Running timecode (updates the text directly, so React never re-renders)
  useEffect(() => {
    const start = performance.now();

    const id = setInterval(() => {
      if (hoveringRef.current || !timecodeRef.current) return;
      const frames = Math.floor(((performance.now() - start) / 1000) * FPS);
      timecodeRef.current.textContent = formatTimecode(frames);
    }, 200);

    return () => clearInterval(id);
  }, []);

  const movePlayhead = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);

    playheadRef.current.style.left = `${ratio * 100}%`;
    timecodeRef.current.textContent = formatTimecode(
      Math.round(ratio * TIMELINE_SECONDS * FPS)
    );
  };

  return (
    <section className="about-page" id="about">
      <div className="about-frame">
        {/* REC bar */}
        <div className="about-top">
          <span className="about-rec">
            <i /> REC
          </span>
          <span className="about-timecode" ref={timecodeRef}>
            00:00:00:00
          </span>
        </div>

        {/* Main content */}
        <div className="about-grid">
          <div className="about-text">
            <h1>Great videos aren’t shot. They’re edited.</h1>

            <p className="about-lead">
              I’m a video editor. I make people stop scrolling and watch till
              the end.
            </p>

            <div className="about-stats">
              <div>
                <strong>[400+]</strong>
                <span>videos edited</span>
              </div>
              <div>
                <strong>On time</strong>
                <span>delivered on the date I promise</span>
              </div>
            </div>

            <blockquote className="about-quote">
              Hi, I’m Rahul. I notice a late cut the way some people notice a
              wrong note in a song. That attention to detail is what keeps your
              video smooth, sharp and easy to watch. Send me your footage and
              I’ll take care of the rest.
            </blockquote>

            <div>
              <Link to="/contact" className="about-btn">
                Send your footage
              </Link>
            </div>
          </div>

          <div className="about-photo">
            <img src="/rahul.jpg" alt="Rahul, video editor" loading="lazy" />
          </div>
        </div>

        {/* Timeline */}
        <div
          className="about-timeline"
          onPointerEnter={() => (hoveringRef.current = true)}
          onPointerLeave={() => (hoveringRef.current = false)}
          onPointerMove={movePlayhead}
        >
          {clips.map((clip) => (
            <div
              className="about-clip"
              key={clip.label}
              style={{ flex: `${clip.size} 1 0` }}
            >
              {clip.label}
            </div>
          ))}

          <div className="about-playhead" ref={playheadRef} />
        </div>

        <p className="about-hint">Move your mouse over the timeline</p>
      </div>
    </section>
  );
}