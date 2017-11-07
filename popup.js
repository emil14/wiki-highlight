let isEnabled = true;
const switchButton = window.document.getElementById('switchButton');

function toggleMode() {
  isEnabled = !isEnabled;
  const iconPath = isEnabled ? 'wiki-logo.png' : 'wiki-logo--disabled.png';

  window.chrome.browserAction.setIcon({ path: iconPath });

  window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    window.chrome.tabs.sendMessage(tabs[0].id, isEnabled);
  });
}

switchButton.addEventListener('click', toggleMode);

