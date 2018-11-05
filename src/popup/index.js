'use strict';

const sendToggleMessage = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const [activeTab] = tabs;

    chrome.tabs.sendMessage(activeTab.id, { name: 'toggle' }, resp => {
      chrome.browserAction.setBadgeText({ text: resp.isEnabled ? 'ON' : 'OFF' });
    })
  });
};

const $button = document.getElementById('button');
$button.addEventListener('click', sendToggleMessage);

