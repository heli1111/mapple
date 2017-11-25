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
      window.location.href = '/';
    })
  })

 $('#logout').click( function () {
   event.preventDefault();

   $.ajax({
     url: '/logout',
     method: 'POST'
   }).done( function() {
      window.location.href = '/';
   })
 })





})

