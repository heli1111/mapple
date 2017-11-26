//jl map routes
"use strict";

const express = require('express');
const router = express.Router({mergeParams: true});

module.exports = (knex) => {

    const pinRoutes = require('./pins');

    // get list of maps
    router.get('/', (req, res) => {
        knex
          .select('*')
          .from('maps')
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
    });

    // render create new map page
    router.get('/new', (req,res) =>{
      if (req.session.user_id) {
        let templateVars = {
          user: req.session.user_id
        }
        console.log('landed at mapnew')
        // res.render('mapnew', templateVars);
      }

      else {
        res.redirect('/');
      }
    });

    // render single map page
    router.get('/:map_id', (req, res) => {

        knex
          .from('maps')
          .where('map_id', req.params.map_id)
          .then( (result) => {

            let templateVars = {
              user: req.session.user_id,
              map: result[0]
            }

            res.render('map', templateVars);

        }).catch((err) => {
            res.status(500).send(err);
        });
    });

    // create new map
    router.post('/new', (req, res) => {
      if(!req.session.user_id) {
        res.redirect('/')
      }

      else {

        knex
          .insert([{
            map_name:         req.body.name,
            map_description:  req.body.description,
            map_image:        req.body.image,
            map_createdAt:    req.body.createdAt,
            map_last_updated: req.body.createdAt,
            map_latitude:     req.body.coords.lat,
            map_longitude:    req.body.coords.lng,
            map_user_id:      req.body.user
            }])
          .returning('map_id')
          .into("maps")
          .then( (id) => {
            res.redirect(`/maps/${id}`)
            })
          .catch( (err) => {
            res.status(501).send('Error happened, map cannot be created');
          })
      }
    });

    // favor a map
    router.post('/:map_id/favor', (req, res) => {
      if (req.session.user_id) {
      knex
        .insert([{
          map_id:  req.params.map_id,
          user_id: req.session.user_id
          }])
        .into("favorites")
        .then( (result) => {
          res.status(201);
          })
        .catch( (err) => {
          res.status(501).send('Error happened, map cannot be favored');
          })
      }
    });

    // update map
    router.post('/:map_id/update', (req, res) => {
      if (req.session.user_id) {
        knex("maps")
          .where("maps.map_id", req.params.id)
          // .returning("map_id") //if something need to be returned
          .update({
            map_id:           undefined, //cannot change
            map_name:         req.body.name,
            map_description:  req.body.description,
            map_image:        req.body.image,
            map_createdAt:    undefined, //cannot change
            map_last_updated: req.body.last_updated,
            map_latitude:     req.body.coords.lat,
            map_longitude:    req.body.coords.lng,
            map_user_id:      undefined //cannot change
            })
          .then( (result) => {
            res.status(202);
            })
          .catch( (err) => {
            res.status(501);
            })
      }
    });

    // delete map
    router.post('/:map_id/delete', (req, res) => {
      if (req.session.user_id) {
        knex("maps")
          .where("maps.map_id", req.params.id)
          .del()
          .then( (result) => {
            res.status(202);
            })
          .catch( (err) => {
            res.status(501);
            })
      }
    });

    router.use('/:map_id/pins', pinRoutes(knex));

    return router;
}
