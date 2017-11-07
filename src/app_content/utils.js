export function getContentFromData(resp) {
  return Object.values(resp.query.pages)[0].revisions[0]['*'];
}

export function fetchData(text) {
  const apiUrl = new window.URL('https://en.wikipedia.org/w/api.php');
  const userAgent = 'Wiki Highlight (https://github.com/emil14/wiki-highlight)';
  const searchParams = {
    action: 'query',
    format: 'json',
    prop: 'revisions',
    rvprop: 'content',
    rvsection: 0,
    titles: text,
  };

  Object.keys(searchParams).forEach((key) => {
    apiUrl.searchParams.append(key, searchParams[key]);
  });

  return new Promise((resolve, reject) => {
    window.fetch(apiUrl, {
      method: 'POST',
      headers: new window.Headers({ 'Api-User-Agent': userAgent }),
    })
      .then(resp => resp.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

