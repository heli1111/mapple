//event_listeners.js
//general events

$(document).ready(() => {

  //helper variables to identify path, user and page
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

  var mapImageURL = function (lat, lng) {
    return mapImage = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=8&size=640x640&key=AIzaSyCuw3H9Ze9hLg4XxnnJA6EpzPYs1CAK6qU`
  }


})

