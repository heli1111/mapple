$(document).ready( function (){

  //event listener for login
  $('#login').click( function() {
    event.preventDefault();


    var username = $('#login-username').val();
    var password = $('#login-password').val();

    $.ajax({
      url: '/login',
      method: 'POST',
      data: {username, password}
    }).done( function() {
      window.location.reload();
    })
  })

  //event listener for logout
  $('#logout').click( function () {
    event.preventDefault();

    $.ajax({
      url: '/logout',
      method: 'POST'
    }).done( function() {
      window.location.reload();
    })
  })

  //event listener for redirection to new map
  $('#new-map').click( function () {
    event.preventDefault();

    window.location.href = '/maps/new';
  })

  var mapImageURL = function (lat, lng) {
    return mapImage = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=8&size=640x640&key=AIzaSyCuw3H9Ze9hLg4XxnnJA6EpzPYs1CAK6qU`
  }

  //event listener for creating new map
  // $('#addMapSave').click( function () {
  //   event.preventDefault();

  //   var mapName = $('#addMapName').val()
  //   var mapDescription = $('#addMapDescription').val()
  //   var mapLatitude = $('#addMapLatitude').val()
  //   var mapLongitude = $('#addMapLongitude').val()
  //   var mapImage = mapImageURL(mapLatitude, mapLongitude)

  //   var newMapData = {
  //     name: mapName,
  //     description: mapDescription,
  //     image: mapImage,
  //     createdAt: Date.now(),
  //     latitude: mapLatitude,
  //     longitude: mapLongitude
  //   }

  //   $.ajax({
  //     url: '/new',
  //     method: 'POST',
  //     data: newMapData
  //   }).

  //   // window.location.href = '/maps/new';
  // })

  //event listener for redirecting to user's maps
  $('#my-maps').click( function () {
    event.preventDefault();

    //?????????????????
  })

  //event listener for editing a map
  $(' BUTTON ').click( function () {
    event.preventDefault();
    var mapId = window.location.pathname;

    $.ajax({
      url: '/:map_id/update',
      method: 'POST'
    }).done( function() {
      window.location.reload();
    })
  })

})

