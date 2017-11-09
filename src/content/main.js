import { Button, Popup } from './components';
import { fetchData, getContentFromData } from './api';

const { chrome, getSelection, addEventListener } = window;
const popup = new Popup('wikiHighlightPopup');
const button = new Button('wikiHighlightButton', 'show popup', (self) => {
  self.setVisibility(false);
  popup.setVisibility(true);
});

let isExtensionEnabled = true;

chrome.runtime.onMessage.addListener((request) => {
  isExtensionEnabled = request;
});

function clickHandler(event) {
  if (!isExtensionEnabled) return;

  const selectedText = getSelection().toString();

  if (selectedText.length === 0) {
    button.setVisibility(false);
    return;
  }

  popup.setVisibility(false);
  button.setPosition(event.pageX, event.pageY);
  button.setVisibility(true);

  fetchData(selectedText)
    .then((data) => {
      popup.renderContent(getContentFromData(data));
    })
    .catch((err) => {
      console.log(err);
    });
}

addEventListener('click', clickHandler);
