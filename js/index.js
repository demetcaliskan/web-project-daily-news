// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBlCqCOWqu6TF6UT657ngze_QAjnQSAYiA',
  authDomain: 'daily-local-news.firebaseapp.com',
  databaseURL: 'https://daily-local-news-default-rtdb.firebaseio.com',
  projectId: 'daily-local-news',
  storageBucket: 'daily-local-news.appspot.com',
  messagingSenderId: '1035500614044',
  appId: '1:1035500614044:web:4ee3b18cb884b5f9c31859',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

function checkAuth() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      console.log('user', user)
      var uid = user.uid
      logJSONData()
      // ...
    } else {
      // User is signed out
      // ...
      window.location.assign('/welcome.html')
    }
  })
}

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

checkAuth()
