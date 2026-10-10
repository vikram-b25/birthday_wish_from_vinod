import React, { useState, useEffect, useRef } from 'react';
import BackgroundStars from './components/BackgroundStars';
import ScreenGate from './components/ScreenGate';
import ScreenHeroAge from './components/ScreenHeroAge';
import ScreenVeilReveal from './components/ScreenVeilReveal';
import ScreenMessage from './components/ScreenMessage';
import ScreenConstellation from './components/ScreenConstellation';
import AnalyticsModal from './components/AnalyticsModal';
import { recordPageVisit, updatePageTime } from './utils/analytics';

export default function App() {
  // Page index:
  // 1: Screen 1 - Secret Gate
  // 2: Screen 2 - Birthday Hero & Live Age Counter
  // 3: Screen 3 (Page 2) - Suspense Veil & Eyes Reveal (Music plays strictly here)
  // 4: Screen 4 (Page 3) - Heartfelt Message & Watermark Portrait (Music paused)
  // 5: Screen 5 (Page 4) - Celestial Constellation Galaxy (Music paused)
  const [currentPage, setCurrentPage] = useState(1);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [visitorName, setVisitorName] = useState('Padma');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const audioRef = useRef(null);

  // Time-tracking per page
  useEffect(() => {
    const pageKeys = {
      1: 'gate',
      2: 'heroAge',
      3: 'suspenseVeil',
      4: 'heartfeltMessage',
      5: 'constellation'
    };
    const key = pageKeys[currentPage];
    recordPageVisit(key);

    const timer = setInterval(() => {
      updatePageTime(key, 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPage]);

  // Audio Control: STRICTLY plays on Screen 3 (Page 2) ONLY, stops on all other pages
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentPage === 3) {
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay restricted by browser, waiting for user gesture:', err);
        });
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [currentPage]);

  const handleEnsureAudio = () => {
    const audio = audioRef.current;
    if (audio && audio.paused && currentPage === 3) {
      audio.play().catch(console.warn);
    }
  };

  const handleGateUnlock = (name) => {
    setVisitorName(name);
    setIsUnlocked(true);
    setCurrentPage(2);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="celebration-app-root">
      
      {/* Background Soundtrack - Plays STRICTLY on Screen 3 */}
      <audio
        ref={audioRef}
        src="/ReelAudio-84992.mp3"
        loop
        preload="auto"
      />

      {/* Dynamic Starlight Particles Canvas Background */}
      <BackgroundStars />

      {/* Atmospheric Ambient Glow Layer */}
      <div className="ambient-glow-layer"></div>

      {/* Screen Presentation Flow (Header completely removed as requested) */}
      <main className="main-content-flow">
        {currentPage === 1 && (
          <ScreenGate onUnlock={handleGateUnlock} />
        )}

        {currentPage === 2 && (
          <ScreenHeroAge
            visitorName={visitorName}
            onNext={() => goToPage(3)}
          />
        )}

        {currentPage === 3 && (
          <ScreenVeilReveal
            onBack={() => goToPage(2)}
            onNext={() => goToPage(4)}
            onEnsureAudio={handleEnsureAudio}
          />
        )}

        {currentPage === 4 && (
          <ScreenMessage
            onBack={() => goToPage(3)}
            onNext={() => goToPage(5)}
            onOpenSecretAnalytics={() => setShowAnalytics(true)}
          />
        )}

        {currentPage === 5 && (
          <ScreenConstellation
            onBack={() => goToPage(4)}
            onReplay={() => goToPage(2)}
          />
        )}
      </main>

      {/* Secret Analytics Dashboard Modal */}
      <AnalyticsModal
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
      />

      <style>{`
        .celebration-app-root {
          min-height: 100vh;
          width: 100%;
          position: relative;
          background: radial-gradient(ellipse at top, #091e27 0%, #05131b 45%, #02070c 100%);
          color: var(--text-main);
          overflow-x: hidden;
        }

        .main-content-flow {
          width: 100%;
          position: relative;
          z-index: 5;
        }
      `}</style>
    </div>
  );
}
