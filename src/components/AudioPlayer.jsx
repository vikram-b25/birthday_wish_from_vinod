import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer({ activePage }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Screen 3 corresponds to Page 2 in the user prompt:
  // "Screen 3: The Suspense Veil & Eyes Reveal (Page 2)"
  // "Background soundtrack plays automatically upon entering this page."
  // "Music automatically stops upon arriving at Page 3 / any other page"
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (activePage === 3) {
      // Strictly auto-play on Screen 3 (Page 2)
      audio.currentTime = 0;
      audio.muted = isMuted;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((err) => {
            console.warn('Autoplay prevented by browser policy:', err);
            setIsPlaying(false);
          });
      }
    } else {
      // Automatically pause when navigating to any other screen
      audio.pause();
      setIsPlaying(false);
    }
  }, [activePage, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(console.error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="audio-control-wrapper">
      <audio
        ref={audioRef}
        src="/ReelAudio-84992.mp3"
        loop
        preload="auto"
      />

      <div className={`audio-pill ${isPlaying ? 'playing' : ''}`}>
        <button
          className="audio-btn"
          onClick={togglePlay}
          title={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
          aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
        >
          <Music size={14} className={isPlaying ? "music-note-spin" : ""} />
          <span className="audio-label">
            {activePage === 3 ? (isPlaying ? 'Soundtrack Playing' : 'Play Soundtrack') : 'Audio Track'}
          </span>
          <div className="audio-bars">
            <span className={`bar ${isPlaying ? 'anim' : ''}`}></span>
            <span className={`bar ${isPlaying ? 'anim' : ''}`}></span>
            <span className={`bar ${isPlaying ? 'anim' : ''}`}></span>
            <span className={`bar ${isPlaying ? 'anim' : ''}`}></span>
          </div>
        </button>

        <button
          className="mute-btn"
          onClick={toggleMute}
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>

      <style>{`
        .audio-control-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .audio-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 192, 141, 0.25);
          border-radius: 999px;
          padding: 4px 8px 4px 12px;
          transition: var(--transition-smooth);
        }

        .audio-pill.playing {
          border-color: rgba(226, 192, 141, 0.6);
          box-shadow: 0 0 15px rgba(226, 192, 141, 0.3);
        }

        .audio-btn {
          background: none;
          border: none;
          color: var(--gold-light);
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          cursor: pointer;
        }

        .music-note-spin {
          animation: spinNote 4s linear infinite;
          color: var(--gold-primary);
        }

        @keyframes spinNote {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .audio-bars {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 12px;
        }

        .audio-bars .bar {
          width: 2.5px;
          height: 3px;
          background: var(--gold-primary);
          border-radius: 1px;
          transition: height 0.2s ease;
        }

        .audio-bars .bar.anim:nth-child(1) { animation: bounceBar 0.8s ease-in-out infinite 0.1s; }
        .audio-bars .bar.anim:nth-child(2) { animation: bounceBar 0.8s ease-in-out infinite 0.3s; }
        .audio-bars .bar.anim:nth-child(3) { animation: bounceBar 0.8s ease-in-out infinite 0.2s; }
        .audio-bars .bar.anim:nth-child(4) { animation: bounceBar 0.8s ease-in-out infinite 0.4s; }

        @keyframes bounceBar {
          0%, 100% { height: 3px; }
          50% { height: 12px; }
        }

        .mute-btn {
          background: rgba(226, 192, 141, 0.1);
          border: 1px solid rgba(226, 192, 141, 0.2);
          color: var(--gold-light);
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .mute-btn:hover {
          background: rgba(226, 192, 141, 0.25);
          color: #ffffff;
        }

        @media (max-width: 600px) {
          .audio-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
