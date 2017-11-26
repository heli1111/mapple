"use strict";

const express = require('express');
const router = express.Router({mergeParams: true});

module.exports = (knex) => {

    // // get list of pins
    // router.get('/', (req, res) => {
    //     // TODO: should get pins for current map only
    //     let pins = knex.select().from('pins');
    //     pins.then((result) => {
    //         res.json(result);
    //     }).catch((err) => {
    //         res.status(500).send(err);
    //     });
    // });

    // // get single pin
    // router.get('/:pin_id', (req, res) => {
    //     let pin = knex('pins').select().where('pin_id', req.params.pin_id);
    //     pin.then((result) => {
    //         res.json(result);
    //     }).catch((err) => {
    //         res.status(500).send(err);
    //     });
    // });

    // create single pin
    router.post('/new', (req, res) => {
      if(req.session.user_id) {
        knex
          .insert([{
            pin_name:         req.body.name,
            pin_description:  req.body.description,
            pin_image:        req.body.image,
            pin_createdAt:    req.body.createdAt,
            pin_latitude:     req.body.coords.lat,
            pin_longitude:    req.body.coords.lng,
            pin_map_id:       req.body.map_id,
            pin_user_id:      req.session.user_id
            }])
          .into("pins")
          .then( (result) => {
            res.status(201);
            })
          .catch( (err) => {
            res.status(501).send('Error happened, map cannot be created');
          })
      }
    });

    router.post("/:pin_id", (req, res) => {
      if(req.session.user_id) {
        knex("pins")
          .where("pins.pin_id", req.params.pin_id)
          // .returning("map_id") //if something need to be returned
          .update({
            pin_id:           undefined, //cannot change
            pin_name:         req.body.name,
            pin_description:  req.body.description,
            pin_image:        req.body.image,
            pin_createdAt:    undefined, //cannot change
            pin_latitude:     req.body.coords.lat,
            pin_longitude:    req.body.coords.lng,
            pin_map_id:       undefined, //cannot change
            pin_user_id:      undefined //cannot change
            })
          .then( (result) => {
            res.status(202);
            })
          .catch( (err) => {
            res.status(501);
            })
      }
    }),

    // delete single pin
    router.delete("/:pin_id", (req, res) => {
      if(req.session.user_id) {
        knex("pins")
          .where("pins.map_id", req.body.map_id)
          .andWhere("pins.pin_id", req.params.pin_id)
          .del()
          .then( (result) => {
            res.status(202);
            })
          .catch( (err) => {
            res.status(501);
            })
      }
    })

    return router;
}
