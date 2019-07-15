// Initialize leaflet.js
var L = require('leaflet')

// Initialize the map
var map = L.map('map', {
  scrollWheelZoom: true
})

// Set the position and zoom level of the map
map.setView([39.724578563018255, -123.61895787374944], 11)

// Initialize the base layer
var osm_mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// Add marker with a popup.
var popup = L.marker([39.724578563018255, -123.61895787374944])
  .addTo(map)
  .bindPopup('<p class="data"></p>')

// Fetching the data
var queryURL =
  'https://specieslookup.berkeley.edu/search_json/-123.61895787374944,39.724578563018255';

fetch(queryURL, {
  method: 'GET'
})
  .then(result => result.json())
  .then(response => {
    document.querySelector('.data').innerText = `Class: ${response.species[0].class}`
  })

// Save this for topo map display
// var OpenTopoMap = L.tileLayer(
//   'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
//   {
//     maxZoom: 17,
//     attribution:
//         'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//   }
// ).addTo(mymap)
