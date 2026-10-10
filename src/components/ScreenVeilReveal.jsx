import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Music, Lock, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { logActivity } from '../utils/analytics';

export default function ScreenVeilReveal({ onBack, onNext, onEnsureAudio }) {
  const [secondsLeft, setSecondsLeft] = useState(11);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    logActivity('Entered Suspense Page', '11s countdown veil started');
    if (onEnsureAudio) onEnsureAudio();

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleReveal();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
    logActivity('Photo Revealed', 'Image smoothly emerged from black');

    // Celebration gold & rose sparkle burst on reveal
    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#f5e4c3', '#e2c08d', '#fda4af', '#ffffff'],
      ticks: 220,
      gravity: 0.8
    });
  };

  const progressPercentage = ((11 - secondsLeft) / 11) * 100;

  return (
    <div
      className="screen-container veil-screen"
      onClick={onEnsureAudio}
      onTouchStart={onEnsureAudio}
    >
      <div className="veil-content-wrapper">

        {/* Cinematic Portrait Box - Fits Image Exactly with Intrinsic Aspect Ratio */}
        <div className={`cinematic-portrait-frame ${isRevealed ? 'revealed' : 'veiled'}`}>
          
          {/* Main Full Image fitted flush into the box */}
          <img
            src="/padma.png"
            alt="Dearest Padma"
            className={`portrait-full-img ${isRevealed ? 'image-revealed' : 'image-hidden'}`}
          />

          {/* Golden perimeter frame border */}
          <div className="portrait-gold-border"></div>

          {/* Pure Pitch-Black Mystery Veil Overlay (reveals from black to image) */}
          <div className={`pitch-black-veil ${isRevealed ? 'veil-dissolved' : 'veil-active'}`}>
            <div className="veil-timer-box glass-panel">
              <div className="veil-icon-wrapper pulse-glow">
                <Lock size={22} className="veil-lock-icon" />
              </div>

              <h2 className="veil-timer-title">
                Please wait <span className="gold-gradient-text">{secondsLeft}</span> seconds to see the picture ✨
              </h2>

              {/* Progress bar */}
              <div className="veil-progress-track">
                <div
                  className="veil-progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <div className="veil-music-hint">
                <Music size={15} className="hint-music-icon heartbeat" />
                <span>Listen closely to the music... 🎵</span>
              </div>
            </div>
          </div>

        </div>

        {/* Best wishes from Vinod❤️ & Signature */}
        <div className={`quote-card-container ${isRevealed ? 'visible' : 'veiled-quote'}`}>
          <div className="the-wishes-text">
            <span>Best wishes from Vinod</span>
            <span className="wishes-heart heartbeat">❤️</span>
          </div>

          <div className="the-signature">
            <span className="sig-line"></span>
            <span className="sig-text">
              — FROM THE ONE WHO KEEPS CHOOSING YOU, <strong className="vinod-name">VINOD</strong>
              <Heart size={15} className="inline-heart heartbeat" fill="#f472b6" color="#f472b6" />
            </span>
            <span className="sig-line"></span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="screen-nav-buttons">
          <button
            id="veil-back-button"
            onClick={onBack}
            className="btn-ghost-gold"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <button
            id="veil-next-button"
            onClick={onNext}
            className="btn-gold"
          >
            <span>Next</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

      <style>{`
        .veil-screen {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .veil-content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        /* Cinematic Portrait Frame - Matched Exactly to Image Aspect Ratio */
        .cinematic-portrait-frame {
          position: relative;
          width: auto;
          max-width: min(380px, 88vw);
          height: min(65vh, 600px);
          aspect-ratio: 862 / 1824; /* Exact native aspect ratio of padma.png */
          border-radius: 22px;
          overflow: hidden;
          background: #000000;
          box-shadow: 
            0 28px 55px -12px rgba(0, 0, 0, 0.95),
            0 0 35px rgba(226, 192, 141, 0.25);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* The Image Fits Flush Into The Box */
        .portrait-full-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: inherit;
          filter: brightness(1) contrast(1.04);
          transition: 
            opacity 2.2s cubic-bezier(0.16, 1, 0.3, 1),
            transform 2.2s cubic-bezier(0.16, 1, 0.3, 1),
            filter 2.2s ease;
        }

        /* Starts hidden in pure black, reveals from black & white into vibrant color */
        .portrait-full-img.image-hidden {
          opacity: 0;
          transform: scale(0.96);
          filter: grayscale(100%) brightness(0) contrast(140%);
        }

        .portrait-full-img.image-revealed {
          opacity: 1;
          animation: 
            blackToColorReveal 4.2s cubic-bezier(0.2, 1, 0.3, 1) forwards,
            slowCinematicFloat 18s ease-in-out infinite alternate 4.2s;
        }

        @keyframes blackToColorReveal {
          0% {
            opacity: 0;
            filter: grayscale(100%) brightness(0) contrast(140%);
            transform: scale(0.96);
          }
          25% {
            opacity: 1;
            filter: grayscale(100%) brightness(0.75) contrast(125%);
            transform: scale(0.98);
          }
          50% {
            opacity: 1;
            filter: grayscale(100%) brightness(0.92) contrast(115%);
          }
          75% {
            opacity: 1;
            filter: grayscale(35%) brightness(0.98) contrast(108%);
          }
          100% {
            opacity: 1;
            filter: grayscale(0%) brightness(1) contrast(1.04);
            transform: scale(1);
          }
        }

        @keyframes slowCinematicFloat {
          0% {
            transform: scale(1) translateY(0px);
            filter: grayscale(0%) brightness(1) contrast(1.04);
          }
          50% {
            transform: scale(1.055) translateY(-6px);
            filter: grayscale(0%) brightness(1.03) contrast(1.06);
          }
          100% {
            transform: scale(1.02) translateY(2px);
            filter: grayscale(0%) brightness(1) contrast(1.04);
          }
        }

        .cinematic-portrait-frame.revealed::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            transparent 35%,
            rgba(255, 255, 255, 0.06) 50%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 5;
          animation: slowShimmerSweep 14s ease-in-out infinite;
        }

        @keyframes slowShimmerSweep {
          0%, 100% { opacity: 0; transform: translateX(-120%); }
          50% { opacity: 0.8; transform: translateX(120%); }
        }

        .portrait-gold-border {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(226, 192, 141, 0.35);
          border-radius: 22px;
          pointer-events: none;
          z-index: 10;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
        }

        /* Pitch Black Mystery Veil Overlay (Pure Black to Image Reveal) */
        .pitch-black-veil {
          position: absolute;
          inset: 0;
          background: #000000;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 
            opacity 1.8s cubic-bezier(0.25, 1, 0.5, 1),
            visibility 1.8s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .pitch-black-veil.veil-active {
          opacity: 1;
          visibility: visible;
        }

        .pitch-black-veil.veil-dissolved {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .veil-timer-box {
          width: 88%;
          max-width: 320px;
          padding: 26px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(8, 12, 24, 0.94);
          border: 1px solid rgba(226, 192, 141, 0.35);
          border-radius: 18px;
        }

        .veil-icon-wrapper {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: rgba(226, 192, 141, 0.15);
          border: 1px solid rgba(226, 192, 141, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .veil-lock-icon {
          color: var(--gold-light);
        }

        .veil-timer-title {
          font-family: var(--font-serif);
          font-size: 1.08rem;
          font-weight: 600;
          line-height: 1.45;
          color: #ffffff;
          margin-bottom: 14px;
        }

        .veil-progress-track {
          width: 100%;
          height: 5px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          overflow: hidden;
          margin-bottom: 14px;
        }

        .veil-progress-fill {
          height: 100%;
          background: var(--gold-shimmer);
          box-shadow: 0 0 10px var(--gold-glow);
          border-radius: 999px;
          transition: width 0.95s linear;
        }

        .veil-music-hint {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-quote);
          font-size: 0.95rem;
          font-style: italic;
          color: var(--gold-light);
          opacity: 0.9;
        }

        .hint-music-icon {
          color: var(--rose-primary);
        }

        /* The Quote Card */
        .quote-card-container {
          margin-top: 28px;
          max-width: 680px;
          position: relative;
          transition: var(--transition-cinematic);
        }

        .quote-card-container.veiled-quote {
          opacity: 0.3;
          filter: blur(2px);
        }

        .quote-card-container.visible {
          opacity: 1;
          filter: blur(0);
          animation: fadeInScreen 1s ease;
        }

        .the-wishes-text {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-size: clamp(1.4rem, 3.4vw, 2.15rem);
          font-weight: 500;
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-shadow: 0 0 20px rgba(0, 0, 0, 0.8), 0 0 30px rgba(226, 192, 141, 0.35);
          letter-spacing: 0.02em;
        }

        .wishes-heart {
          display: inline-block;
          font-style: normal;
          font-size: 1.15em;
          filter: drop-shadow(0 0 10px rgba(244, 63, 94, 0.8));
        }

        .the-signature {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 14px;
        }

        .sig-line {
          width: 45px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold-primary));
        }

        .sig-line:last-child {
          background: linear-gradient(90deg, var(--gold-primary), transparent);
        }

        .sig-text {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-serif);
          font-size: clamp(0.76rem, 2vw, 0.92rem);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold-light);
        }

        .vinod-name {
          color: #ffffff;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-shadow: 0 0 10px var(--gold-glow);
        }

        .inline-heart {
          margin-left: 2px;
        }

        .screen-nav-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 32px;
        }

        @media (max-width: 640px) {
          .cinematic-portrait-frame {
            height: min(60vh, 500px);
          }
        }
      `}</style>
    </div>
  );
}
