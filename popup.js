let isScrolling = false;

// start/stop
document.getElementById('toggleScroll').addEventListener('click', () => {
  isScrolling = !isScrolling;
  const statusText = isScrolling ? 'Stop' : 'Start';
  document.getElementById('toggleScroll').textContent = statusText;

  // Send command to content script to enable/disable auto scroll
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: toggleAutoScroll,
      args: [isScrolling]
    });
  });
});

// function run
function toggleAutoScroll(enableScroll) {
  if (enableScroll) {
    window.autoScrollInterval = setInterval(autoScroll, Math.floor(Math.random() * 5000) + 5000);
  } else {
    clearInterval(window.autoScrollInterval);
  }
}

function autoScroll() {
  window.scrollBy(0, 1000);
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 3000);
  }
}
