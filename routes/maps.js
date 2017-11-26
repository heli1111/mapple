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

    // render single map page
    router.get('/:map_id', (req, res) => {
        // TODO: get map data from database
        let map = knex('maps').where('map_id', req.params.map_id).first();
        map.then((result) => {
            console.log(result);
            let templateVars = {
                user_id: req.params.user_id,
                map_id: req.params.map_id,
                map: result
            };
            res.render('map', templateVars);
        }).catch((err) => {
            res.status(500).send(err);
        });
    });

    // create new map
    router.post('/', (req, res) => {
        let map = {
            map_name: req.body.name,
            map_description: req.body.description,
            map_createdAt: Date.now(),
            map_last_updated: Date.now(),
            map_latitude: req.body.latitude,
            map_longitude: req.body.longitude,
            map_user_id: req.params.user_id
        };
        knex.insert(map).into('maps');
        res.render('OK');
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