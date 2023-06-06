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
          setProfileData(user)
        })

      // ...
    } else {
      // User is signed out
      // ...
      window.location.assign('/welcome.html')
    }
  })
}

function setProfileData(userData) {
  const nameElement = document.getElementById('name')
  const emailElement = document.getElementById('email')
  const locationElement = document.getElementById('location')
  nameElement.setAttribute('value', userData.full_name)
  emailElement.setAttribute('value', userData.email)
  locationElement.setAttribute('value', userData.location.address)
}

function changeNameEnabled() {
  const profileContainer = document.getElementById('profile-container')
  const changeButton = document.createElement('button')
  changeButton.id = 'change-button'
  changeButton.innerText = 'Save Name'
  changeButton.classList.add('profile-save-button')
  changeButton.onclick = updateName
  const nameInput = document.getElementById('name')
  nameInput.disabled = false
  const changeNameText = document.getElementById('change-name')
  profileContainer.removeChild(changeNameText)
  profileContainer.append(changeButton)
}

function updateName() {
  const user = auth.currentUser
  const nameInput = document.getElementById('name')
  const nameValue = nameInput.value
  const database_ref = database.ref('users')
  database_ref
    .child(user.uid)
    .update({ full_name: nameValue })
    .then(() => {
      location.reload()
    })
    .catch((err) => {
      alert('there was a problem!')
    })
}

checkAuth()
