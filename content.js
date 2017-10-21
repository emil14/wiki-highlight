"use strict";

function getContentFromData (resp) {
  return Object.values(resp.query.pages)[0].revisions[0]['*'];
}

function showButtonOnCoords (x, y) {
  const findButton = () => document.getElementById('wikiHighlightButton');
  const buttonExist = findButton() !== null;
  const button = buttonExist
    ? findButton()
    : document.createElement('button');

  button.style.left = `${x}px`;
  button.style.top = `${y}px`;

  if (button.style.display === 'none') button.style.display = 'block';

  if (!buttonExist) {
    button.id = 'wikiHighlightButton';
    button.innerHTML = 'Show Wiki';
    button.style.position = 'absolute';

    document.body.appendChild(button);
  }
}

function hideButton () {
  const findButton = () => document.getElementById('wikiHighlightButton');
  const buttonExist = findButton() !== null;

  if (buttonExist) findButton().style.display = 'none';
}

function renderContent (content) {
  console.log(content)
}

function fetchData (text) {
  const apiUrl = new URL('https://en.wikipedia.org/w/api.php');
  const userAgent = 'Wiki Highlight (https://github.com/emil14/wiki-highlight)';
  const searchParams = {
    action: 'query',
    format: 'json',
    prop: 'revisions',
    rvprop: 'content',
    rvsection: 0,
    titles: text
  };

  Object.keys(searchParams).forEach(key => {
    apiUrl.searchParams.append(key, searchParams[key]);
  });

  return new Promise((resolve, reject) => {
    fetch(apiUrl, {
      method: 'POST',
      headers: new Headers({ 'Api-User-Agent': userAgent })
    })
      .then(resp => resp.json())
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  })
}

function handleClickEvent (event) {
  const selectedText = window.getSelection().toString();

  if (selectedText.length === 0) {
    hideButton();
    return;
  }

  fetchData(selectedText)
    .then(data => {
      showButtonOnCoords(event.pageX, event.pageY);
      renderContent(getContentFromData(data));
    });
}

window.addEventListener('click', handleClickEvent);
