const { document, chrome } = window;
const switchButton = document.getElementById('switch-button');

function toggleIcon(isEnabled) {
  chrome.browserAction.setIcon({
    path: isEnabled ? './wiki-logo.png' : './wiki-logo--disabled.png',
  });
}

switchButton.addEventListener('click', () => {
  chrome.runtime.sendMessage('toggleMode', toggleIcon);
});

