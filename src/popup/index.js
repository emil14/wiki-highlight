'use strict';

const { tabs, browserAction } = chrome;

const sendToggleMessage = () => {
  tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
    tabs.sendMessage(activeTab.id, { name: 'toggle' }, resp => {
      browserAction.setBadgeText({ text: resp.isEnabled ? 'ON' : 'OFF' });
    })
  });
};

const $button = document.getElementById('button');
$button.addEventListener('click', sendToggleMessage);

