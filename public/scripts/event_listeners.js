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

  //event listener for adding new map
  $('#new-map').click( function () {
    event.preventDefault();

    window.location.href = '/maps/new';
  })

  //event listener for redirecting to user's maps
  $('#my-maps').click( function () {
    event.preventDefault();

    //?????????????????
  })

  //event listener for editing a map
  $(' BUTTON ').click( function () {
    event.preventDefault();


    $.ajax({
      url: '/:map_id/update',
      method: 'POST'
    }).done( function() {
      window.location.reload();
    })
  })

})

