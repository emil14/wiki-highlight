import { Button, Popup } from './components';
import { fetchData, getContentFromData } from './api';

const { chrome, getSelection, addEventListener } = window;

const popup = new Popup('wiki-highlight-popup');
const button = new Button('wiki-highlight-button', 'show popup', (self) => {
  self.setVisibility(false);
  popup.setVisibility(true);
});

function handleClick(show, x, y) {
  if (!show) return;

  const selectedText = getSelection().toString();

  if (selectedText.length === 0) {
    button.setVisibility(false);
    return;
  }

  popup.setVisibility(false);
  button.setPosition(x, y);
  button.setVisibility(true);

  fetchData(selectedText)
    .then((data) => {
      popup.renderContent(getContentFromData(data));
    })
    .catch((err) => {
      console.log(err);
    });
}

addEventListener('click', ({ pageX, pageY }) => {
  chrome.runtime.sendMessage('askMode', (response) => {
    handleClick(response, pageX, pageY);
  });
});
