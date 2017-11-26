"use strict";

require('dotenv').config();

const PORT           = process.env.PORT || 8080;
const ENV            = process.env.ENV || "development";
const express        = require("express");
const bodyParser     = require("body-parser");
const cookieSession  = require("cookie-session");
const sass           = require("node-sass-middleware");
const app            = express();
const knexConfig     = require("./knexfile");
const knex           = require("knex")(knexConfig[ENV]);
const morgan         = require('morgan');
const knexLogger     = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const mapsRoutes = require("./routes/maps");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(cookieSession( {
  name: 'session',
  keys: ['mapplekey']
  }));
app.use(express.static("public"));



//-----------------------------------------------------------------------------
//routes

app.use('/users', usersRoutes(knex));
app.use('/maps', mapsRoutes(knex));

app.get('/', (req, res) => {
  var templateVars = {
    user: req.session.user_id
  }
  res.render('index', templateVars);
})

app.post('/login', (req, res) => {

  let comparePassword = (passwordEntered, passwordStored) => {
    return (passwordEntered === passwordStored);
  }

  knex
    .select('user_password','user_id')
    .from('users')
    .where('user_username', req.body.username)
    .then( (result) => {
      if (comparePassword(req.body.password, result[0].user_password)) {
        req.session.user_id = result[0].user_id;
        res.redirect('/');
      }
    })
    .catch( (err) => {
      res.status(403).send('Incorrect credentials')
    })
})

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
