import React, { useState, useEffect } from 'react';
import { logActivity } from '../utils/analytics';

const SCRIPTS_DATA = [
  // Top sector
  { lang: 'Hindi', script: 'पद्मा', x: 50, y: 22, depth: 1.1, size: '1.45rem', duration: 6.2, delay: 0.1 },
  { lang: 'Tamil', script: 'பத்மா', x: 69, y: 25, depth: 0.9, size: '1.25rem', duration: 7.5, delay: 1.2 },
  { lang: 'Japanese', script: 'パドマ', x: 65, y: 34, depth: 1.3, size: '1.2rem', duration: 5.8, delay: 2.1 },
  { lang: 'Korean', script: '파드마', x: 87, y: 31, depth: 1.0, size: '1.2rem', duration: 6.9, delay: 0.8 },
  
  // Left sector
  { lang: 'Kannada', script: 'ಪದ್ಮಾ', x: 31, y: 27, depth: 0.8, size: '1.25rem', duration: 7.1, delay: 1.6 },
  { lang: 'Telugu', script: 'పద్మ', x: 16, y: 28, depth: 1.2, size: '1.35rem', duration: 6.4, delay: 0.4 },
  { lang: 'Malayalam', script: 'പത്മ', x: 27, y: 41, depth: 1.4, size: '1.35rem', duration: 5.9, delay: 2.4 },
  { lang: 'Marathi', script: 'पद्मा', x: 12, y: 40, depth: 0.7, size: '1.3rem', duration: 6.6, delay: 1.8 },
  { lang: 'Gujarati', script: 'પદ્મા', x: 18, y: 52, depth: 1.2, size: '1.25rem', duration: 7.8, delay: 0.9 },
  { lang: 'Punjabi', script: 'ਪਦਮਾ', x: 15, y: 63, depth: 0.9, size: '1.25rem', duration: 6.1, delay: 2.7 },

  // Right sector
  { lang: 'Bengali', script: 'পদ্মা', x: 77, y: 41, depth: 1.1, size: '1.35rem', duration: 7.3, delay: 0.6 },
  { lang: 'Russian', script: 'Падма', x: 90, y: 45, depth: 0.8, size: '1.2rem', duration: 6.7, delay: 1.9 },
  { lang: 'Sanskrit', script: 'पद्मा', x: 75, y: 57, depth: 1.4, size: '1.3rem', duration: 5.6, delay: 2.2 },
  { lang: 'Odia', script: 'ପଦ୍ମା', x: 89, y: 59, depth: 1.0, size: '1.25rem', duration: 6.8, delay: 1.1 },
  { lang: 'Chinese', script: '帕德玛', x: 81, y: 73, depth: 1.3, size: '1.25rem', duration: 7.4, delay: 0.3 },
  { lang: 'Thai', script: 'ปัทมา', x: 65, y: 75, depth: 0.9, size: '1.2rem', duration: 6.3, delay: 2.5 },

  // Bottom sector
  { lang: 'Arabic', script: 'بادما', x: 14, y: 76, depth: 1.2, size: '1.35rem', duration: 7.0, delay: 1.5 },
  { lang: 'Greek', script: 'Πάντμα', x: 33, y: 74, depth: 1.0, size: '1.15rem', duration: 6.5, delay: 0.7 },
  { lang: 'Assamese', script: 'পद्मा', x: 50, y: 69, depth: 1.5, size: '1.3rem', duration: 5.7, delay: 1.7 },
  { lang: 'Hebrew', script: 'פדמה', x: 50, y: 83, depth: 1.1, size: '1.25rem', duration: 6.9, delay: 2.0 }
];

export default function ScreenConstellation({ onBack, onReplay }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hoveredLang, setHoveredLang] = useState(null);

  useEffect(() => {
    logActivity('Viewed Constellation Galaxy', 'Interacting with animated world scripts of Padma');

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (e.clientX - centerX) / centerX;
      const moveY = (e.clientY - centerY) / centerY;
      setOffset({ x: moveX * 20, y: moveY * 20 });
    };

    const handleDeviceOrientation = (e) => {
      if (e.gamma && e.beta) {
        setOffset({
          x: Math.min(20, Math.max(-20, e.gamma * 0.8)),
          y: Math.min(20, Math.max(-20, (e.beta - 45) * 0.8))
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  return (
    <div className="celestial-galaxy-canvas">
      
      {/* Top Left Minimal Back Arrow */}
      <button
        onClick={onBack}
        className="celestial-back-arrow"
        title="Go back"
        aria-label="Go back"
      >
        ←
      </button>

      {/* Top Italic Quote & Heart */}
      <div className="celestial-top-quote">
        <p className="quote-phrase">One name, a thousand ways to say it...</p>
        <button
          onClick={onReplay}
          className="top-heart-trigger heartbeat"
          title="Replay Celebration"
          aria-label="Replay Celebration"
        >
          ♥
        </button>
      </div>

      {/* Center Subtle Ambient Aura */}
      <div className="central-galaxy-halo"></div>

      {/* Floating Constellation Scripts with Continuous Organic Animation */}
      <div className="scripts-scatter-field">
        {SCRIPTS_DATA.map((item, idx) => {
          const offsetX = offset.x * item.depth;
          const offsetY = offset.y * item.depth;
          const isHovered = hoveredLang === item.lang;

          return (
            <div
              key={idx}
              className={`celestial-script-wrapper ${isHovered ? 'hovered' : ''}`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`
              }}
              onMouseEnter={() => setHoveredLang(item.lang)}
              onMouseLeave={() => setHoveredLang(null)}
            >
              <span
                className="celestial-animated-glyph"
                style={{
                  fontSize: item.size,
                  animationDuration: `${item.duration}s`,
                  animationDelay: `${item.delay}s`
                }}
              >
                {item.script}
              </span>

              {isHovered && (
                <span className="script-lang-indicator">{item.lang}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Central Luminous Focus: Padma with Underline Swash and Heart */}
      <div className="central-name-nexus">
        <h1 className="central-nexus-title">
          Padma
        </h1>

        {/* Delicate Calligraphic Gold Swash Underline with Center Heart */}
        <div className="nexus-swash-underline">
          <svg
            className="swash-svg"
            viewBox="0 0 160 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 10 C 45 13, 62 11, 70 6"
              stroke="rgba(226, 192, 141, 0.75)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M 80 4 C 77.5 1, 73.5 1, 73.5 5 C 73.5 9, 80 13, 80 13 C 80 13, 86.5 9, 86.5 5 C 86.5 1, 82.5 1, 80 4 Z"
              fill="#ffffff"
              filter="drop-shadow(0 0 6px rgba(255,255,255,0.9))"
            />
            <path
              d="M90 6 C 98 11, 115 13, 150 10"
              stroke="rgba(226, 192, 141, 0.75)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <style>{`
        .celestial-galaxy-canvas {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          background: transparent;
        }

        /* Top Left Minimal Back Arrow */
        .celestial-back-arrow {
          position: fixed;
          top: 22px;
          left: 28px;
          background: none;
          border: none;
          color: rgba(226, 192, 141, 0.75);
          font-size: 1.8rem;
          line-height: 1;
          cursor: pointer;
          z-index: 100;
          transition: transform 0.25s ease, color 0.25s ease;
          padding: 8px;
        }

        .celestial-back-arrow:hover {
          color: #ffffff;
          transform: translateX(-4px);
        }

        /* Top Quote ("One name, a thousand ways to say it...") */
        .celestial-top-quote {
          position: absolute;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-align: center;
          z-index: 20;
          pointer-events: auto;
        }

        .quote-phrase {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-size: clamp(1rem, 2.3vw, 1.25rem);
          color: rgba(226, 192, 141, 0.9);
          letter-spacing: 0.06em;
          text-shadow: 0 0 12px rgba(0, 0, 0, 0.8), 0 0 20px rgba(226, 192, 141, 0.25);
        }

        .top-heart-trigger {
          background: none;
          border: none;
          color: #ffffff;
          font-size: 0.85rem;
          cursor: pointer;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.85));
          transition: transform 0.25s ease, filter 0.25s ease;
          padding: 3px;
        }

        .top-heart-trigger:hover {
          transform: scale(1.4);
          filter: drop-shadow(0 0 14px rgba(244, 114, 182, 0.95));
        }

        /* Ambient Glowing Halo Behind Name */
        .central-galaxy-halo {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(226, 192, 141, 0.12) 0%, rgba(244, 114, 182, 0.05) 45%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 1;
        }

        /* Scattered Script Words Wrapper */
        .scripts-scatter-field {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }

        .celestial-script-wrapper {
          position: absolute;
          pointer-events: auto;
          cursor: default;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.15s ease-out;
        }

        /* Continuous Organic Animation for Each Word */
        .celestial-animated-glyph {
          display: inline-block;
          color: rgba(241, 245, 249, 0.9);
          font-family: var(--font-quote), serif;
          font-weight: 400;
          letter-spacing: 0.04em;
          animation-name: celestialFloatAndTwinkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          transition: color 0.3s ease, text-shadow 0.3s ease, transform 0.3s ease;
        }

        @keyframes celestialFloatAndTwinkle {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.72;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.25), 0 0 18px rgba(226, 192, 141, 0.15);
          }
          35% {
            transform: translateY(-8px) rotate(0.6deg);
            opacity: 0.98;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.85), 0 0 32px rgba(226, 192, 141, 0.5);
          }
          70% {
            transform: translateY(5px) rotate(-0.5deg);
            opacity: 0.82;
            text-shadow: 0 0 14px rgba(255, 255, 255, 0.35), 0 0 24px rgba(226, 192, 141, 0.25);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.72;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.25), 0 0 18px rgba(226, 192, 141, 0.15);
          }
        }

        .celestial-script-wrapper:hover .celestial-animated-glyph,
        .celestial-script-wrapper.hovered .celestial-animated-glyph {
          color: #ffffff;
          transform: scale(1.22) translateY(-4px) !important;
          opacity: 1 !important;
          text-shadow: 
            0 0 22px rgba(255, 255, 255, 1),
            0 0 40px rgba(226, 192, 141, 0.85) !important;
          z-index: 50;
        }

        .script-lang-indicator {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          color: var(--gold-light);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.9;
          margin-top: 2px;
          position: absolute;
          bottom: -16px;
          white-space: nowrap;
          pointer-events: none;
          animation: fadeInScreen 0.2s ease;
        }

        /* Central Nexus Title (Padma) with Breathing Pulse */
        .central-name-nexus {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          pointer-events: none;
        }

        .central-nexus-title {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-weight: 500;
          font-size: clamp(3.8rem, 8.5vw, 6.8rem);
          line-height: 1.05;
          color: #ffffff;
          letter-spacing: 0.02em;
          animation: centralPadmaBreath 8s ease-in-out infinite;
          margin-bottom: 2px;
        }

        @keyframes centralPadmaBreath {
          0%, 100% {
            transform: scale(1);
            text-shadow: 
              0 0 32px rgba(255, 255, 255, 0.45),
              0 0 60px rgba(226, 192, 141, 0.35);
          }
          50% {
            transform: scale(1.035);
            text-shadow: 
              0 0 45px rgba(255, 255, 255, 0.75),
              0 0 85px rgba(226, 192, 141, 0.55);
          }
        }

        /* Swash underline with centered heart */
        .nexus-swash-underline {
          width: 160px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -2px;
        }

        .swash-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        @media (max-width: 768px) {
          .celestial-animated-glyph {
            font-size: 1rem !important;
          }
          .central-nexus-title {
            font-size: 3.5rem;
          }
          .celestial-back-arrow {
            top: 16px;
            left: 16px;
          }
          .celestial-top-quote {
            top: 16px;
          }
        }
      `}</style>
    </div>
  );
}
