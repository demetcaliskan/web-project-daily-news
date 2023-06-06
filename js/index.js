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

function logout() {
  auth
    .signOut()
    .then(() => {
      alert('Bye :(')
      window.location.assign('/welcome.html')
    })
    .catch((error) => {
      console.log(error)
    })
}

function checkAuth() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      const uid = user.uid
      const database_ref = database.ref('users')
      database_ref
        .child(uid)
        .get()
        .then((snap) => {
          const userData = snap.val()
          logJSONData(userData)
        })

      // ...
    } else {
      // User is signed out
      // ...
      window.location.assign('/welcome.html')
    }
  })
}

function displayWeather(weather, userData) {
  const userTitle = document.getElementById('welcome')
  userTitle.innerHTML = `Welcome ${userData.full_name}!`

  const temp = weather.current.temp
  const state = weather.current.weather[0].description
  const iconSrc = `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
  const weatherDiv = document.getElementById('weather')
  const weatherTemp = document.createElement('p')
  const weatherTitle = document.createElement('p')
  const weatherAddress = document.createElement('p')
  const weatherIcon = document.createElement('img')
  weatherTemp.innerHTML = `${temp} °C`
  weatherTitle.innerHTML = state
  weatherAddress.innerHTML = `at ${userData.location.address}`
  weatherIcon.src = iconSrc
  weatherTemp.classList.add('weather-temp')
  weatherTitle.classList.add('weather-title')
  weatherAddress.classList.add('weather-title')
  weatherIcon.classList.add('weather-icon')
  weatherDiv.append(weatherIcon)
  weatherDiv.append(weatherTemp)
  weatherDiv.append(weatherTitle)
  weatherDiv.append(weatherAddress)
}

function displayNews(articles) {
  const newsDiv = document.getElementById('news')
  for (i = 0; i < articles.length; i++) {
    const article = articles[i]
    if (article.author) {
      const articleContainer = document.createElement('div')
      const articleImage = document.createElement('img')
      const articleContentWrapper = document.createElement('div')
      const title = document.createElement('a')
      const description = document.createElement('p')
      articleImage.src = article.media
      title.innerHTML = article.title
      title.href = article.link
      title.target = '_blank'
      description.innerText = article.excerpt
      articleContainer.classList.add('article-container')
      articleContentWrapper.classList.add('article-content-wrapper')
      articleImage.classList.add('article-image')
      title.classList.add('article-title')
      description.classList.add('article-description')
      articleContentWrapper.append(title)
      articleContentWrapper.append(description)
      articleContainer.append(articleImage)
      articleContainer.append(articleContentWrapper)
      newsDiv.appendChild(articleContainer)
    }
  }
}

async function logJSONData(userData) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${userData.location.lat}&lon=${userData.location.lng}&units=metric&appid=e7466bf20cece8363cf34ef99d82a053`
  await fetch(weatherUrl, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => displayWeather(data, userData))
  const newsUrl =
    'https://api.newscatcherapi.com/v2/latest_headlines?countries=TR&lang=tr&when=24h'
  await fetch(newsUrl, {
    method: 'GET',
    headers: {
      'x-api-key': 'kYXqLROaaj4LPSZFzZ6sPsc7l0pCEhYgjLm4uYGT4sE',
    },
  })
    .then((response) => response.json())
    .then((data) => displayNews(data.articles))
}

checkAuth()
