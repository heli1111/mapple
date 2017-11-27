//maps.js
//routes for maps

"use strict";

const express = require('express');
const router = express.Router({mergeParams: true});

module.exports = (knex) => {

    const pinRoutes = require('./pins');

    // get list of maps
    router.get('/', (req, res) => {

      let templateVars = {
        user: req.session.user_id
      }
      res.render('index', templateVars)
    })

    //load map data for main map page
    //selecting all map data and attaching the count of likes
    router.get('/load', (req, res) => {
        knex
          .select("maps.*", "fav_count_table.fav_count")
          .from("maps")
          .leftOuterJoin(
            function () {
              this
                .select("favorites.fav_map_id")
                .count("favorites.fav_user_id as fav_count")
                .from("favorites")
                .groupBy("favorites.fav_map_id")
                .as("fav_count_table")
            },
            "fav_count_table.fav_map_id", "maps.map_id")
          .then( (result) => {
            res.json(result);
          })
          .catch( (err) => {
            res.status(400).send('Error happened, maps cannot be loaded');
          })

    });

    //load map data for users page - favorites
    //similar to the previous - difference is that the likes belong to the user
    router.get('/load-user-maps', (req, res) => {

        knex
          .select("maps.*", "fav_count_table.fav_count")
          .from("maps")
          .leftOuterJoin(
            function () {
              this
                .select("favorites.fav_map_id")
                .count("favorites.fav_user_id as fav_count")
                .from("favorites")
                .groupBy("favorites.fav_map_id")
                .as("fav_count_table")
            },
            "fav_count_table.fav_map_id", "maps.map_id")
          .join('favorites', 'maps.map_id', 'favorites.fav_map_id')
          .where('fav_user_id', req.session.user_id)
          .then( (result) => {
            res.json(result);
          })
          .catch( (err) => {
            res.status(400).send('Error happened, maps cannot be loaded');
          })
    });

    //load map data for users page - contributions
    //similar to the previous - difference is that two queries are appended
    //the first collects the maps that the user created
    //the second collects the maps where the user placed a pin
    router.get('/load-user-contributions', (req, res) => {

        knex
          .select("maps.*", "fav_count_table.fav_count")
          .from("maps")
          .leftOuterJoin(
            function () {
              this
                .select("favorites.fav_map_id")
                .count("favorites.fav_user_id as fav_count")
                .from("favorites")
                .groupBy("favorites.fav_map_id")
                .as("fav_count_table")
            },
            "fav_count_table.fav_map_id", "maps.map_id")
          .where('maps.map_user_id', req.session.user_id)
          .then( (result) => {
            let first = result

            knex
              .select("maps.*")
              .max("fav_count_table.fav_count")
              .from("maps")
              .leftOuterJoin(
                function () {
                  this
                    .select("favorites.fav_map_id")
                    .count("favorites.fav_user_id as fav_count")
                    .from("favorites")
                    .groupBy("favorites.fav_map_id")
                    .as("fav_count_table")
                },
                "fav_count_table.fav_map_id", "maps.map_id")
              .join('pins', 'maps.map_id', 'pins.pin_map_id')
              .where('pins.pin_user_id', req.session.user_id)
              .groupBy('maps.map_id')
              .then( (second) => {
                let appended = first.concat(second)
                  res.json(appended);
              })
              .catch( (err) => {
                res.status(400).send('Error happened, maps cannot be loaded');
              })
          })
          .catch( (err) => {
            res.status(400).send('Error happened, maps cannot be loaded');
          })
    });

    //render create new map page
    router.get('/new', (req,res) =>{
      if (req.session.user_id) {
        let templateVars = {
          user: req.session.user_id
        }

        res.render('mapnew', templateVars);
        return

      }
      res.redirect('/maps/');
    });

    // create new map with the applicable data
    //knex inserts data to the maps table
    router.post('/new', (req, res) => {
        let map = {
            map_name: req.body.name,
            map_description: req.body.description,
            map_createdAt: new Date(),
            map_last_updated: new Date(),
            map_latitude: req.body.latitude,
            map_longitude: req.body.longitude,
            map_image: req.body.image,
            map_user_id: req.body.user_id
        };
        knex.insert(map)
        .returning('map_id')
        .into('maps')
        .then((result) => {
          res.send(result)
        }).catch((err) => {
            res.status(500).send(err);
        });
    });

    // render single map page
    router.get('/:map_id', (req, res) => {
        knex
          .select('*')
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

    // favor a map
    //based on the map id and the user id
    router.post('/:map_id/favor', (req, res) => {
      if (req.session.user_id) {

        knex('favorites')
          .insert({
            fav_map_id:  req.params.map_id,
            fav_user_id: req.session.user_id
            })
          .then( (result) => {
            res.status(201);
            res.send('like');
            })
          .catch( (err) => {
            knex('favorites')
              .where('fav_map_id', req.params.map_id)
              .andWhere('fav_user_id', req.session.user_id)
              .del()
              .then(function(result) {
                res.send('unlike')
              })
              .catch( function (err) {
                res.status(501).send('Error happened, map cannot be favored');
              })
            })
          return;
      }
            res.status(403).send('Error happened, map cannot be favored');
    });

    // update map
    router.post('/:map_id', (req, res) => {
      let user_id = req.session.user_id;
      if (user_id) {
        knex("maps")
          .where("map_id", req.params.map_id)
          .update({

            map_name:         req.body.map_name,
            map_description:  req.body.map_description,
          }) .then( (result) => {
            res.status(200).send('map updated!');
          }) .catch( (err) => {
            res.status(500).send(err);
          });
          return;

      }
        res.status(403).send('unauthorized');
    });

    // delete map
    router.delete('/:map_id', (req, res) => {
      let user_id = req.session.user_id;

      if (user_id) {
        knex('pins')
          .where('pin_map_id', req.params.map_id)
          .del()
          .then(() => {
            knex('maps')
              .where('map_id', req.params.map_id)
              .del()
              .then((count) => {
                res.status(200).send('OK');
              }).catch((err) => {
                res.status(500).send(err);
              })
          }).catch((err) => {
            res.status(500).send(err);
          });
        return;
      }
      res.status(403).send('unauthorized');
    });

    router.use('/:map_id/pins', pinRoutes(knex));

    return router;
}
