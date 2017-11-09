const { document, chrome, localStorage } = window;
const switchButton = document.getElementById('switchButton');
const storageKey = 'wk.enabled';

function getStoragedValue() {
  return localStorage.getItem(storageKey);
}

function setStoragedValue(value) {
  localStorage.setItem(storageKey, value);
}

const storageIsClear = getStoragedValue() === null;

if (storageIsClear) setStoragedValue(true);

function toggleMode() {
  let isEnabled = getStoragedValue();

  isEnabled = !isEnabled;

  setStoragedValue(isEnabled);

  chrome.browserAction.setIcon({
    path: isEnabled ? './wiki-logo.png' : './wiki-logo--disabled.png',
  });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, isEnabled);
  });
}

switchButton.addEventListener('click', toggleMode);

