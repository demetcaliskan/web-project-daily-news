function displayNews(articles) {
  const newsDiv = document.getElementById('news')
  for (i = 0; i < articles.length; i++) {
    const article = articles[i]
    const articleDiv = document.createElement('div')
    const title = document.createElement('a')
    title.innerHTML = article.title
    title.href = article.link
    articleDiv.append(title)
    newsDiv.appendChild(articleDiv)
  }
}

async function logJSONData() {
  const url =
    'https://api.newscatcherapi.com/v2/latest_headlines?countries=TR&lang=tr&when=24h'
  await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': 'cnDKBtGz9fNseStWAhMGnQgC1dT7mahtZkkKAfJXt-4',
    },
  })
    .then((response) => response.json())
    .then((data) => displayNews(data.articles))
}

logJSONData()
