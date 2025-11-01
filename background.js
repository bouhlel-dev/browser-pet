const productiveSites = ['github.com', 'stackoverflow.com', 'docs.', 'learn', 'tutorial', 'coursera', 'udemy', 'linkedin.com/'];
const procrastinationSites = ['youtube.com', 'facebook.com', 'twitter.com', 'instagram.com', 'reddit.com', 'tiktok.com', 'netflix.com', 'twitch.tv'];

let sessionData = {
  productiveTime: 0,
  procrastinationTime: 0,
  lastUpdate: Date.now(),
  currentSite: '',
  productivityScore: 0,
  procrastinationScore: 0
};

chrome.storage.local.get(['sessionData'], (result) => {
  if (result.sessionData) {
    sessionData = result.sessionData;
  }
});

function getSiteCategory(url) {
  try {
    const hostname = new URL(url).hostname;
    
    if (productiveSites.some(site => hostname.includes(site))) {
      return 'productive';
    }
    if (procrastinationSites.some(site => hostname.includes(site))) {
      return 'procrastination';
    }
    return 'neutral';
  } catch (e) {
    return 'neutral';
  }
}

function updateScores(category, timeSpent) {
  const minutes = timeSpent / 60000;
  
  if (category === 'productive') {
    sessionData.productivityScore = Math.min(sessionData.productivityScore + minutes, 100);
    sessionData.procrastinationScore = Math.max(sessionData.procrastinationScore - minutes * 0.5, 0);
  } else if (category === 'procrastination') {
    sessionData.procrastinationScore = Math.min(sessionData.procrastinationScore + minutes * 2, 100);
    sessionData.productivityScore = Math.max(sessionData.productivityScore - minutes * 0.5, 0);
  }
  
  chrome.storage.local.set({ sessionData });
  
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'UPDATE_MOOD',
        data: sessionData
      }).catch(() => {});
    }
  });
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url) {
      handleTabChange(tab.url);
    }
  } catch (e) {
    console.log('Tab access error:', e);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active && tab.url) {
    handleTabChange(tab.url);
  }
});

function handleTabChange(url) {
  const now = Date.now();
  const timeSpent = now - sessionData.lastUpdate;
  
  if (sessionData.currentSite) {
    const category = getSiteCategory(sessionData.currentSite);
    updateScores(category, timeSpent);
  }
  
  sessionData.currentSite = url;
  sessionData.lastUpdate = now;
}

setInterval(() => {
  if (sessionData.currentSite) {
    const now = Date.now();
    const timeSpent = now - sessionData.lastUpdate;
    const category = getSiteCategory(sessionData.currentSite);
    updateScores(category, timeSpent);
    sessionData.lastUpdate = now;
  }
}, 60000);

if (chrome.alarms) {
  chrome.alarms.create('dailyReset', { periodInMinutes: 1440 });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'dailyReset') {
      sessionData.productivityScore = 0;
      sessionData.procrastinationScore = 0;
      chrome.storage.local.set({ sessionData });
    }
  });
}