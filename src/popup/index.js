const { document, chrome, localStorage } = window;
const switchButton = document.getElementById('switchButton');
const storageKey = 'wk.enabled';
const getStoragedValue = () => localStorage.getItem(storageKey);
const setStoragedValue = (value) => {
  localStorage.setItem(storageKey, value);
};
const storageIsClear = getStoragedValue() === null;

if (storageIsClear) setStoragedValue(true);

function toggleMode() {
  let isEnabled = getStoragedValue();

  isEnabled = !isEnabled;
  localStorage.setItem(storageKey, isEnabled);

  const iconPath = isEnabled ? './wiki-logo.png' : './wiki-logo--disabled.png';
  chrome.browserAction.setIcon({ path: iconPath });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, isEnabled);
  });
}

switchButton.addEventListener('click', toggleMode);

