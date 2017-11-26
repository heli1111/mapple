$(document).ready(() => {

  var currentPage = window.location.pathname;
  var currentUser = Number($('#currentUser').text());
  var usersPage   = Number(window.location.pathname.slice(7))

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
      window.location.href = '/maps/';
    })
  })

  //event listener for redirection to new map
  $('#new-map').click( function () {
    event.preventDefault();

    window.location.href = '/maps/new';
  })
  //event listener for redirecting to user's maps
  $('#my-maps').click( function () {
    event.preventDefault();

    window.location.href = `/users/${currentUser}`
  })

  // $('#addMapSave').click( function () {
  //   event.preventDefault();

  //   var mapURL = mapImageURL($('#addMapLatitude').val(), $('#addMapLongitude').val());

  //   data = {
  //           map_name: $('#addMapSave').val(),
  //           map_description: $('#addMapDescription').val(),
  //           map_createdAt: new Date(),
  //           map_last_updated: new Date(),
  //           map_image: mapURL,
  //           map_latitude: $('#addMapLatitude').val(),
  //           map_longitude: $('#addMapLongitude').val(),
  //           map_user_id: currentUser
  //         };

  //   $.ajax({
  //     url: '/maps/new',
  //     method: 'POST',
  //     data: data
  //   }).done( function () {

  //   })
  // })

  var mapImageURL = function (lat, lng) {
    return mapImage = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=8&size=640x640&key=AIzaSyCuw3H9Ze9hLg4XxnnJA6EpzPYs1CAK6qU`
  }


})

