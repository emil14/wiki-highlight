"use strict";

function logSelectedText () {
  const selection = window.getSelection()
  const selectionIsEmpty = selection.anchorNode.length === 0

  if (!selectionIsEmpty) {
    const selectedText = selection.toString();

    console.log(selectedText);
  }
}

window.addEventListener('click', () => {
  logSelectedText()

  fetch('http://en.wikipedia.org/w/api.php?action=query&format=json', {
    method: 'POST',
    headers: new Headers({
      Api-User-Agent: 'Wiki-Highlight/0.0.1 (https://github.com/emil14/wiki-highlight)'
    })
  })
    .then(resp => {
      console.log(resp.json())
    })
});
