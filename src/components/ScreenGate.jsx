import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight } from 'lucide-react';
import { logActivity } from '../utils/analytics';

export default function ScreenGate({ onUnlock }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();

    if (cleanName.toLowerCase() === 'padma') {
      setError('');
      setIsShaking(false);
      setIsExiting(true);
      logActivity('Gate Unlocked', `Verified successfully as "${cleanName}"`);

      // Soft champagne gold & rose canvas-confetti burst
      const luxuryColors = ['#f5e4c3', '#e2c08d', '#f472b6', '#fda4af', '#ffffff', '#ffd700'];
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.55 },
        colors: luxuryColors,
        ticks: 250,
        gravity: 0.8,
        scalar: 1.15,
        shapes: ['circle', 'square']
      });

      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 60,
          origin: { x: 0.25, y: 0.65 },
          colors: luxuryColors,
        });
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 60,
          origin: { x: 0.75, y: 0.65 },
          colors: luxuryColors,
        });
      }, 180);

      // 650ms smooth exit transition
      setTimeout(() => {
        onUnlock(cleanName);
      }, 650);
    } else {
      setError('Sorry, this celebration is not for you ✨');
      setIsShaking(true);
      logActivity('Gate Access Denied', `Entered name "${cleanName || 'empty'}"`);
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  return (
    <div className={`screen-container gate-screen ${isExiting ? 'exit-transition' : ''}`}>
      <div className={`glass-panel gate-card ${isShaking ? 'shake-effect' : ''}`}>
        
        {/* Decorative Top Crest */}
        <div className="crest-badge">
          <Sparkles className="crest-icon pulse-glow" size={26} />
        </div>

        <p className="gate-eyebrow">A Special Celebration</p>
        <h1 className="gate-title">
          Before we begin... <br />
          <span className="gold-gradient-text">Tell me your name</span>
        </h1>

        <p className="gate-subtitle">
          An intimate, cinematic experience curated exclusively for someone truly rare.
        </p>

        <form onSubmit={handleSubmit} className="gate-form">
          <div className="input-field-wrapper">
            <input
              id="visitor-name-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter your name..."
              className="gate-input"
              autoFocus
              autoComplete="off"
            />
          </div>

          {error && (
            <div className="gate-error-message">
              <span>{error}</span>
            </div>
          )}

          <button
            id="gate-open-button"
            type="submit"
            className="btn-gold gate-submit-btn"
          >
            <span>Open</span>
            <ArrowRight size={20} />
          </button>
        </form>

      </div>

      <style>{`
        .gate-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .exit-transition {
          opacity: 0;
          transform: scale(1.04) translateY(-15px);
          pointer-events: none;
        }

        .gate-card {
          width: 100%;
          max-width: 530px;
          padding: 48px 40px;
          text-align: center;
          position: relative;
          background: rgba(10, 15, 29, 0.74);
          border: 1px solid rgba(226, 192, 141, 0.32);
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.85),
            0 0 35px -5px rgba(226, 192, 141, 0.28);
          border-radius: 26px;
        }

        .crest-badge {
          width: 58px;
          height: 58px;
          margin: 0 auto 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(226, 192, 141, 0.16), rgba(244, 114, 182, 0.12));
          border: 1px solid rgba(226, 192, 141, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(226, 192, 141, 0.3);
        }

        .crest-icon {
          color: var(--gold-light);
        }

        .gate-eyebrow {
          font-family: var(--font-serif);
          font-size: 0.82rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold-primary);
          margin-bottom: 8px;
        }

        .gate-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 4.5vw, 2.2rem);
          font-weight: 700;
          line-height: 1.32;
          margin-bottom: 14px;
          color: var(--text-main);
        }

        .gate-subtitle {
          font-family: var(--font-quote);
          font-size: 1.15rem;
          font-style: italic;
          color: var(--text-muted);
          margin-bottom: 32px;
          line-height: 1.5;
        }

        .gate-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .input-field-wrapper {
          position: relative;
          width: 100%;
        }

        /* Spacious Luxury Input Box */
        .gate-input {
          width: 100%;
          height: 64px;
          padding: 16px 28px;
          background: rgba(6, 10, 22, 0.78);
          border: 1.5px solid rgba(226, 192, 141, 0.35);
          border-radius: 999px;
          color: #ffffff;
          font-family: var(--font-sans);
          font-size: 1.25rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-align: center;
          outline: none;
          transition: var(--transition-smooth);
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.6);
        }

        .gate-input:focus {
          border-color: var(--gold-light);
          background: rgba(8, 14, 30, 0.9);
          box-shadow: 
            0 0 25px rgba(226, 192, 141, 0.5), 
            inset 0 0 12px rgba(226, 192, 141, 0.15);
        }

        .gate-input::placeholder {
          color: rgba(148, 163, 184, 0.5);
          font-size: 1.1rem;
          letter-spacing: 0.04em;
        }

        .gate-error-message {
          font-family: var(--font-sans);
          font-size: 0.92rem;
          color: #fb7185;
          background: rgba(244, 63, 94, 0.12);
          border: 1px solid rgba(244, 63, 94, 0.35);
          border-radius: 999px;
          padding: 10px 18px;
          animation: fadeInScreen 0.3s ease;
        }

        .gate-submit-btn {
          width: 100%;
          height: 58px;
          font-size: 1.05rem;
          letter-spacing: 0.15em;
          margin-top: 4px;
        }

        @media (max-width: 520px) {
          .gate-card {
            padding: 36px 24px;
          }
          .gate-input {
            height: 56px;
            font-size: 1.1rem;
            padding: 12px 20px;
          }
          .gate-submit-btn {
            height: 52px;
          }
        }
      `}</style>
    </div>
  );
}
