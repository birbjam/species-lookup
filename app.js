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

L.marker([39.724578563018255, -123.61895787374944])
  .addTo(map)
  .bindPopup('Stuff will go here')

// var L = require('leaflet');

// var mymap = L.map('mapid').setView(
//   [39.724578563018255, -123.61895787374944],
//   11
// )

// var OpenTopoMap = L.tileLayer(
//   'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
//   {
//     maxZoom: 17,
//     attribution:
//         'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//   }
// ).addTo(mymap)
