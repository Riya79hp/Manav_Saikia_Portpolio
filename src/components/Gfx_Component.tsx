import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import img1 from "../asset_images_manav/gfx_images/img1.png";
import img2 from "../asset_images_manav/gfx_images/img2.png";
import img3 from "../asset_images_manav/gfx_images/img3.jpg";
import img4 from "../asset_images_manav/gfx_images/img4.jpg";
import Footer from "./Footer";
type Photo = {
  id: number;
  title: string;
  src: string;
};

const photos: Photo[] = [
  { id: 1, title: "YouTube Banner", src: img1 },
  { id: 2, title: "Youtube Thumbnail", src: img2 },
  { id: 3, title: "Marketing Creative", src: img4 },
  { id: 4, title: "Poster Design", src: img3 },
   
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

    // Create design lines and flying clipboards
    const lines: THREE.Line[] = [];
    const clipboards: THREE.Group[] = [];
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

    const createClipboard = () => {
      const clipboard = new THREE.Group();
      
      // Main clipboard board (vibrant color visible in both modes)
      const boardGeometry = new THREE.BoxGeometry(0.6, 0.9, 0.03);
      const boardMaterial = new THREE.MeshStandardMaterial({
        color: 0xff6b35, // Vibrant orange
        metalness: 0.2,
        roughness: 0.7,
      });
      const board = new THREE.Mesh(boardGeometry, boardMaterial);
      clipboard.add(board);
      
      // Paper/document on clipboard (white with slight glow)
      const paperGeometry = new THREE.BoxGeometry(0.52, 0.75, 0.02);
      const paperMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.8,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.15,
      });
      const paper = new THREE.Mesh(paperGeometry, paperMaterial);
      paper.position.z = 0.025;
      paper.position.y = -0.05;
      clipboard.add(paper);
      
      // Top clip (metal - chrome/silver)
      const clipBaseGeometry = new THREE.BoxGeometry(0.3, 0.08, 0.04);
      const clipMaterial = new THREE.MeshStandardMaterial({
        color: 0xe5e7eb,
        metalness: 1,
        roughness: 0.15,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.17,
      });
      const clipBase = new THREE.Mesh(clipBaseGeometry, clipMaterial);
      clipBase.position.y = 0.47;
      clipBase.position.z = 0.04;
      clipboard.add(clipBase);
      
      // Clip spring mechanism (two curved parts)
      const springGeometry = new THREE.TorusGeometry(0.05, 0.015, 8, 16, Math.PI);
      const springMaterial = new THREE.MeshStandardMaterial({
        color: 0xc0c0c0,
        metalness: 0.9,
        roughness: 0.2,
      });
      
      const leftSpring = new THREE.Mesh(springGeometry, springMaterial);
      leftSpring.position.set(-0.08, 0.47, 0.06);
      leftSpring.rotation.x = -Math.PI / 2;
      clipboard.add(leftSpring);
      
      const rightSpring = new THREE.Mesh(springGeometry, springMaterial);
      rightSpring.position.set(0.08, 0.47, 0.06);
      rightSpring.rotation.x = -Math.PI / 2;
      clipboard.add(rightSpring);
      
      // Paper lines (simulating text/content)
      const lineGeometry = new THREE.BoxGeometry(0.4, 0.015, 0.001);
      const lineMaterial = new THREE.MeshStandardMaterial({
        color: 0x4f46e5, // Indigo
        metalness: 0,
        roughness: 1,
      });
      
      for (let i = 0; i < 8; i++) {
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.set(0, 0.25 - i * 0.08, 0.035);
        clipboard.add(line);
      }
      
      // Checkboxes on paper (cyan/teal accent)
      const checkboxGeometry = new THREE.BoxGeometry(0.04, 0.04, 0.001);
      const checkboxMaterial = new THREE.MeshStandardMaterial({
        color: 0x00d9ff, // Cyan
        metalness: 0.2,
        roughness: 0.8,
      });
      
      for (let i = 0; i < 4; i++) {
        const checkbox = new THREE.Mesh(checkboxGeometry, checkboxMaterial);
        checkbox.position.set(-0.2, 0.25 - i * 0.16, 0.035);
        clipboard.add(checkbox);
      }
      
      // Corner accent (gold/yellow)
      const cornerGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.02);
      const cornerMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700, // Gold
        metalness: 0.7,
        roughness: 0.3,
      });
      const topLeftCorner = new THREE.Mesh(cornerGeometry, cornerMaterial);
      topLeftCorner.position.set(-0.26, 0.41, 0.01);
      clipboard.add(topLeftCorner);
      
      const topRightCorner = new THREE.Mesh(cornerGeometry, cornerMaterial);
      topRightCorner.position.set(0.26, 0.41, 0.01);
      clipboard.add(topRightCorner);
      
      return clipboard;
    };

    const createClipboardBackground = () => {
      const colors = getStrokeColors();

      // Create multiple flying clipboards
      for (let i = 0; i < 15; i++) {
        const clipboard = createClipboard();
        clipboard.position.x = (Math.random() - 0.5) * 20;
        clipboard.position.y = (Math.random() - 0.5) * 10;
        clipboard.position.z = -8 + Math.random() * 4;
        clipboard.rotation.z = (Math.random() - 0.5) * 0.5;
        clipboard.scale.set(1.2, 1.2, 1.2);
        clipboards.push(clipboard);
        scene.add(clipboard);
      }

      // Create design/planning lines (like sketches/drafts)
      for (let i = 0; i < 60; i++) {
        const points = [];
        const startX = (Math.random() - 0.5) * 25;
        const startY = (Math.random() - 0.5) * 12;
        const startZ = -6 + Math.random() * 3;
        
        // Create design guide lines
        const strokeLength = 10 + Math.random() * 20;
        const angle = Math.random() * Math.PI * 2;
        
        for (let j = 0; j < strokeLength; j++) {
          points.push(
            new THREE.Vector3(
              startX + Math.cos(angle) * j * 0.25 + (Math.random() - 0.5) * 0.1,
              startY + Math.sin(angle) * j * 0.25 + (Math.random() - 0.5) * 0.1,
              startZ + (Math.random() - 0.5) * 0.05
            )
          );
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const colorChoice = Math.random();
        const color = colorChoice > 0.66 ? colors.primary : colorChoice > 0.33 ? colors.secondary : colors.tertiary;
        
        const material = new THREE.LineBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.2 + Math.random() * 0.3,
          linewidth: 2,
        });
        
        const line = new THREE.Line(geometry, material);
        lines.push(line);
        lineMaterials.push(material);
        scene.add(line);
      }

      // Add grid lines (design layout guides)
      for (let i = 0; i < 40; i++) {
        const points = [];
        const startX = (Math.random() - 0.5) * 25;
        const startY = (Math.random() - 0.5) * 12;
        const startZ = -5 + Math.random() * 2;
        
        const isHorizontal = Math.random() > 0.5;
        const length = 3 + Math.random() * 6;
        
        for (let j = 0; j < length; j++) {
          points.push(
            new THREE.Vector3(
              isHorizontal ? startX + j * 0.4 : startX,
              isHorizontal ? startY : startY + j * 0.4,
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

      // Add task completion checkmarks
      for (let i = 0; i < 30; i++) {
        const points = [];
        const centerX = (Math.random() - 0.5) * 25;
        const centerY = (Math.random() - 0.5) * 12;
        const centerZ = -5 + Math.random() * 2;
        
        // Create checkmark shape
        points.push(new THREE.Vector3(centerX - 0.1, centerY, centerZ));
        points.push(new THREE.Vector3(centerX, centerY - 0.15, centerZ));
        points.push(new THREE.Vector3(centerX + 0.2, centerY + 0.2, centerZ));
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: colors.primary,
          transparent: true,
          opacity: 0.15 + Math.random() * 0.25,
          linewidth: 3,
        });
        
        const line = new THREE.Line(geometry, material);
        lines.push(line);
        lineMaterials.push(material);
        scene.add(line);
      }
    };

    createClipboardBackground();

    // Lighting - balanced for visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
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

      // Animate flying clipboards - they float and rotate gently
      clipboards.forEach((clipboard, index) => {
        // Gentle floating motion
        clipboard.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        clipboard.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.008;
        
        // Subtle rotation
        clipboard.rotation.x += 0.002;
        clipboard.rotation.y += 0.003;
        clipboard.rotation.z += 0.001;
        
        // Keep clipboards in bounds
        if (clipboard.position.x > 12) clipboard.position.x = -12;
        if (clipboard.position.x < -12) clipboard.position.x = 12;
        if (clipboard.position.y > 7) clipboard.position.y = -7;
        if (clipboard.position.y < -7) clipboard.position.y = 7;
      });

      // Animate design lines
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
      clipboards.forEach(clipboard => {
        clipboard.children.forEach(child => {
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
        GFX
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
    --card-bg: #ffffff;
    --card-text: #000000;
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
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
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
            padding-bottom: 70%;
            background: #000;
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
          Professional graphic design crafted with attention to detail
        </p>
      </header>

      {/* Video Grid */}
      {/* GFX Photo Grid */}
<div className="video-grid">
  {photos.map((photo) => (
    <div className="card" key={photo.id}>
      <div className="video-container">
        <img
          src={photo.src}
          alt={photo.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "transform 0.4s ease",
          }}
        />
      </div>

      <div className="card-content">
        <h3 className="video-title">{photo.title}</h3>
        
      </div>
    </div>
  ))}
</div>


      {/* Footer CTA */}
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