"use strict";

window.addEventListener('click', () => {
  const selection = window.getSelection();
  const selectionIsEmpty = selection.anchorNode.length === 0;

  if (selectionIsEmpty) return;

  const selectedText = selection.toString();
  const params = {
    action: 'query',
    format: 'json',
    prop: 'revisions',
    rvprop: 'content',
    rvsection: 0,
    titles: selectedText
  };
  const url = new URL('https://en.wikipedia.org/w/api.php');

  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });

  fetch(url, {
    method: 'POST',
    headers: new Headers({
      'Api-User-Agent': 'Wiki-Highlight/0.0.1 (https://github.com/emil14/wiki-highlight)'
    })
  })
    .then(resp => resp.json())
    .then(data => {
      console.log(data.query.pages);
    })
    .catch(err => {
      console.log(err);
    });
});
