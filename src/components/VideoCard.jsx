
import "./VideoCard.css";

export default function VideoCard({ video }) {
  return (
    <article className="video-card">
      <div className="video-card-media">
        <video
          src={video.src}
          controls
          preload="metadata"
          playsInline
        />

        <span className="video-card-number">
          {String(video.id).padStart(2, "0")}
        </span>
      </div>

      <div className="video-card-info">
        <h3>{video.title}</h3>
        <span>VIDEO EDITING</span>
      </div>
    </article>
  );
}
