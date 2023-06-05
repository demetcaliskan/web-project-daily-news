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
      handleLocation(user)
      // ...
    } else {
      // User is signed out
      // ...
      window.location.assign('/welcome.html')
    }
  })
}

// Initialize and add the map
let map
let latitude
let longitude
let country

async function initMap() {
  // The location of Ankara
  const initialPosition = { lat: 39.92, lng: 32.86 }
  // Request needed libraries.
  //@ts-ignore
  const { Map, InfoWindow } = await google.maps.importLibrary('maps')
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')

  // The map, centered at Ankara
  map = new Map(document.getElementById('map'), {
    zoom: 5,
    center: initialPosition,
    mapId: 'DEMO_MAP_ID',
  })
  const infoWindow = new InfoWindow()

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    gmpDraggable: true,
    position: initialPosition,
  })

  marker.addListener('dragend', async (event) => {
    const pos = marker.position
    latitude = pos.lat
    longitude = pos.lng
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=AIzaSyDhZfYJFaq2CtCTU_x9TU0qJ1fxJ2A7Gh0`
    )
      .then((response) => response.json())
      .then((data) => {
        const addressComponents = data.results[0].address_components
        if (
          addressComponents[addressComponents.length - 1].types[0] === 'country'
        ) {
          country = {
            name: addressComponents[addressComponents.length - 1].long_name,
            code: addressComponents[addressComponents.length - 1].short_name,
          }
        } else if (
          addressComponents[addressComponents.length - 2].types[0] === 'country'
        ) {
          country = {
            name: addressComponents[addressComponents.length - 1].long_name,
            code: addressComponents[addressComponents.length - 1].short_name,
          }
        }
        const locationArr = data.plus_code.compound_code.split(' ')
        infoWindow.close()
        infoWindow.setContent(
          `Pin dropped at: ${locationArr[locationArr.length - 2]} ${
            locationArr[locationArr.length - 1]
          }`
        )
        infoWindow.open(marker.map, marker)
      })
  })
}

function handleLocation(user) {
  const database_ref = database.ref()
  const user_data = {
    location: {
      lat: latitude,
      lng: longitude,
      country: country,
    },
  }
  database_ref.child('users/' + user.uid).update(user_data)
  alert('yeyy location pickedd!')
  window.location.assign('/index.html')
}

initMap()
