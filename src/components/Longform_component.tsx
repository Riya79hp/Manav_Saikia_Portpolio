import { amber } from "@mui/material/colors";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import vid1 from "../asset_images_manav/long_form_videos/vid1.mp4";
import vid2 from "../asset_images_manav/long_form_videos/vid2.mp4";
import Footer from "./Footer";

type Video = {
  id: number;
  title: string;
  description: string;
  src: string;
};

const videos: Video[] = [
  {
    id: 1,
    title: "YouTube Podcast Edit (45 min)",
    description: "Multi-cam podcast edit with pacing, jump cuts & subtitles.",
    src: vid1,
  },
  {
    id: 2,
    title: "Travel Vlog – Cinematic Edit",
    description: "Long-form travel vlog with color grading & sound design.",
    src: vid2,
  },

];

const ThreeDHeading: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
 

  useEffect(() => {
    // Detect dark mode
    const checkDarkMode = () => {
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(darkMode);
    };

    checkDarkMode();
    
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener('change', handleChange);

    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create pencil sketch lines background and flying pencils
    const lines: THREE.Line[] = [];
    const pencils: THREE.Group[] = [];
    const lineMaterials: THREE.LineBasicMaterial[] = [];

    // Choose colors based on theme
    const getStrokeColors = () => {
      if (isDarkMode) {
        return {
          primary: 0x60a5fa,    // Light blue
          secondary: 0xa78bfa,  // Light purple
          tertiary: 0x94a3b8,   // Light slate
        };
      } else {
        return {
          primary: 0x1e40af,    // Dark blue
          secondary: 0x6d28d9,  // Dark purple
          tertiary: 0x334155,   // Dark slate
        };
      }
    };

    const createPencil = () => {
      const pencil = new THREE.Group();
      
      // Pencil body (hexagonal)
      const bodyGeometry = new THREE.CylinderGeometry(0.08, 0.08, 2, 6);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.3,
        roughness: 0.7,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      pencil.add(body);
      
      // Pencil tip (cone)
      const tipGeometry = new THREE.ConeGeometry(0.08, 0.3, 6);
      const tipMaterial = new THREE.MeshStandardMaterial({
        color: 0xd2691e,
        metalness: 0.2,
        roughness: 0.8,
      });
      const tip = new THREE.Mesh(tipGeometry, tipMaterial);
      tip.rotation.x = Math.PI;
      tip.position.y = -1.15;
      pencil.add(tip);
      
      // Lead (graphite)
      const leadGeometry = new THREE.ConeGeometry(0.02, 0.15, 6);
      const leadMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
      });
      const lead = new THREE.Mesh(leadGeometry, leadMaterial);
      lead.position.y = -1.225;
      pencil.add(lead);
      
      // Eraser
      const eraserGeometry = new THREE.CylinderGeometry(0.085, 0.085, 0.2, 6);
      const eraserMaterial = new THREE.MeshStandardMaterial({
        color: 0xff69b4,
        metalness: 0.1,
        roughness: 0.9,
      });
      const eraser = new THREE.Mesh(eraserGeometry, eraserMaterial);
      eraser.position.y = 1.1;
      pencil.add(eraser);
      
      // Metal band
      const bandGeometry = new THREE.CylinderGeometry(0.09, 0.09, 0.1, 6);
      const bandMaterial = new THREE.MeshStandardMaterial({
        color: 0xc0c0c0,
        metalness: 0.9,
        roughness: 0.1,
      });
      const band = new THREE.Mesh(bandGeometry, bandMaterial);
      band.position.y = 1;
      pencil.add(band);
      
      return pencil;
    };

    const createPencilBackground = () => {
      const colors = getStrokeColors();

      // Create multiple flying pencils
      for (let i = 0; i < 15; i++) {
        const pencil = createPencil();
        pencil.position.x = (Math.random() - 0.5) * 20;
        pencil.position.y = (Math.random() - 0.5) * 10;
        pencil.position.z = -8 + Math.random() * 4;
        pencil.rotation.z = Math.random() * Math.PI * 2;
        pencil.scale.set(1.2, 1.2, 1.2);
        pencils.push(pencil);
        scene.add(pencil);
      }

      // Create pencil sketch marks trail effect
      for (let i = 0; i < 60; i++) {
        const points = [];
        const startX = (Math.random() - 0.5) * 25;
        const startY = (Math.random() - 0.5) * 12;
        const startZ = -6 + Math.random() * 3;
        
        // Create sketchy pencil strokes with varying pressure
        const strokeLength = 10 + Math.random() * 20;
        for (let j = 0; j < strokeLength; j++) {
          points.push(
            new THREE.Vector3(
              startX + j * 0.2 + Math.sin(j * 0.3) * 0.3 + (Math.random() - 0.5) * 0.15,
              startY + Math.cos(j * 0.4) * 0.2 + (Math.random() - 0.5) * 0.15,
              startZ + (Math.random() - 0.5) * 0.05
            )
          );
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const colorChoice = Math.random();
        const color = colorChoice > 0.66 ? colors.primary : colorChoice > 0.33 ? colors.secondary : colors.tertiary;
        
        const material = new THREE.LineBasicMaterial({
          color: '#4F46E5',
          transparent: true,
          
          linewidth: 2,
         opacity: 0.45 + Math.random() * 0.35,
        });
        
        const line = new THREE.Line(geometry, material);
        lines.push(line);
        lineMaterials.push(material);
        scene.add(line);
      }

      // Add crosshatch pencil marks
      for (let i = 0; i < 40; i++) {
        const points = [];
        const startX = (Math.random() - 0.5) * 25;
        const startY = (Math.random() - 0.5) * 12;
        const startZ = -5 + Math.random() * 2;
        
        const angle = (Math.PI / 4) * Math.floor(Math.random() * 4);
        const length = 5 + Math.random() * 8;
        
        for (let j = 0; j < length; j++) {
          points.push(
            new THREE.Vector3(
              startX + Math.cos(angle) * j * 0.3 + (Math.random() - 0.5) * 0.1,
              startY + Math.sin(angle) * j * 0.3 + (Math.random() - 0.5) * 0.1,
              startZ
            )
          );
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: colors.tertiary,
          transparent: true,
          opacity: 0.1 + Math.random() * 0.2,
        });
        
        const line = new THREE.Line(geometry, material);
        lines.push(line);
        lineMaterials.push(material);
        scene.add(line);
      }
    };

    createPencilBackground();

    // Lighting - soft ambient for sketch effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate flying pencils - they float and rotate
      pencils.forEach((pencil, index) => {
        // Floating motion
        pencil.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        pencil.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.008;
        
        // Rotation for dynamic look
        pencil.rotation.x += 0.005;
        pencil.rotation.y += 0.003;
        pencil.rotation.z += 0.002;
        
        // Keep pencils in bounds
        if (pencil.position.x > 12) pencil.position.x = -12;
        if (pencil.position.x < -12) pencil.position.x = 12;
        if (pencil.position.y > 7) pencil.position.y = -7;
        if (pencil.position.y < -7) pencil.position.y = 7;
      });

      // Animate sketch lines for hand-drawn effect
      lines.forEach((line, index) => {
        line.rotation.z += 0.0002 * (index % 2 === 0 ? 1 : -1);
        line.position.y += Math.sin(Date.now() * 0.0008 + index) * 0.0003;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Clean up
      lines.forEach(line => {
        line.geometry.dispose();
      });
      lineMaterials.forEach(material => material.dispose());
      pencils.forEach(pencil => {
        pencil.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(m => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      });
      renderer.dispose();
    };
  }, [isDarkMode]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '300px', marginBottom: '40px' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      <h2
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 800,
          margin: 0,
          textAlign: 'center',
          pointerEvents: 'none',
          color: '#fff',
          mixBlendMode: 'difference',
          letterSpacing: '-0.02em',
        }}
      >
        LONG-FORM VIDEOS
      </h2>
    </div>
  );
};

const VideoPortfolio: React.FC = () => {
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);
 const [previewEnded, setPreviewEnded] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      <style>
        {`
        :root {
  --card-bg: #ffffffff; 
  --card-text: #e11616ff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --card-bg: #ffffffff; /* deep purple */
    --card-text: #000000ff;
  }
}
          .video-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 32px;
            margin-bottom: 80px;
            max-width: 1400px;
            margin-left: auto;
            margin-right: auto;
          }

          .card {
  background: var(--card-bg);
  color: var(--card-text);
  border-radius: 20px;
  overflow: hidden;
  
  transition: all 0.3s ease;
}

.video-title,
.description {
  color: var(--card-text);
}


          .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          }

          .video-container {
            position: relative;
            width: 100%;
            padding-bottom: 56.25%;
           
            overflow: hidden;
          }

          .video-container video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .card-content {
            padding: 32px;
          }

          .video-title {
            font-size: clamp(1.25rem, 2vw, 1.5rem);
            font-weight: 600;
            margin-bottom: 12px;
            line-height: 1.3;
          }

          .description {
            font-size: 1rem;
            opacity: 0.7;
            line-height: 1.6;
            margin: 0;
          }
            .preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  padding: 24px;
  z-index: 2;
}

.preview-overlay h3 {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.preview-overlay p {
  font-size: 1rem;
  opacity: 0.85;
  margin-bottom: 16px;
}

.preview-overlay a {
  padding: 12px 28px;
  border-radius: 999px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.preview-overlay a:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
}


          .footer {
            text-align: center;
            padding-top: 40px;
            max-width: 1400px;
            margin: 0 auto;
          }

          .footer-text {
            font-size: 1.125rem;
            opacity: 0.7;
            margin-bottom: 24px;
          }

          .cta-button {
            padding: 16px 40px;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: #ffffff;
            border: none;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
            transition: all 0.3s ease;
          }

          .cta-button:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
          }
        `}
      </style>

      {/* Header Section with 3D */}
      <header style={{ textAlign: "center", marginBottom: "60px", paddingTop: "40px" }}>
        <ThreeDHeading />
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: 1.6,
            opacity: 0.7,
          }}
        >
          Professional long-form video edits crafted with attention to detail
        </p>
      </header>

      {/* Video Grid */}
     
      <div className="video-grid">
  {videos.map((video) => (
    <div className="card" key={video.id}>
      <div className="video-container">
        
          <video
           src={video.src}
  autoPlay
  muted
  playsInline
  preload="metadata"
  controls={previewEnded !== video.id}
  onTimeUpdate={(e) => {
    if (video.id === 2) {
      const el = e.currentTarget;
      if (el.currentTime >= 60 && previewEnded !== 2) {
        el.pause();
        setPreviewEnded(2);
      }
    }
  }}
          />
          {previewEnded === video.id && video.id === 2 && (
  <div className="preview-overlay">
    <h3>Preview ended</h3>
    <p>Watch the full cinematic edit</p>
    <a
      href="https://www.youtube.com/watch?v=Ezm6pv2baaw"
      target="_blank"
      rel="noopener noreferrer"
    >
      Watch on YouTube →
    </a>
  </div>
)}

       
      </div>
    </div>
  ))}
</div>

      {/* Footer CTA */}
      <div className="footer">
  <p className="footer-text">Want to see more?</p>

  <a
    href="https://drive.google.com/drive/u/2/folders/1rRjDW2xQQfAVTHBAoHsjXHrtqpSBFvhs"
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: "none" }}
  >
    <button className="cta-button">
      View Full Portfolio
    </button>
  </a>
</div>
<Footer />
    </div>
  );
};

export default VideoPortfolio;