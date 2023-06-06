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
          const user = snap.val()
          setData(user)
        })

      // ...
    } else {
      // User is signed out
      // ...
      window.location.assign('/welcome.html')
    }
  })
}

function setData(userData) {
  const nameElement = document.getElementById('contact-name')
  const emailElement = document.getElementById('contact-email')
  nameElement.setAttribute('value', userData.full_name)
  emailElement.setAttribute('value', userData.email)
}

function submitFunction() {
  alert('Your valuable comments will be taken into consideration.')
  window.location.reload()
}

checkAuth()
