function displayNews(articles) {
  const newsDiv = document.getElementById('news')
  for (i = 0; i < articles.length; i++) {
    const article = articles[i]
    const articleDiv = document.createElement('div')
    const title = document.createElement('a')
    title.innerHTML = article.title
    title.href = article.url
    articleDiv.append(title)
    newsDiv.appendChild(articleDiv)
  }
}

async function logJSONData() {
  const url =
    'https://newsapi.org/v2/top-headlines?country=tr&apiKey=92b381d24198400db19db155dc0e5945'
  await fetch(url)
    .then((response) => response.json())
    .then((data) => displayNews(data.articles))
}

logJSONData()
