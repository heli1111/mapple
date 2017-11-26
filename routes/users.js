//jl user routes
"use strict";

const express = require('express');
const router = express.Router({mergeParams: true});

module.exports = (knex) => {

    const mapRoutes = require('./maps');

    // get list of users
    router.get('/', (req, res) =>{
        let users = knex.select().from('users');
        users.then((result)=>{
            res.json(result);
        }).catch((err)=>{
            res.status(500).send(err);
        });
    });

    // renders user profile
    router.get('/:user_id', (req, res) => {
        // TODO: check for authorization
        let templateVars = {
          user: req.session.user_id
        };
        res.render('index', templateVars);
    });

    // create user
    // TODO: needs to hash password
    router.post('/', (req, res) => {
        // use body-parser to insert into db
        let user = {
            user_id: req.body.id,
            user_username: req.body.username,
            user_password: req.body.password,
            user_email: req.body.email,
        }
        // TODO: validate if insert was successful
        knex.insert(user).into('users');
        res.render("OK");
    });

    // // update user
    // router.put('/:user_id', (req, res) => {
    //     // TODO
    // });

    // // delete user
    // router.delete("/:user_id", (req, res) => {
    //     // TODO: check for authorization
    //     // TODO: check for db errors
    //     knex('users').where('user_id', req.params.user_id).del();
    // });

    router.use('/:user_id/maps', mapRoutes(knex));

    return router;

}
