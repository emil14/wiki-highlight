"use strict";

window.addEventListener('click', () => {
  const selectedText = window.getSelection().toString();

  if (selectedText.length === 0) return;

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
