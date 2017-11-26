//jl map routes
"use strict";

const express = require('express');
const router = express.Router({mergeParams: true});

module.exports = (knex) => {

    const pinRoutes = require('./pins');

    // get list of maps
    router.get('/', (req, res) =>{
        let maps = knex.select().from('maps');
        maps.then((result)=>{
            res.json(result);
        }).catch((err)=>{
            res.status(500).send(err);
        });
    });

    // render create new map page
    router.get('/new', (req,res) =>{
        // check user
        res.render('mapnew');
    });

    // create new map
    router.post('/new', (req, res) => {
        let map = {
            map_name: req.body.name,
            map_description: req.body.description,
            map_createdAt: new Date(),
            map_last_updated: new Date(),
            map_latitude: req.body.latitude,
            map_longitude: req.body.longitude,
            map_image: req.body.image,
            map_user_id: req.params.user_id
        };
        console.log(map);
        knex.insert(map).into('maps').then((result) => {
            res.send('OK');
        }).catch((err) => {
            res.status(500).send(err);
        });
    });

    // render single map page
    router.get('/:map_id', (req, res) => {
        // TODO: get map data from database
        let map = knex('maps').where('map_id', req.params.map_id).first();
        map.then((result) => {
            console.log(result);
            let templateVars = {
                user: req.session.user_id,
                user_id: req.params.user_id,
                map_id: req.params.map_id,
                map: result
            };
            res.render('map', templateVars);
        }).catch((err) => {
            res.status(500).send(err);
        });
    });

    // update map
    router.put('/:map_id', (req, res) => {
        // TODO
    });

    // delete map
    router.delete('/:map_id', (req, res) => {
        // TODO: check for authorization
        // TODO: check for db errors
        knex('maps').where('map_id', req.params.map_id).del();
    });

    router.use('/:map_id/pins', pinRoutes(knex));

    return router;
}
