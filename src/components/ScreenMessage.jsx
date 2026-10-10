import React from 'react';
import { ArrowLeft, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { logActivity } from '../utils/analytics';

export default function ScreenMessage({ onBack, onNext, onOpenSecretAnalytics }) {
  const handleHeartClick = () => {
    logActivity('Secret Heart Triggered', 'Visitor clicked secret ♥ in signature on Screen 4');
    onOpenSecretAnalytics();
  };

  // Sparkle floating icons
  const sparkles = [
    { text: '✦', top: '15%', left: '8%', delay: '0s', size: '1.4rem' },
    { text: '✧', top: '25%', right: '12%', delay: '1.2s', size: '1.1rem' },
    { text: '✦', top: '75%', left: '10%', delay: '2.5s', size: '1.6rem' },
    { text: '✧', top: '82%', right: '15%', delay: '0.8s', size: '1.3rem' },
    { text: '✦', top: '45%', right: '6%', delay: '1.8s', size: '1.5rem' },
    { text: '✧', top: '60%', left: '6%', delay: '3.1s', size: '1.2rem' },
  ];

  return (
    <div className="screen-container message-screen">

      {/* Full-Screen Luminous Watermark Background Portrait */}
      <div className="watermark-background-layer">
        <img
          src="/padma.png"
          alt="Watermark Portrait"
          className="watermark-image"
        />
        <div className="watermark-overlay-gradient"></div>
      </div>

      {/* Floating Golden Dust Sparkle Icons */}
      <div className="floating-sparkles-container">
        {sparkles.map((sp, idx) => (
          <span
            key={idx}
            className="floating-sparkle-glyph float-slow"
            style={{
              top: sp.top,
              left: sp.left,
              right: sp.right,
              animationDelay: sp.delay,
              fontSize: sp.size
            }}
          >
            {sp.text}
          </span>
        ))}
      </div>

      {/* Heartfelt Message Glassmorphism Container */}
      <div className="message-content-wrapper">

        <div className="message-header-pill">
          <Sparkles size={14} className="pill-sparkle" />
          <span>From The Depths of The Heart</span>
        </div>

        <div className="glass-panel letter-card">
          <div className="letter-header-decor">
            <span className="decor-line"></span>
            <Heart size={18} fill="#f472b6" color="#f472b6" className="heartbeat" />
            <span className="decor-line"></span>
          </div>

          <div className="letter-paragraphs">
            <p className="letter-line first-line">
              You have no idea how much you mean to me.
            </p>

            <p className="letter-line poetic-quote-line">
              “It's strange how two people can be living completely different days, while one of them is quietly carrying the other through every hour.”
            </p>

            <p className="letter-line wishing-line">
              Apart from all this, stay happy, stay blessed, and stay wealthy. You deserve all the good things life has to offer. Once again, wishing you the happiest birthday. <span className="inline-gold-heart">♥</span>
            </p>
          </div>

          {/* Emotional Sign-off with Secret Heart Trigger */}
          <div className="letter-sign-off">
            <div className="sign-off-block">
              <div className="sign-off-heading">
                <span className="sign-off-text">Always in my thoughts</span>
                <button
                  id="secret-analytics-heart-trigger"
                  onClick={handleHeartClick}
                  className="secret-heart-btn"
                  title="A quiet secret..."
                  aria-label="Secret Analytics Trigger"
                >
                  <Heart size={20} fill="#f472b6" color="#f472b6" className="secret-heart-icon heartbeat" />
                </button>
              </div>
              <span className="sign-off-date">29-04-2025</span>
            </div>
          </div>

        </div>

        {/* Navigation Buttons */}
        <div className="screen-nav-buttons">
          <button
            id="message-back-button"
            onClick={onBack}
            className="btn-ghost-gold"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <button
            id="message-next-button"
            onClick={onNext}
            className="btn-gold"
          >
            <span>Next</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

      <style>{`
        .message-screen {
          position: relative;
          min-height: 100vh;
          max-width: 860px;
          margin: 0 auto;
        }

        /* Fullscreen Luminous Watermark */
        .watermark-background-layer {
          position: fixed;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }

        .watermark-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          opacity: 0.16;
          filter: blur(1.5px) contrast(1.15) brightness(0.9);
          transform: scale(1.05);
          animation: floatSlow 14s ease-in-out infinite alternate;
        }

        .watermark-overlay-gradient {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at center, transparent 30%, rgba(5, 8, 17, 0.85) 85%),
            linear-gradient(to bottom, rgba(5, 8, 17, 0.7) 0%, rgba(5, 8, 17, 0.95) 100%);
        }

        /* Sparkle Icons */
        .floating-sparkles-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .floating-sparkle-glyph {
          position: absolute;
          color: var(--gold-light);
          opacity: 0.5;
          filter: drop-shadow(0 0 10px var(--gold-glow));
        }

        .message-content-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 5;
        }

        .message-header-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          background: rgba(226, 192, 141, 0.1);
          border: 1px solid rgba(226, 192, 141, 0.28);
          border-radius: 999px;
          font-family: var(--font-serif);
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-light);
          margin-bottom: 24px;
        }

        .pill-sparkle {
          color: var(--gold-primary);
        }

        /* Letter Card */
        .letter-card {
          width: 100%;
          padding: 48px 42px;
          background: rgba(10, 15, 30, 0.78);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(226, 192, 141, 0.32);
          box-shadow: 
            0 30px 60px -15px rgba(0, 0, 0, 0.85),
            0 0 40px rgba(226, 192, 141, 0.2);
          position: relative;
        }

        .letter-header-decor {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 32px;
        }

        .decor-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(226, 192, 141, 0.6), transparent);
        }

        .letter-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 22px;
          text-align: left;
        }

        .letter-line {
          font-family: var(--font-quote);
          font-size: clamp(1.15rem, 2.4vw, 1.45rem);
          font-weight: 400;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .first-line {
          font-style: italic;
          color: var(--gold-light);
          font-size: clamp(1.25rem, 2.7vw, 1.65rem);
        }

        .highlight-line {
          color: #ffffff;
          padding-left: 14px;
          border-left: 2px solid rgba(226, 192, 141, 0.5);
        }

        .wishing-line {
          color: var(--gold-light);
        }

        .poetic-quote-line {
          font-style: italic;
          color: #f8fafc;
          padding-left: 14px;
          border-left: 2px solid rgba(226, 192, 141, 0.45);
          line-height: 1.65;
        }

        .inline-gold-heart {
          color: var(--rose-primary);
        }

        /* Emotional Sign-off */
        .letter-sign-off {
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid rgba(226, 192, 141, 0.2);
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .sign-off-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
        }

        .sign-off-heading {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sign-off-text {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          letter-spacing: 0.12em;
          color: var(--gold-light);
        }

        .sign-off-date {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: 1.05rem;
          letter-spacing: 0.14em;
          color: rgba(226, 192, 141, 0.85);
          font-weight: 500;
        }

        .secret-heart-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
          outline: none;
        }

        .secret-heart-btn:hover {
          transform: scale(1.35);
        }

        .secret-heart-icon {
          filter: drop-shadow(0 0 10px var(--rose-glow));
        }

        .screen-nav-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 36px;
        }

        @media (max-width: 640px) {
          .letter-card {
            padding: 32px 22px;
          }
          .letter-sign-off {
            justify-content: center;
          }
          .sign-off-block {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
