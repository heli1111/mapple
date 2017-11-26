"use strict";

const express = require('express');
const router = express.Router({mergeParams: true});

module.exports = (knex) => {

    // get list of pins
    router.get('/', (req, res) => {
        // TODO: should get pins for current map only
        let pins = knex('pins').select().where('pin_map_id', req.params.map_id);
        pins.then((result) => {
            res.json(result);
        }).catch((err) => {
            res.status(500).send(err);
        });
    });

    // get single pin
    router.get('/:pin_id', (req, res) => {
        let pin = knex('pins').select().where('pin_id', req.params.pin_id).first();
        pin.then((result) => {
            res.json(result);
        }).catch((err) => {
            res.status(500).send(err);
        });
    });

    // create single pin
    router.post('/new', (req, res) => {
      let user_id = req.session.user_id;
      console.log(user_id);
      let newPin = {
        pin_name:         req.body.pin_name,
        pin_description:  req.body.pin_description,
        pin_image:        req.body.pin_image,
        pin_createdAt:    new Date(),
        pin_latitude:     parseFloat(req.body.pin_latitude),
        pin_longitude:    parseFloat(req.body.pin_longitude),
        pin_user_id:      req.session.user_id,
        pin_map_id:       req.params.map_id
      };
      console.log(newPin);

      if (req.session.user_id) {
        knex('pins').insert(newPin).returning('pin_id').then( (result) => {
            res.status(201).send(result);
        }).catch( (err) => {
            res.status(500).send('Error happened, map cannot be created');
        })
        return
      }
      res.status(403).send("Please log-in!");
    });

    router.post("/:pin_id", (req, res) => {
      if(req.session.user_id) {
        knex("pins")
          .where("pin_id", req.params.pin_id)
          // .returning("map_id") //if something need to be returned
          .update({
            pin_name:         req.body.pin_name,
            pin_description:  req.body.pin_description,
            pin_image:        req.body.pin_image
          }).then( (result) => {
            res.status(200).send('OK');
          }).catch( (err) => {
            res.status(500).send(err);
          });
          return;
      }
      
      res.status(403).send('login!');
    }),

    // delete single pin
    router.delete("/:pin_id", (req, res) => {
      console.log('delete pin!!!!');
      let user_id = req.session.user_id;
      if (user_id) {
        knex('pins').where('pin_id', req.params.pin_id).del().then((count) => {
          console.log(count);
          res.status(202).send('OK');
        }).catch((err) => {
          res.status(500).send(err);
        });
        return;
      }
      res.status(403).send('unauthorized');
    });

    return router;
}
