// src/components/NotFoundPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import gifAnimation from './four.gif'; // ✅ your GIF file

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#0d1117',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      {/* 🌀 Your small GIF animation */}
      <img
        src={gifAnimation}
        alt="Funny 404 animation"
        style={{
          width: '220px',
          height: 'auto',
          marginBottom: '2rem',
          borderRadius: '10px',
        }}
      />

      {/* 🔢 404 Title */}
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>

      {/* 🧾 Message */}
      <p style={{ fontSize: '1.70rem', marginBottom: '2rem', maxWidth: '800px' }}>
        Looks like this cut didn’t make the final edit 🎬
      </p>

      {/* 🔙 Back button */}
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: '#58a6ff',
          color: '#fff',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        ⬅️ Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
