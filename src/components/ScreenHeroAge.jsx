import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ScreenHeroAge({ visitorName = 'Padma', onNext }) {
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Starting exact point: 12 October 2004, 00:00:00
    // Month is 9 (October in 0-indexed JS Date)
    const birthDate = new Date(2004, 9, 12, 0, 0, 0);

    const calculateAge = () => {
      const now = new Date();

      let years = now.getFullYear() - birthDate.getFullYear();
      let months = now.getMonth() - birthDate.getMonth();
      let days = now.getDate() - birthDate.getDate();
      let hours = now.getHours() - birthDate.getHours();
      let minutes = now.getMinutes() - birthDate.getMinutes();
      let seconds = now.getSeconds() - birthDate.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes -= 1;
      }

      if (minutes < 0) {
        minutes += 60;
        hours -= 1;
      }

      if (hours < 0) {
        hours += 24;
        days -= 1;
      }

      if (days < 0) {
        const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonthLastDay;
        months -= 1;
      }

      if (months < 0) {
        months += 12;
        years -= 1;
      }

      setAge({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds)
      });
    };

    calculateAge();
    const interval = setInterval(calculateAge, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  const counterCards = [
    { label: 'Years', value: age.years },
    { label: 'Months', value: formatNumber(age.months) },
    { label: 'Days', value: formatNumber(age.days) },
    { label: 'Hours', value: formatNumber(age.hours) },
    { label: 'Minutes', value: formatNumber(age.minutes) },
    { label: 'Seconds', value: formatNumber(age.seconds) },
  ];

  // Format displayName nicely
  const displayName = visitorName && visitorName.toLowerCase() === 'padma' ? 'Padma' : (visitorName || 'Padma');

  return (
    <div className="screen-container hero-screen">
      <div className="hero-content">
        
        {/* Exact Cinematic Typography Section Matching User Reference */}
        <div className="hero-editorial-header">
          
          {/* Line 1: Script cursive in warm radiant gold */}
          <h2 className="hero-script-greeting">
            Dearest {displayName}
          </h2>

          {/* Line 2: Large clean editorial serif */}
          <h1 className="hero-main-title">
            Happy Birthday
          </h1>

          {/* Line 3: Italic serif with radiant glowing heart */}
          <p className="hero-sub-title">
            <span>to the Most Beautiful Soul in the World...</span>
            <span className="hero-glowing-heart" aria-label="heart">♥</span>
          </p>

          {/* Line 4: Center subtle horizontal gold rule */}
          <div className="hero-golden-rule"></div>

          {/* Line 5: Clean spaced uppercase title */}
          <p className="hero-presence-text">
            TIME BLESSED BY YOUR PRESENCE
          </p>

        </div>

        {/* Live Age Counter Section */}
        <div className="counter-section">
          <div className="counter-grid">
            {counterCards.map((item, index) => (
              <div key={index} className="glass-panel counter-card">
                <div className="card-top-glow"></div>
                <div className="card-number-wrapper">
                  <span className="counter-value">{item.value}</span>
                </div>
                <span className="counter-label">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Inline Summary Badge */}
          <div className="inline-age-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">
              {age.years} Years · {age.months} Months · {age.days} Days · {formatNumber(age.hours)} Hours · {formatNumber(age.minutes)} Mins · {formatNumber(age.seconds)} Secs
            </span>
          </div>

          {/* Subtext */}
          <p className="counter-subtext">
            Every second with you is a gift
          </p>
        </div>

        {/* Navigation Next Button */}
        <div className="hero-cta-wrapper">
          <button
            id="hero-next-button"
            onClick={onNext}
            className="btn-gold hero-next-btn pulse-glow"
          >
            <span>Next</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>

      <style>{`
        .hero-screen {
          max-width: 980px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        /* Editorial Header from Reference Screenshot */
        .hero-editorial-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 8px;
          width: 100%;
        }

        .hero-script-greeting {
          font-family: 'Alex Brush', 'Great Vibes', cursive;
          font-size: clamp(3rem, 7vw, 4.6rem);
          font-weight: 400;
          line-height: 1.15;
          color: #dfbe89;
          background: linear-gradient(135deg, #f7e6c8 0%, #e5c590 50%, #cba05c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 16px rgba(226, 192, 141, 0.4));
          margin-bottom: 2px;
          letter-spacing: 0.02em;
        }

        .hero-main-title {
          font-family: 'Playfair Display', 'Cinzel', Georgia, serif;
          font-size: clamp(3.2rem, 7.8vw, 5.8rem);
          font-weight: 400;
          letter-spacing: 0.04em;
          line-height: 1.12;
          color: #ffffff;
          margin: 0 0 8px;
          text-shadow: 0 0 35px rgba(255, 255, 255, 0.28);
        }

        .hero-sub-title {
          font-family: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.4rem, 3.4vw, 2.35rem);
          font-style: italic;
          font-weight: 400;
          color: #f1f5f9;
          letter-spacing: 0.02em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 0 0 16px;
          line-height: 1.3;
        }

        .hero-glowing-heart {
          color: #ffffff;
          font-style: normal;
          display: inline-block;
          font-size: 1.15em;
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 25px rgba(226, 192, 141, 0.7));
          animation: heartbeat 2.2s ease-in-out infinite;
        }

        .hero-golden-rule {
          width: 95px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(226, 192, 141, 0.65), transparent);
          margin: 14px auto 18px;
        }

        .hero-presence-text {
          font-family: var(--font-sans);
          font-size: clamp(0.72rem, 1.8vw, 0.85rem);
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(148, 163, 184, 0.75);
          margin-bottom: 36px;
        }

        /* Counter Section */
        .counter-section {
          width: 100%;
          max-width: 820px;
          background: rgba(8, 16, 28, 0.55);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(226, 192, 141, 0.22);
          border-radius: 24px;
          padding: 32px 28px;
          margin-bottom: 36px;
          box-shadow: 
            0 20px 45px -10px rgba(0, 0, 0, 0.7),
            0 0 30px rgba(226, 192, 141, 0.15);
        }

        .counter-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
          margin-bottom: 22px;
        }

        .counter-card {
          position: relative;
          padding: 16px 8px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(12, 22, 38, 0.7);
        }

        .card-top-glow {
          position: absolute;
          top: 0;
          left: 15%;
          right: 15%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(226, 192, 141, 0.8), transparent);
        }

        .card-number-wrapper {
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .counter-value {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
          letter-spacing: -0.02em;
          text-shadow: 0 0 15px rgba(226, 192, 141, 0.4);
        }

        .counter-label {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold-light);
          opacity: 0.85;
          margin-top: 6px;
        }

        .inline-age-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 20px;
          background: rgba(226, 192, 141, 0.08);
          border: 1px solid rgba(226, 192, 141, 0.25);
          border-radius: 999px;
          margin-bottom: 14px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: var(--gold-primary);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--gold-primary);
        }

        .badge-text {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--gold-light);
          letter-spacing: 0.05em;
        }

        .counter-subtext {
          font-family: var(--font-quote);
          font-size: 1.15rem;
          font-style: italic;
          color: var(--text-secondary);
          opacity: 0.9;
        }

        .hero-cta-wrapper {
          margin-top: 8px;
        }

        .hero-next-btn {
          min-width: 190px;
        }

        @media (max-width: 768px) {
          .counter-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          .counter-section {
            padding: 24px 16px;
          }
          .badge-text {
            font-size: 0.76rem;
          }
          .hero-sub-title {
            flex-direction: column;
            gap: 4px;
          }
        }

        @media (max-width: 480px) {
          .counter-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .counter-value {
            font-size: 1.5rem;
          }
          .inline-age-badge {
            padding: 6px 14px;
          }
        }
      `}</style>
    </div>
  );
}
