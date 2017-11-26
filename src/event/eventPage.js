const { chrome, localStorage } = window;
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === 'toggleMode') {
    setStoragedValue(getStoragedValue() !== 'true');
  }

  sendResponse(getStoragedValue() === 'true');
});

