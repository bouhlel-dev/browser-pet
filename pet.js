let currentMood = 'neutral';
let currentUrl = '';

const productiveSites = ['github.com', 'stackoverflow.com', 'docs.', 'learn', 'tutorial', 'coursera', 'udemy', 'linkedin.com/learning'];
const procrastinationSites = ['youtube.com', 'facebook.com', 'twitter.com', 'instagram.com', 'reddit.com', 'tiktok.com', 'netflix.com', 'twitch.tv'];

const moods = {
  angry: {
    image: 'images/angry.gif',
    messages: [
      'Seriously? More scrolling? 😤',
      'Focus, human! 💢',
      'This again?! 😾',
      'I am judging you... 👀',
      'Are you kidding me? 🙄',
      'Stop procrastinating! 😠'
    ]
  },
  worried: {
    image: 'images/worried.gif',
    messages: [
      'Um... maybe take a break? 😬',
      'Getting distracted again? 🤔',
      'Should you be doing this? 😅',
      'Just checking in... 👀',
      'Focus slipping? 😟'
    ]
  },
  excited: {
    image: 'images/excited.gif',
    messages: [
      'You are crushing it! 🚀',
      'Amazing work! ⭐',
      'So proud of you! 💪',
      'Keep it up, superstar! 🌟',
      'You are on fire! 🔥',
      'Productivity master! 👑'
    ]
  },
  happy: {
    image: 'images/happy.gif',
    messages: [
      'Looking good! Keep going! 😊',
      'Nice work! 👍',
      'You got this! 💚',
      'Doing great! ✨'
    ]
  },
  neutral: {
    image: 'images/neutral.gif',
    messages: [
      'Just chilling... 😌',
      'Hi there! 👋',
      'How is it going? 🐱',
      'Ready when you are! 😺'
    ]
  }
};

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

function getMoodFromUrl(url) {
  const category = getSiteCategory(url);
  
  if (category === 'procrastination') {
    return 'angry';
  } else if (category === 'productive') {
    return 'excited';
  } else {
    return 'neutral';
  }
}

function updateMoodFromUrl(url) {
  if (url && url !== currentUrl) {
    currentUrl = url;
    const newMood = getMoodFromUrl(url);
    
    if (newMood !== currentMood) {
      currentMood = newMood;
      applyMood();
    }
  }
}

function updateMood(data) {
  const productivityScore = data.productivityScore;
  const procrastinationScore = data.procrastinationScore;
  
  let newMood = 'neutral';
  
  if (procrastinationScore >= 50) {
    newMood = 'angry';
  } else if (procrastinationScore >= 25) {
    newMood = 'worried';
  } else if (productivityScore >= 50) {
    newMood = 'excited';
  } else if (productivityScore >= 25) {
    newMood = 'happy';
  }
  
  if (newMood !== currentMood) {
    currentMood = newMood;
    applyMood();
  }
}

function applyMood() {
  const pet = document.getElementById('pet');
  const bubble = document.querySelector('.speech-bubble');
  const petImage = document.getElementById('pet-image');
  const message = document.getElementById('pet-message');
  
  pet.className = 'pet';
  bubble.className = 'speech-bubble';
  
  pet.classList.add(currentMood);
  bubble.classList.add(currentMood);
  
  const moodData = moods[currentMood];
  petImage.src = chrome.runtime.getURL(moodData.image);
  message.textContent = moodData.messages[Math.floor(Math.random() * moodData.messages.length)];
}

window.addEventListener('message', (event) => {
  if (event.data.type === 'UPDATE_MOOD') {
    updateMood(event.data.data);
  } else if (event.data.type === 'URL_CHANGE') {
    updateMoodFromUrl(event.data.url);
  }
});

chrome.storage.local.get(['sessionData'], (result) => {
  if (result.sessionData) {
    updateMood(result.sessionData);
  }
});

setInterval(() => {
  const currentMessages = moods[currentMood].messages;
  document.getElementById('pet-message').textContent = currentMessages[Math.floor(Math.random() * currentMessages.length)];
}, 30000);

applyMood();

try {
  updateMoodFromUrl(window.location.href);
} catch (e) {
  console.log('Could not get URL');
}