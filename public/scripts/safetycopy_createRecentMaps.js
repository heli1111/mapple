//----------------------------------------------------------------------------
// these functions compile the maps on the maps (main) page ordered by time of the last update

//creates a new container div element and appends to the recent maps container
function createRecentMapContainer(index) {
  $('#recent-maps-container')
  .append(
    $("div").addClass("col-md-4")
      .append(
        $("div").attr("id", `map${index}`)
      )
  )
}

//creates a new google map instance
function createNewMap(map, index) {
  return newMap = new google.maps.Map(document.getElementById(`map${index}`), {
    center: {
      lat: Number(map.map_latitude),
      lng: Number(map.map_longitude)
    },
    zoom: 8 //arbitrarily selected default value based on Google's zoom level options
  })
}

//adds markers that belong to a map, and infowindows to the markers
function addMarkersToMap(map, pins) {

  var markers = pins.filter( function(pin) {
    pin.pin_map_id === map.map_id;
  })

  markers.forEach( function(marker) {

    var markerInfo =
      { coords:
          { lat: marker.pin_latitude,
            lng: marker.pin_longitude },
        name: marker.pin_name,
        description: marker.pin_description,
        image: marker.pin_image
      }

    new google.maps.Marker({
      position: markerInfo.coords,
      map: newMap
    })

    new google.maps.InfoWindow({
      content:
        `<h3>${markerInfo.name || 'Missing pin name'}</h3><br>
        <p>${markerInfo.description || 'Missing pin description'}</p><br>
        <img src="${markerInfo.image}">`
    })

    marker.addListener('click', function () {
      infowindow.open(newMap, marker);
    })
  })
}

//this function compiles a map element using the three sub-functions above
function createRecentMapElement = (map, index, pins) {
  createRecentMapContainer(index);

  createNewMap(map, index);

  addMarkersToMap(map, pins);
}

//helper function for sorting maps from the database by the time of last update
function sortBylastUpdate = (maps) {
  return maps.sort( function (a, b) {
    return b.map_last_updated - a.map_last_updated;
  })
};

//separates the pins data from the maps data
//and loops through the map data adding new map elements to the container
function compileMostRecentMaps (data) {
  var pins = data.pinData;
  sortBylastUpdate(data.mapData).forEach( function (map, index) {
    createRecentMapElement(map, index, pins);
  })
}
