import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Lock, Activity, Eye, Clock, Laptop, Download, Trash2, CheckCircle2 } from 'lucide-react';
import { getAnalyticsData, resetAnalytics } from '../utils/analytics';

export default function AnalyticsModal({ isOpen, onClose }) {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setData(getAnalyticsData());
      // Re-check periodically while modal open
      const interval = setInterval(() => {
        setData(getAnalyticsData());
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setPasscode('');
      setError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcode.trim() === 'vinod@padma') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleCopySummary = () => {
    if (!data) return;
    const summary = `
=== PADMA CELEBRATION ANALYTICS ===
Visitor: ${data.visitorName}
First Visit: ${new Date(data.firstVisit).toLocaleString()}
Last Active: ${new Date(data.lastVisit).toLocaleString()}
Total Time Spent: ${Math.floor(data.totalTimeSpentSecs / 60)}m ${data.totalTimeSpentSecs % 60}s
Resolution: ${data.deviceInfo.screenResolution}
Timezone: ${data.deviceInfo.timezone}
Platform: ${data.deviceInfo.platform}
===================================
    `.trim();

    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadJSON = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `celebration_analytics_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear session analytics?')) {
      const refreshed = resetAnalytics();
      setData(refreshed);
    }
  };

  const formatSecs = (s = 0) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="analytics-modal-backdrop">
      <div className="glass-panel analytics-modal-card">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          title="Close Dashboard"
          aria-label="Close Dashboard"
        >
          <X size={18} />
        </button>

        {!isUnlocked ? (
          /* Passcode Gate Screen */
          <div className="passcode-gate-view">
            <div className="passcode-shield-icon">
              <Lock size={28} className="pulse-glow" />
            </div>

            <h2 className="passcode-title">Secret Analytics Dashboard</h2>
            <p className="passcode-subtitle">
              This panel is protected. Enter the author passcode to unlock visitor telemetry.
            </p>

            <form onSubmit={handlePasscodeSubmit} className="passcode-form">
              <input
                id="analytics-passcode-input"
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Enter passcode..."
                className={`passcode-input ${error ? 'error-border' : ''}`}
                autoFocus
              />

              {error && (
                <span className="passcode-error-text">
                  Incorrect passcode. Access denied.
                </span>
              )}

              <button
                type="submit"
                className="btn-gold passcode-submit-btn"
              >
                <span>Unlock Telemetry</span>
                <ShieldCheck size={18} />
              </button>
            </form>
          </div>
        ) : (
          /* Full Telemetry Dashboard */
          <div className="dashboard-view">
            
            <div className="dashboard-header">
              <div className="header-titles">
                <span className="dashboard-tag">
                  <Activity size={14} /> LIVE TELEMETRY
                </span>
                <h2 className="dashboard-heading">Session & Visitor Intelligence</h2>
              </div>

              <div className="header-actions">
                <button onClick={handleCopySummary} className="btn-ghost-gold sm-btn">
                  {copied ? <CheckCircle2 size={14} color="#4ade80" /> : <Eye size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button onClick={handleDownloadJSON} className="btn-ghost-gold sm-btn">
                  <Download size={14} />
                  <span>Export</span>
                </button>
                <button onClick={handleReset} className="btn-ghost-gold sm-btn danger">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="metrics-grid">
              
              <div className="metric-box glass-panel">
                <div className="metric-icon-wrap"><Eye size={16} /></div>
                <div className="metric-details">
                  <span className="metric-label">Identified Visitor</span>
                  <span className="metric-value gold-gradient-text">{data?.visitorName || 'Padma'}</span>
                </div>
              </div>

              <div className="metric-box glass-panel">
                <div className="metric-icon-wrap"><Clock size={16} /></div>
                <div className="metric-details">
                  <span className="metric-label">Total Duration</span>
                  <span className="metric-value">{formatSecs(data?.totalTimeSpentSecs)}</span>
                </div>
              </div>

              <div className="metric-box glass-panel">
                <div className="metric-icon-wrap"><Laptop size={16} /></div>
                <div className="metric-details">
                  <span className="metric-label">Screen & Viewport</span>
                  <span className="metric-value">{data?.deviceInfo?.screenResolution}</span>
                </div>
              </div>

              <div className="metric-box glass-panel">
                <div className="metric-icon-wrap"><ShieldCheck size={16} /></div>
                <div className="metric-details">
                  <span className="metric-label">Timezone</span>
                  <span className="metric-value">{data?.deviceInfo?.timezone}</span>
                </div>
              </div>

            </div>

            {/* Page Breakdown Table */}
            <div className="pages-breakdown-section">
              <h3 className="section-title">Page Time & Visits</h3>
              <div className="breakdown-grid">
                {[
                  { name: '1. Secret Gate', key: 'gate' },
                  { name: '2. Hero Age Counter', key: 'heroAge' },
                  { name: '3. Suspense Veil & Photo', key: 'suspenseVeil' },
                  { name: '4. Heartfelt Letter', key: 'heartfeltMessage' },
                  { name: '5. Constellation Galaxy', key: 'constellation' },
                ].map((pg, i) => (
                  <div key={i} className="breakdown-item">
                    <span className="pg-name">{pg.name}</span>
                    <div className="pg-stats">
                      <span className="pg-badge">{data?.pageVisits?.[pg.key] || 0} visits</span>
                      <span className="pg-time">{formatSecs(data?.pageTimeSeconds?.[pg.key])}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Timeline Logs */}
            <div className="activity-timeline-section">
              <h3 className="section-title">Event Timeline</h3>
              <div className="timeline-list">
                {data?.activityLog?.slice(0, 10).map((log, index) => (
                  <div key={index} className="timeline-item">
                    <span className="timeline-dot"></span>
                    <div className="timeline-content">
                      <div className="timeline-top">
                        <strong className="timeline-event">{log.event}</strong>
                        <span className="timeline-time">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <span className="timeline-details">{log.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      <style>{`
        .analytics-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(2, 4, 10, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeInScreen 0.3s ease;
        }

        .analytics-modal-card {
          position: relative;
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          overflow-y: auto;
          background: rgba(10, 15, 30, 0.95);
          border: 1px solid rgba(226, 192, 141, 0.35);
          border-radius: 24px;
          padding: 34px 28px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
        }

        .modal-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          background: rgba(226, 192, 141, 0.1);
          border: 1px solid rgba(226, 192, 141, 0.25);
          color: var(--gold-light);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .modal-close-btn:hover {
          background: rgba(226, 192, 141, 0.25);
          color: #ffffff;
          transform: rotate(90deg);
        }

        /* Passcode Gate */
        .passcode-gate-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px 10px;
        }

        .passcode-shield-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(226, 192, 141, 0.12);
          border: 1px solid rgba(226, 192, 141, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold-light);
          margin-bottom: 18px;
        }

        .passcode-title {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .passcode-subtitle {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          color: var(--text-muted);
          max-width: 400px;
          margin-bottom: 24px;
        }

        .passcode-form {
          width: 100%;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .passcode-input {
          width: 100%;
          padding: 14px 20px;
          background: rgba(5, 8, 17, 0.8);
          border: 1px solid rgba(226, 192, 141, 0.3);
          border-radius: 999px;
          color: #ffffff;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          text-align: center;
          outline: none;
        }

        .passcode-input:focus {
          border-color: var(--gold-light);
          box-shadow: 0 0 15px rgba(226, 192, 141, 0.35);
        }

        .passcode-input.error-border {
          border-color: #fb7185;
          box-shadow: 0 0 15px rgba(251, 113, 133, 0.35);
        }

        .passcode-error-text {
          font-size: 0.82rem;
          color: #fb7185;
        }

        .passcode-submit-btn {
          width: 100%;
          padding: 13px;
        }

        /* Dashboard View */
        .dashboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 14px;
        }

        .dashboard-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-serif);
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          color: #4ade80;
          margin-bottom: 4px;
        }

        .dashboard-heading {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: #ffffff;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .sm-btn {
          padding: 6px 14px;
          font-size: 0.78rem;
        }

        .sm-btn.danger:hover {
          border-color: #fb7185;
          color: #fb7185;
        }

        /* Metrics Grid */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-bottom: 24px;
        }

        .metric-box {
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(15, 23, 42, 0.65);
        }

        .metric-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(226, 192, 141, 0.12);
          border: 1px solid rgba(226, 192, 141, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold-light);
        }

        .metric-details {
          display: flex;
          flex-direction: column;
        }

        .metric-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .metric-value {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
        }

        /* Section Styling */
        .section-title {
          font-family: var(--font-serif);
          font-size: 0.88rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold-primary);
          margin-bottom: 12px;
        }

        .pages-breakdown-section, .activity-timeline-section {
          margin-bottom: 22px;
        }

        .breakdown-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .breakdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(226, 192, 141, 0.15);
          border-radius: 10px;
        }

        .pg-name {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .pg-stats {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pg-badge {
          font-size: 0.72rem;
          background: rgba(226, 192, 141, 0.1);
          color: var(--gold-light);
          padding: 2px 8px;
          border-radius: 999px;
        }

        .pg-time {
          font-size: 0.82rem;
          font-family: var(--font-sans);
          font-weight: 600;
          color: #ffffff;
        }

        /* Timeline */
        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 180px;
          overflow-y: auto;
          padding-right: 6px;
        }

        .timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.82rem;
        }

        .timeline-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--gold-primary);
          margin-top: 5px;
        }

        .timeline-content {
          flex: 1;
        }

        .timeline-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .timeline-event {
          color: var(--gold-light);
        }

        .timeline-time {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .timeline-details {
          display: block;
          color: var(--text-muted);
          font-size: 0.76rem;
        }

        @media (max-width: 600px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
