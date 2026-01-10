import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Footer from "./Footer";
import vid1 from "../asset_images_manav/motion_graphics/vid1.mp4";
import vid2 from "../asset_images_manav/motion_graphics/vid2.mp4";

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
  }
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

    // Create eraser marks and flying erasers
    const lines: THREE.Line[] = [];
    const erasers: THREE.Group[] = [];
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

    const createEraser = () => {
      const eraser = new THREE.Group();
      
      // Main eraser body (white/pink rubber part)
      const eraserBodyGeometry = new THREE.BoxGeometry(0.3, 0.8, 0.15);
      const eraserBodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xffc0cb, // Pink eraser
        metalness: 0.1,
        roughness: 0.8,
      });
      const eraserBody = new THREE.Mesh(eraserBodyGeometry, eraserBodyMaterial);
      eraser.add(eraserBody);
      
      // Eraser sleeve/cover (cardboard wrapper - vibrant color visible in both modes)
      const sleeveGeometry = new THREE.BoxGeometry(0.32, 0.45, 0.17);
      const sleeveMaterial = new THREE.MeshStandardMaterial({
        color: 0xff6b35, // Vibrant orange-red
        metalness: 0.2,
        roughness: 0.7,
      });
      const sleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
      sleeve.position.y = 0.25;
      eraser.add(sleeve);
      
      // Brand label on sleeve (darker accent)
      const labelGeometry = new THREE.BoxGeometry(0.33, 0.15, 0.18);
      const labelMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e, // Dark blue-black
        metalness: 0.3,
        roughness: 0.6,
      });
      const label = new THREE.Mesh(labelGeometry, labelMaterial);
      label.position.y = 0.25;
      eraser.add(label);
      
      // Top cap of sleeve
      const capGeometry = new THREE.BoxGeometry(0.32, 0.05, 0.17);
      const capMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700, // Gold/yellow accent
        metalness: 0.5,
        roughness: 0.5,
      });
      const cap = new THREE.Mesh(capGeometry, capMaterial);
      cap.position.y = 0.475;
      eraser.add(cap);
      
      // Used/worn edge at bottom (darker pink showing wear)
      const wornEdgeGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.15);
      const wornEdgeMaterial = new THREE.MeshStandardMaterial({
        color: 0xe89ac7, // Darker pink
        metalness: 0.05,
        roughness: 0.9,
      });
      const wornEdge = new THREE.Mesh(wornEdgeGeometry, wornEdgeMaterial);
      wornEdge.position.y = -0.425;
      eraser.add(wornEdge);
      
      return eraser;
    };

    const createEraserBackground = () => {
      const colors = getStrokeColors();

      // Create multiple flying erasers
      for (let i = 0; i < 15; i++) {
        const eraser = createEraser();
        eraser.position.x = (Math.random() - 0.5) * 20;
        eraser.position.y = (Math.random() - 0.5) * 10;
        eraser.position.z = -8 + Math.random() * 4;
        eraser.rotation.z = Math.random() * Math.PI * 2;
        eraser.rotation.x = Math.random() * Math.PI * 2;
        eraser.scale.set(1.5, 1.5, 1.5);
        erasers.push(eraser);
        scene.add(eraser);
      }

      // Create eraser smudge marks trail effect
      for (let i = 0; i < 60; i++) {
        const points = [];
        const startX = (Math.random() - 0.5) * 25;
        const startY = (Math.random() - 0.5) * 12;
        const startZ = -6 + Math.random() * 3;
        
        // Create smudgy eraser strokes (wider, softer looking)
        const strokeLength = 8 + Math.random() * 15;
        for (let j = 0; j < strokeLength; j++) {
          points.push(
            new THREE.Vector3(
              startX + j * 0.25 + Math.sin(j * 0.4) * 0.4 + (Math.random() - 0.5) * 0.2,
              startY + Math.cos(j * 0.3) * 0.3 + (Math.random() - 0.5) * 0.2,
              startZ + (Math.random() - 0.5) * 0.08
            )
          );
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const colorChoice = Math.random();
        const color = colorChoice > 0.66 ? colors.primary : colorChoice > 0.33 ? colors.secondary : colors.tertiary;
        
        const material = new THREE.LineBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.60 + Math.random() * 0.35,
          linewidth: 3,
        });
        
        const line = new THREE.Line(geometry, material);
        lines.push(line);
        lineMaterials.push(material);
        scene.add(line);
      }

      // Add eraser rubbing patterns (circular motions)
      for (let i = 0; i < 40; i++) {
        const points = [];
        const centerX = (Math.random() - 0.5) * 25;
        const centerY = (Math.random() - 0.5) * 12;
        const centerZ = -5 + Math.random() * 2;
        
        const radius = 0.3 + Math.random() * 0.6;
        const segments = 15 + Math.floor(Math.random() * 10);
        
        for (let j = 0; j <= segments; j++) {
          const angle = (j / segments) * Math.PI * 1.5;
          points.push(
            new THREE.Vector3(
              centerX + Math.cos(angle) * radius * (0.8 + Math.random() * 0.4),
              centerY + Math.sin(angle) * radius * (0.8 + Math.random() * 0.4),
              centerZ
            )
          );
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: colors.tertiary,
          transparent: true,
          opacity: 0.08 + Math.random() * 0.18,
        });
        
        const line = new THREE.Line(geometry, material);
        lines.push(line);
        lineMaterials.push(material);
        scene.add(line);
      }
    };

    createEraserBackground();

    // Lighting - soft ambient for clean effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-5, -5, 5);
    scene.add(fillLight);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate flying erasers - they float and rotate
      erasers.forEach((eraser, index) => {
        // Floating motion
        eraser.position.y += Math.sin(Date.now() * 0.001 + index) * 0.012;
        eraser.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.01;
        
        // Rotation for dynamic look (erasers tumbling)
        eraser.rotation.x += 0.004;
        eraser.rotation.y += 0.006;
        eraser.rotation.z += 0.003;
        
        // Keep erasers in bounds
        if (eraser.position.x > 12) eraser.position.x = -12;
        if (eraser.position.x < -12) eraser.position.x = 12;
        if (eraser.position.y > 7) eraser.position.y = -7;
        if (eraser.position.y < -7) eraser.position.y = 7;
      });

      // Animate eraser marks for smudge effect
      lines.forEach((line, index) => {
        line.rotation.z += 0.0003 * (index % 2 === 0 ? 1 : -1);
        line.position.y += Math.sin(Date.now() * 0.0008 + index) * 0.0004;
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
      erasers.forEach(eraser => {
        eraser.children.forEach(child => {
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
        MOTION GRAPHICS
      </h2>
    </div>
  );
};

const VideoPortfolio: React.FC = () => {
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      <style>
        {`
        :root {
  --card-bg: #ffffff; 
  --card-text: #1a1a1a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --card-bg: #ffffffff;
    --card-text: #000000ff;
  }
}
         .video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto 80px;
}

.card {
  background: var(--card-bg);
  border-radius: 20px;
  
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}

/* 🔥 SHORT-FORM CONTAINER (9:16) */
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 160%; /* 9:16 */
  background: #000;
  overflow: hidden;
}

/* Video & iframe full coverage */
.video-container video,
.video-container iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
}          .card-content {
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
          Professional motion graphics crafted with attention to detail
        </p>
      </header>

      {/* Video Grid */}
        {/* Video Grid */}
      <div className="video-grid">
  {videos.map((video) => (
    <div className="card" key={video.id}>
      <div className="video-container">
        
          <video
           src={video.src}
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  controls
          />
       
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