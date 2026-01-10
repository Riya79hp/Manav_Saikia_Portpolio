// src/components/Carousel.tsx
import React from "react";
import "./Carousel.css"; // 👈 Move CSS into separate file
import AE from "./AE.png";
import PS from "./PS.png";
import DA from "./DA.png";
import AI from "./AI.png";
import PR from "./PR.png";
import CC from "./CC.png";
import CV from "./CV.png";

const Carousel: React.FC = () => {
  return (
    <div id="expertise">
      {/* Expertise Section Heading */}
      <div className="expertise-section">
        <h1 className="expertise-title">EXPERTISE</h1>
        <p className="expertise-description">
          I specialize in motion graphics, video editing, and visual storytelling using top industry tools.
        </p>
      </div>

      {/* Carousel */}
      <div className="banner">
        <div className="slider" style={{ ["--quantity" as any]: 7 }}>
          <div className="item" style={{ ["--position" as any]: 1 }}>
            <img src={AE} alt="After Effects" />
            <span className="tool-label">Adobe After Effects</span>
          </div>
          <div className="item" style={{ ["--position" as any]: 2 }}>
            <img src={PS} alt="Photoshop" />
            <span className="tool-label">Adobe Photoshop</span>
          </div>
          <div className="item" style={{ ["--position" as any]: 3 }}>
            <img src={DA} alt="DaVinci Resolve" />
            <span className="tool-label">DaVinci Resolve</span>
          </div>
          <div className="item" style={{ ["--position" as any]: 4 }}>
            <img src={AI} alt="Illustrator" />
            <span className="tool-label">Adobe Illustrator</span>
          </div>
          <div className="item" style={{ ["--position" as any]: 5 }}>
            <img src={PR} alt="Premiere Pro" />
            <span className="tool-label">Adobe Premiere Pro</span>
          </div>
          <div className="item" style={{ ["--position" as any]: 6 }}>
            <img src={CC} alt="Creative Cloud" />
            <span className="tool-label">Cap Cut</span>
          </div>
          <div className="item" style={{ ["--position" as any]: 7 }}>
            <img src={CV} alt="Canva" />
            <span className="tool-label">Canva</span>
          </div>
        </div>

        <div className="content">
         
          <div className="author">
          </div>
          <div className="model"></div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
