import { Link } from "react-router-dom";
import "./Creator.css";

/* ====== 1. YOUR 9 BRANDS ======
   logo: "/thumbnails/" + the exact file name (same capitals, same extension) */

const brands = [
  { name: "AURO", logo: "/thumbnails/B1.png" },
  { name: "BUZZ BITE MEDIA", logo: "/thumbnails/B2.png" },
  { name: "DELITE", logo: "/thumbnails/B3.png" },
  { name: "HERBAL LIFE INDIA", logo: "/thumbnails/B4.png" },
  { name: "JUNA BAKERY", logo: "/thumbnails/B5.png" },
  { name: "PANTERRA LOGO", logo: "/thumbnails/B6.png" },
  { name: "PITSHOP", logo: "/thumbnails/B7.png" },
  { name: "SALAD CREATION", logo: "/thumbnails/B8.png" },
  { name: "STAGE MARATHI", logo: "/thumbnails/B9.png" },
];


/* ====== 2. YOUR 6 CREATORS ======
   name:     creator's name
   platform: YouTube, Instagram, etc.
   handle:   their @handle
   url:      link to their channel / profile (leave "" for no link)
   photo:    "/creators/file.jpg" inside the public folder (leave "" to show initials) */
const creators = [
  { name: "GAURAV MEDATWAL", platform: "Instagram", handle: "@gaurav18medatwal", url: "https://www.instagram.com/gaurav18medatwal?vrfl=MTR2dTZnbWtpZ29yMQ==", photo: "/creatorimages/GAURAV MEDATWAL.png" },
  { name: "KIRTI VERMA", platform: "Instagram", handle: "@kirtivermaofficial", url: "https://www.instagram.com/kritivermaofficial?obrf=MTExZXlpZnB1YW9oeg==", photo: "/creatorimages/kirti.png" },
  { name: "MANISHA SAXENA", platform: "Instagram", handle: "@maneeshaa.saxenaa", url: "https://www.instagram.com/maneeshaa.saxenaa?dlrf=MXZoN3QzMnA3azBwdg==", photo: "/creatorimages/Manisha.png" },
  { name: "URFI JAVEED", platform: "Youtube", handle: "@TheUorfi", url: "https://youtube.com/@theuorfi?si=NNNUViisWQSkPCSP", photo: "/creatorimages/URFI JAVEED.png" },
  { name: "VIKALP MEHTA", platform: "Instagram", handle: "@vikalp_mehta", url: "https://www.instagram.com/vikalp_mehta?vrfl=MWVzbWx3Mng5cWR2cA==", photo: "/creatorimages/Vikalp.png" },
  { name: "NOOR", platform: "Instagram", handle: "@noor_wav", url: "https://www.instagram.com/noor_wav?vrfl=MWFta2djdGNreDFhcA==", photo: "/creatorimages/NOOR.png" },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Creator() {
  return (
    <section className="creator-page" id="creator">
      {/* ===== BRANDS HEADER ===== */}
      <div className="creator-header">
        <p className="creator-eyebrow">
          <span>●</span> BRANDS I'VE WORKED WITH
        </p>

        <h2 className="creator-title">
          Brands that trusted me with their videos<span>.</span>
        </h2>

        <p className="creator-intro">
          Every logo below is a real project, from reels and ads to long-form
          videos.
        </p>
      </div>

      {/* ===== BRAND LOGOS ===== */}
      <div className="brand-grid">
        {brands.map((brand) => (
          <figure className="brand-item" key={brand.name}>
            <div className="brand-tile">
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                loading="lazy"
              />
            </div>
            <figcaption>{brand.name}</figcaption>
          </figure>
        ))}
      </div>

      {/* ===== CREATORS HEADER ===== */}
      <div className="creator-header creators-block">
        <p className="creator-eyebrow">
          <span>●</span> CREATORS I'VE WORKED WITH
        </p>

        <h2 className="creator-title">
          Creators I edit for<span>.</span>
        </h2>
      </div>

      {/* ===== CREATOR CARDS ===== */}
      <div className="creators-grid">
        {creators.map((creator) => {
          const content = (
            <>
              <div className="creator-avatar">
                <span>{getInitials(creator.name)}</span>
                {creator.photo && (
                  <img
                    src={creator.photo}
                    alt={creator.name}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                )}
              </div>

              <div className="creator-info">
                <h3>{creator.name}</h3>
                <p>
                  {creator.platform} · {creator.handle}
                </p>
              </div>

              {creator.url && <span className="creator-arrow">↗</span>}
            </>
          );

          return creator.url ? (
            <a
              className="creator-card"
              key={creator.name}
              href={creator.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          ) : (
            <div className="creator-card" key={creator.name}>
              {content}
            </div>
          );
        })}
      </div>

      {/* ===== CALL TO ACTION ===== */}
      <div className="creator-cta">
        <h3>
          Want your brand here<span>?</span>
        </h3>
        <p>Send me your footage and I'll take care of the rest.</p>
        <Link to="/contact" className="creator-btn">
          Send your footage
        </Link>
      </div>
    </section>
  );
}