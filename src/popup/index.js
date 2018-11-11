'use strict';

const { tabs, browserAction } = chrome;

const sendToggleMessage = () => {
  tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
    tabs.sendMessage(activeTab.id, { name: 'toggle' }, ({ isEnabled }) => {
      browserAction.setBadgeText({ text: isEnabled ? 'on' : 'off' });
    })
  });
};

const $button = document.getElementById('button');
$button.addEventListener('click', sendToggleMessage);

