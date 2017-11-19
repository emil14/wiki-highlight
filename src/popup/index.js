const { document, chrome, localStorage } = window;
const switchButton = document.getElementById('switch-button');
const storageKey = 'wk.enabled';

function getStoragedValue() {
  return localStorage.getItem(storageKey);
}

function setStoragedValue(value) {
  localStorage.setItem(storageKey, value);
}

if (getStoragedValue() === null) setStoragedValue(true);

function toggleMode() {
  const isEnabled = getStoragedValue() !== 'true';

  setStoragedValue(isEnabled);

  chrome.browserAction.setIcon({
    path: isEnabled ? './wiki-logo.png' : './wiki-logo--disabled.png',
  });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, isEnabled);
  });
}

switchButton.addEventListener('click', toggleMode);

