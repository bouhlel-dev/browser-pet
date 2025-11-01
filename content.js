(function() {
  if (window.browserPetInjected) return;
  window.browserPetInjected = true;

  const iframe = document.createElement('iframe');
  iframe.id = 'browser-pet-iframe';
  iframe.src = chrome.runtime.getURL('pet.html');
  iframe.style.cssText = 'position: fixed !important; bottom: 20px !important; right: 20px !important; width: 320px !important; height: 250px !important; border: none !important; z-index: 2147483647 !important; pointer-events: none !important; background: transparent !important;';
  
  if (document.body) {
    document.body.appendChild(iframe);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(iframe);
    });
  }

  function sendUrlToIframe() {
    iframe.contentWindow.postMessage({
      type: 'URL_CHANGE',
      url: window.location.href
    }, '*');
  }

  iframe.addEventListener('load', () => {
    sendUrlToIframe();
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'UPDATE_MOOD') {
      iframe.contentWindow.postMessage({
        type: 'UPDATE_MOOD',
        data: message.data
      }, '*');
    }
  });

  let lastUrl = window.location.href;
  setInterval(() => {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;
      sendUrlToIframe();
    }
  }, 1000);
})();