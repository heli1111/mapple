//this function creates the map image url when a new map is created
//to be used before a POST maps/new request

// required parameters:
// -center: lat, lng
// -zoom
// -size - default of 640x640 suggested
// -(markers)
// -key


var mapImageURL = function (lat, lng, zoom, key) {
  return mapImage =
    `
      https://maps.googleapis.com/maps/api/staticmap?
      center=${lat},${lng}&
      zoom=${zoom}&
      size=640x640&
      key=${key}
    `
}
