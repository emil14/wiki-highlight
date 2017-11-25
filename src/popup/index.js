const { document, chrome, localStorage } = window;
const switchButton = document.getElementById('switch-button');
const storageKey = 'wk.enabled';

function getStoragedValue() {
  return localStorage.getItem(storageKey);
}

function setStoragedValue(value) {
  localStorage.setItem(storageKey, value);
}

if (getStoragedValue() === null) {
  setStoragedValue(true);
}

function toggleMode() {
  const isEnabled = getStoragedValue() !== 'true';

  setStoragedValue(isEnabled);
  chrome.browserAction.setIcon({
    path: isEnabled ? './wiki-logo.png' : './wiki-logo--disabled.png',
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  sendResponse(getStoragedValue() === 'true');
});

switchButton.addEventListener('click', toggleMode);

