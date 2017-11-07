import { button, popup } from './components';
import { fetchData, getContentFromData } from './utils';

let isExtensionEnabled = true;

window.chrome.runtime.onMessage.addListener((request) => {
  isExtensionEnabled = request;
});

function clickHandler(event) {
  if (!isExtensionEnabled) return;

  const selectedText = window.getSelection().toString();

  if (selectedText.length === 0) {
    button.changeVisibility(false);

    return;
  }

  popup.changeVisibility(false);
  button.setPosition(event.pageX, event.pageY);
  button.changeVisibility(true);

  fetchData(selectedText)
    .then((data) => {
      popup.renderContent(getContentFromData(data));
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener('click', clickHandler);
