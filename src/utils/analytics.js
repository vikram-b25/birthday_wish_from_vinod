// Session & Visitor Analytics Tracker for Padma's Birthday App

const STORAGE_KEY = 'padma_birthday_analytics_v1';

export function getAnalyticsData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = {
        sessionId: 'sess_' + Math.random().toString(36).substring(2, 9),
        firstVisit: new Date().toISOString(),
        lastVisit: new Date().toISOString(),
        visitorName: 'Padma',
        totalVisits: 1,
        totalTimeSpentSecs: 0,
        pageVisits: {
          gate: 1,
          heroAge: 0,
          suspenseVeil: 0,
          heartfeltMessage: 0,
          constellation: 0
        },
        pageTimeSeconds: {
          gate: 0,
          heroAge: 0,
          suspenseVeil: 0,
          heartfeltMessage: 0,
          constellation: 0
        },
        suspenseCompleted: false,
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform || 'Unknown',
          language: navigator.language || 'en-US',
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        activityLog: [
          {
            timestamp: new Date().toISOString(),
            event: 'Session initialized',
            details: 'Entered the secret gate'
          }
        ]
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse analytics', e);
    return null;
  }
}

export function saveAnalyticsData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save analytics', e);
  }
}

export function logActivity(event, details = '') {
  const data = getAnalyticsData();
  if (!data) return;
  data.lastVisit = new Date().toISOString();
  data.activityLog = data.activityLog || [];
  data.activityLog.unshift({
    timestamp: new Date().toISOString(),
    event,
    details
  });
  // Keep last 50 events
  if (data.activityLog.length > 50) {
    data.activityLog = data.activityLog.slice(0, 50);
  }
  saveAnalyticsData(data);
}

export function recordPageVisit(pageKey) {
  const data = getAnalyticsData();
  if (!data) return;
  if (!data.pageVisits) data.pageVisits = {};
  data.pageVisits[pageKey] = (data.pageVisits[pageKey] || 0) + 1;
  logActivity(`Navigated to ${pageKey}`, `Screen viewed`);
}

export function updatePageTime(pageKey, seconds = 1) {
  const data = getAnalyticsData();
  if (!data) return;
  if (!data.pageTimeSeconds) data.pageTimeSeconds = {};
  data.pageTimeSeconds[pageKey] = (data.pageTimeSeconds[pageKey] || 0) + seconds;
  data.totalTimeSpentSecs = (data.totalTimeSpentSecs || 0) + seconds;
  saveAnalyticsData(data);
}

export function resetAnalytics() {
  localStorage.removeItem(STORAGE_KEY);
  return getAnalyticsData();
}
