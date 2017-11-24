"use strict";

const express   = require('express');
//pre-filter function to check users
const checkUser = require('./checkuser');
const router    = express.Router();


module.exports = (knex) => {

  router.get("/map/:id1/pin/:id2", (req, res) => {
    //this loads a particular pin
    knex
      .select("*")
      .from("pins")
      .where("pins.map_id", req.params.id1)
      .andWhere("pins.pin_id", req.params.id2)
      .then((results) => {
        res.json(results);
        })
      .catch((err) => {
        res.status(400).send('Error happened, pin cannot be loaded');
        })
  }),

  router.post("/map/:id/pin/new", (req, res) => {
    //this adds a new pin to a specific map
    //data is coming in the following format:
      // { (id: *** see comment below ***), name: , description: , image: , createdAt: , coords: { lat: , lng: }, *map(=the map's id from url), user(=req.session.user_id) }
    checkUser();
    knex
      .insert([{
        pin_id:           req.body.id, //*** comment out for testing as long as database id auto-increments - id will be generated
        pin_name:         req.body.name,
        pin_description:  req.body.description,
        pin_image:        req.body.image,
        pin_createdAt:    req.body.createdAt,
        pin_latitude:     req.body.coords.lat,
        pin_longitude:    req.body.coords.lng,
        pin_map_id:       req.params.id,
        pin_user_id:      req.body.user
        }])
      .into("pins")
      .then( (result) => {
        res.status(201);
        })
      .catch( (err) => {
        res.status(501).send('Error happened, map cannot be created');
      })

  }),

  router.post("/map/:id1/pin/:id2/update", (req, res) => {
    //this updates a map
    //data is coming in the following format:
      // { (id: *** see comment below ***), name: , description: , last updated, coords: { lat: , lng: } }
    checkUser();
    knex("pins")
      .where("pins.pin_id", req.params.id2)
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
  }),

  router.post("map/:id1/pin/:id2/delete", (req, res) => {
    //this deletes a map
    checkUser();
    knex("pins")
      .where("pins.map_id", req.params.id1)
      .andWhere("pins.pin_id", req.params.id2)
      .del()
      .then( (result) => {
        res.status(202);
        })
      .catch( (err) => {
        res.status(501);
        })
  })

  return router;
}




// module.exports = (knex) => {

//   router.get("/pin/:id", (req, res) => {
//     //this gets a particular pin
//     knex
//       .select("*")
//       .from("pins")
//       .where() //filters
//       .then((results) => {
//         res.json(results);
//     });
//   }),

//   router.post("/pin/new", (req, res) => {
//     //this adds a new pin
//     checkUser();
//     knex
//       .insert([]) //data coming here
//       .into("pin")

//   }),

//   router.post("/pin/:id/update", (req, res) => {
//     //this updates a pin if user is logged
//     checkUser();
//     knex("pin")
//       .where() //where('published_date', '<', 2000)
//       .update()
//   }),

//   router.post("/pin/:id/delete", (req, res) => {
//     //this deletes a pin if user is logged
//     checkUser();
//     knex("pin")
//       .where() //filters
//       .del()
//   })

//   return router;
// }
