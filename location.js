// Initialize and add the map
let map

async function initMap() {
  // The location of Uluru
  const initialPosition = { lat: 39.92, lng: 32.86 }
  // Request needed libraries.
  //@ts-ignore
  const { Map, InfoWindow } = await google.maps.importLibrary('maps')
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')

  // The map, centered at Uluru
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
    console.log('marker', marker)
    const pos = marker.position
    console.log('pos', pos)
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=AIzaSyDhZfYJFaq2CtCTU_x9TU0qJ1fxJ2A7Gh0`
    )
      .then((response) => response.json())
      .then((data) => {
        const locationArr = data.plus_code.compound_code.split(' ')
        infoWindow.close()
        infoWindow.setContent(
          `Pin dropped at: ${locationArr[locationArr.length - 2]} ${
            locationArr[locationArr.length - 1]
          }`
        )
        infoWindow.open(marker.map, marker)
      })

    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${pos.lat}&lon=${pos.lng}&exclude={part}&appid=e7466bf20cece8363cf34ef99d82a053`
    )
    console.log('weather', weatherData)
  })
}

initMap()
