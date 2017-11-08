const { document, chrome } = window;

let isEnabled = true;
const switchButton = document.getElementById('switchButton');

function toggleMode() {
  isEnabled = !isEnabled;
  const iconPath = isEnabled ? './wiki-logo.png' : './wiki-logo--disabled.png';

  chrome.browserAction.setIcon({ path: iconPath });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, isEnabled);
  });
}

switchButton.addEventListener('click', toggleMode);

