function loadStats() {
  chrome.storage.local.get(['sessionData'], (result) => {
    if (result.sessionData) {
      const productivityScore = result.sessionData.productivityScore;
      const procrastinationScore = result.sessionData.procrastinationScore;
      document.getElementById('productivity-stat').textContent = Math.round(productivityScore) + '%';
      document.getElementById('procrastination-stat').textContent = Math.round(procrastinationScore) + '%';
      document.getElementById('productivity-bar').style.width = productivityScore + '%';
      document.getElementById('procrastination-bar').style.width = procrastinationScore + '%';
    }
  });
}

document.getElementById('reset-btn').addEventListener('click', () => {
  const sessionData = {
    productiveTime: 0,
    procrastinationTime: 0,
    lastUpdate: Date.now(),
    currentSite: '',
    productivityScore: 0,
    procrastinationScore: 0
  };
  
  chrome.storage.local.set({ sessionData }, () => {
    loadStats();
    alert('Stats reset! Your pet is ready for a fresh start! 🐱');
  });
});

loadStats();
setInterval(loadStats, 2000);