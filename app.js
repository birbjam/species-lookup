// Opens the map at user's current location
navigator.geolocation.getCurrentPosition(function (location) {
  var latlng = new L.LatLng(
    location.coords.latitude,
    location.coords.longitude
  )

  // Satellite map layer
  var satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
  )

  // Topo map layer
  var topo = L.tileLayer(
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 17,
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }
  )

  // Initializes map
  var map = L.map('map', {
    layers: [satellite, topo]
  }).setView(latlng, 13)
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
  }).addTo(map)

  var baseMaps = {
    'Default Map': map,
    'Topo': topo,
    'Satellite': satellite
  }

  L.control.layers(baseMaps).addTo(map)

  // Optional: adds a marker to current location
  // var marker = L.marker(latlng).addTo(map)

  // Waits for a click event
  map.on('click', addMarker)

  var infoMarker = L.marker(map.getCenter())
  var queryURLRoot = 'https://specieslookup.berkeley.edu/search_json/'

  // When map is clicked add a marker to it
  function addMarker (e) {
    infoMarker.setLatLng(e.latlng).addTo(map)

    // Status loading message
    infoMarker.bindPopup('Looking for species. Please Wait ...')
    infoMarker.openPopup()

    // Construct the URL to query by appending the lat/lng of the marker location that was clicked
    queryURL = queryURLRoot + e.latlng.lng + ',' + e.latlng.lat

    $.getJSON(queryURL, function (data) {
      var htmlText = 'Species Lookup Results:'
      $.each(data.species, function (key, val) {
        htmlText =
        htmlText +
        '<li><a href="' +
        val.url +
        ' target=_blank">' +
        val.scientific_name +
        '</a></li>'
      })

      // Update the marker text
      infoMarker.bindPopup(htmlText)
      infoMarker.updatePopup()
    })
  }
})

// Save this for topo map display
// var topo = L.tileLayer(
//   'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
//   {
//     maxZoom: 17,
//     attribution:
//         'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//   }
// ).addTo(map)

// Satellite map display
// var satellite = L.tileLayer(
//   "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//   {
//     attribution:
//       "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
//   }
// );
