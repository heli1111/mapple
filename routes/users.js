//users.js
//routes for users
"use strict";

const express = require('express');
const router = express.Router({mergeParams: true});

module.exports = (knex) => {

    // users redirects to maps
    router.get('/', (req, res) => {
      res.redirect('/maps/');
    });

    // renders user profile
    router.get('/:user_id', (req, res) => {
        let templateVars = {
          user: req.session.user_id
        };
        res.render('index', templateVars);
    });

    return router;

}
