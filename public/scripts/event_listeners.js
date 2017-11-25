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
    })
  })
})

  //event listener for submitting new map





//to the server.js file

// app.post('/login', (req, res) => {
//   let loggedUser = "";
//   let emailCheck = function () {
//     for (person in users) {
//       if (users[person].email === req.body.email) {
//         loggedUser = users[person].id;
//       }
//     }
//   }()
//   if (loggedUser) {
//     if (bcrypt.compareSync(req.body.password, users[loggedUser].hashedPassword)) {
//       req.session.user_id = loggedUser;
//       res.redirect('/urls');
//     } else {
//       res.status(403).send('Incorrect password.');
//     }
//   } else {
//     res.status(403).send('This email address is not registered');
//   }
// })
