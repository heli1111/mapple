//jl map routes
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

    router.get('/load', (req, res) => {
      console.log('hello')
        knex
        .select('*')
        .from('maps')
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

    //render create new map page
    router.get('/new', (req,res) =>{
      if (req.session.user_id) {
        let templateVars = {
          user: req.session.user_id
        }

        console.log('landed at mapnew')
        res.render('mapnew', templateVars);
        return

      }
      res.redirect('/maps/');
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
            map_user_id: req.body.user_id
        };
        console.log(map);
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

    // render single map page
    router.get('/:map_id/pins', (req, res) => {

        knex
          .select('*')
          .from('pins')
          .where('pin_map_id', req.params.map_id)
          .then( (result) => {
            res.json(result)
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

      console.log('yesss')
      console.log(req.body)
      // dataToInsert = {
      //       map_name:         req.body.name,
      //       map_description:  req.body.description,
      //       map_image:        req.body.image,
      //       map_createdAt:    req.body.createdAt,
      //       map_last_updated: req.body.createdAt,
      //       map_latitude:     req.body.coords.lat,
      //       map_longitude:    req.body.coords.lng,
      //       map_user_id:      req.body.user
      // }

        // knex
        //   .insert([{

        //     }])
        //   .returning('map_id')
        //   .into("maps")
        //   .then( (id) => {
        //     res.redirect(`/maps/${id}`)
        //     })
        //   .catch( (err) => {
        //     res.status(501).send('Error happened, map cannot be created');
        //   })
        res.redirect('/')
      }
    });

    // favor a map
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
      console.log('user_id: ' + JSON.stringify(user_id));
      if (user_id) {
        knex("maps")
          .where("map_id", req.params.map_id)
          // .returning("map_id") //if something need to be returned
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
      console.log('user_id: ' + JSON.stringify(user_id));
      console.log('map_id: ' + req.params.map_id);

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
