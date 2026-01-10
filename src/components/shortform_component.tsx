import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import vid1 from "../asset_images_manav/short_form_videos/vid1.mp4";
import vid2 from "../asset_images_manav/short_form_videos/vid2.mp4";
import vid3 from "../asset_images_manav/short_form_videos/vid3.mp4";
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
    src: vid3,
  },
  {
    id: 2,
    title: "Travel Vlog – Cinematic Edit",
    description: "Long-form travel vlog with color grading & sound design.",
    src: vid1,
  },
  {
    id: 3,
    title: "Documentary Style Interview",
    description: "Story-driven interview edit with B-roll layering.",
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

    // Create cutting lines and flying scissors
    const lines: THREE.Line[] = [];
    const scissors: THREE.Group[] = [];
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

    const createScissors = () => {
      const scissors = new THREE.Group();
      
      // Left blade
      const leftBladeGeometry = new THREE.BoxGeometry(0.05, 0.8, 0.02);
      const bladeMaterial = new THREE.MeshStandardMaterial({
  color: 0xe5e7eb,          // one color only
  metalness: 1,
  roughness: 0.15,

  // 🔥 makes it visible even on black
  emissive: new THREE.Color(0xffffff),
  emissiveIntensity: 0.17,
});
      const leftBlade = new THREE.Mesh(leftBladeGeometry, bladeMaterial);
      leftBlade.position.set(-0.08, -0.3, 0);
      leftBlade.rotation.z = -0.15;
      scissors.add(leftBlade);
      
      // Right blade
      const rightBlade = new THREE.Mesh(leftBladeGeometry, bladeMaterial);
      rightBlade.position.set(0.08, -0.3, 0);
      rightBlade.rotation.z = 0.15;
      scissors.add(rightBlade);
      
      // Sharp tips (darker)
      const tipMaterial = new THREE.MeshStandardMaterial({
        color: 0x808080,
        metalness: 0.95,
        roughness: 0.05,
      });
      
      const leftTipGeometry = new THREE.ConeGeometry(0.025, 0.15, 4);
      const leftTip = new THREE.Mesh(leftTipGeometry, tipMaterial);
      leftTip.position.set(-0.12, -0.72, 0);
      leftTip.rotation.z = Math.PI;
      scissors.add(leftTip);
      
      const rightTip = new THREE.Mesh(leftTipGeometry, tipMaterial);
      rightTip.position.set(0.12, -0.72, 0);
      rightTip.rotation.z = Math.PI;
      scissors.add(rightTip);
      
      // Center screw/pivot (gold accent)
      const screwGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.05, 16);
      const screwMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700, // Gold
        metalness: 0.8,
        roughness: 0.2,
      });
      const screw = new THREE.Mesh(screwGeometry, screwMaterial);
      screw.rotation.x = Math.PI / 2;
      screw.position.y = 0.1;
      scissors.add(screw);
      
      // Left handle (vibrant red - visible in both modes)
      const handleGeometry = new THREE.TorusGeometry(0.15, 0.04, 8, 16);
      const leftHandleMaterial = new THREE.MeshStandardMaterial({
        color: 0xff4444, // Vibrant red
        metalness: 0.3,
        roughness: 0.6,
      });
      const leftHandle = new THREE.Mesh(handleGeometry, leftHandleMaterial);
      leftHandle.position.set(-0.12, 0.35, 0);
      scissors.add(leftHandle);
      
      // Right handle (vibrant orange - visible in both modes)
      const rightHandleMaterial = new THREE.MeshStandardMaterial({
        color: 0xff8800, // Vibrant orange
        metalness: 0.3,
        roughness: 0.6,
      });
      const rightHandle = new THREE.Mesh(handleGeometry, rightHandleMaterial);
      rightHandle.position.set(0.12, 0.35, 0);
      scissors.add(rightHandle);
      
      // Handle grips (rubber texture - cyan accent)
      const gripGeometry = new THREE.TorusGeometry(0.15, 0.02, 8, 16);
      const gripMaterial = new THREE.MeshStandardMaterial({
        color: 0x00d9ff, // Cyan
        metalness: 0.1,
        roughness: 0.9,
      });
      
      const leftGrip = new THREE.Mesh(gripGeometry, gripMaterial);
      leftGrip.position.set(-0.12, 0.35, 0.01);
      scissors.add(leftGrip);
      
      const rightGrip = new THREE.Mesh(gripGeometry, gripMaterial);
      rightGrip.position.set(0.12, 0.35, 0.01);
      scissors.add(rightGrip);
      
      return scissors;
    };

    const createScissorsBackground = () => {
      const colors = getStrokeColors();

      // Create multiple flying scissors
      for (let i = 0; i < 15; i++) {
        const scissor = createScissors();
        scissor.position.x = (Math.random() - 0.5) * 20;
        scissor.position.y = (Math.random() - 0.5) * 10;
        scissor.position.z = -8 + Math.random() * 4;
        scissor.rotation.z = Math.random() * Math.PI * 2;
        scissor.scale.set(1.4, 1.4, 1.4);
        scissors.push(scissor);
        scene.add(scissor);
      }

      // Create cutting line marks (straight cuts)
      for (let i = 0; i < 60; i++) {
        const points = [];
        const startX = (Math.random() - 0.5) * 25;
        const startY = (Math.random() - 0.5) * 12;
        const startZ = -6 + Math.random() * 3;
        
        // Create sharp, clean cut lines
        const strokeLength = 8 + Math.random() * 18;
        const angle = Math.random() * Math.PI * 2;
        
        for (let j = 0; j < strokeLength; j++) {
          points.push(
            new THREE.Vector3(
              startX + Math.cos(angle) * j * 0.3,
              startY + Math.sin(angle) * j * 0.3,
              startZ + (Math.random() - 0.5) * 0.03
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
          linewidth: 2,
        });
        
        const line = new THREE.Line(geometry, material);
        lines.push(line);
        lineMaterials.push(material);
        scene.add(line);
      }

      // Add zigzag cutting patterns
      for (let i = 0; i < 40; i++) {
        const points = [];
        const startX = (Math.random() - 0.5) * 25;
        const startY = (Math.random() - 0.5) * 12;
        const startZ = -5 + Math.random() * 2;
        
        const length = 6 + Math.random() * 10;
        const zigzagSize = 0.2 + Math.random() * 0.3;
        
        for (let j = 0; j < length; j++) {
          const zigzag = j % 2 === 0 ? zigzagSize : -zigzagSize;
          points.push(
            new THREE.Vector3(
              startX + j * 0.3,
              startY + zigzag,
              startZ
            )
          );
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: colors.tertiary,
          transparent: true,
          opacity: 0.12 + Math.random() * 0.2,
        });
        
        const line = new THREE.Line(geometry, material);
        lines.push(line);
        lineMaterials.push(material);
        scene.add(line);
      }

      // Add dashed cut lines
      for (let i = 0; i < 30; i++) {
        const dashLength = 0.2;
        const gapLength = 0.15;
        const totalDashes = 8 + Math.floor(Math.random() * 12);
        
        const startX = (Math.random() - 0.5) * 25;
        const startY = (Math.random() - 0.5) * 12;
        const startZ = -5 + Math.random() * 2;
        const angle = Math.random() * Math.PI * 2;
        
        for (let j = 0; j < totalDashes; j++) {
          const points = [];
          const dashStart = j * (dashLength + gapLength);
          
          points.push(
            new THREE.Vector3(
              startX + Math.cos(angle) * dashStart,
              startY + Math.sin(angle) * dashStart,
              startZ
            )
          );
          points.push(
            new THREE.Vector3(
              startX + Math.cos(angle) * (dashStart + dashLength),
              startY + Math.sin(angle) * (dashStart + dashLength),
              startZ
            )
          );
          
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: colors.primary,
            transparent: true,
            opacity: 0.15 + Math.random() * 0.2,
          });
          
          const line = new THREE.Line(geometry, material);
          lines.push(line);
          lineMaterials.push(material);
          scene.add(line);
        }
      }
    };

    createScissorsBackground();

    // Lighting - bright for metallic scissors
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, -5, 5);
    scene.add(fillLight);

    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate flying scissors - they float and rotate with opening/closing motion
      scissors.forEach((scissor, index) => {
        // Floating motion
        scissor.position.y += Math.sin(Date.now() * 0.001 + index) * 0.012;
        scissor.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.01;
        
        // Rotation for dynamic look
        scissor.rotation.x += 0.003;
        scissor.rotation.y += 0.004;
        scissor.rotation.z += 0.006;
        
        // Keep scissors in bounds
        if (scissor.position.x > 12) scissor.position.x = -12;
        if (scissor.position.x < -12) scissor.position.x = 12;
        if (scissor.position.y > 7) scissor.position.y = -7;
        if (scissor.position.y < -7) scissor.position.y = 7;
      });

      // Animate cut lines for cutting effect
      lines.forEach((line, index) => {
        line.rotation.z += 0.0002 * (index % 2 === 0 ? 1 : -1);
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
      scissors.forEach(scissor => {
        scissor.children.forEach(child => {
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
        SHORT FORM VIDEOS
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
  padding-bottom: 177.78%; /* 9:16 */
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
          Professional short-form video edits crafted with attention to detail
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