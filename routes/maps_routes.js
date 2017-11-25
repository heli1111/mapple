"use strict";

const express   = require('express');
//pre-filter function to check users
const checkUser = require('./checkuser');
const router    = express.Router();

module.exports = (knex) => {

  router.get("/map", (req, res) => {
    //this route renders the main page with the most favored and most recent maps
    let mapData =
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

    let pinData =
      knex
        .select("*")
        .from("pins")

    Promise.all([mapData, pinData])
      .then( (result) => {
        res.json({
          mapData: result[0],
          pinData: result[1]
        })
      })
      .catch( (err) => {
        res.status(400).send('Error happened, maps cannot be loaded');
      })
  }),

  router.get("/map/:id", (req, res) => {
    //this selects data for a particular map
    let mapData =
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
        .where("maps.map_id", req.params.id)

    let pinData =
      knex
        .select("*")
        .from("pins")
        .where("pins.pin_map_id", req.params.id)

    Promise.all([mapData, pinData])
      .then( (result) => {
        res.json({
          mapData: result[0],
          pinData: result[1]
        })
      })
      .catch( (err) => {
        res.status(400).send('Error happened, map cannot be loaded');
      })
  }),

  router.post("/map/:id/favor", (req, res) => {
    //req.session.user_id is required
    knex
      .insert([{
        map_id:  req.params.id,
        user_id: req.session.user_id //or req.body.user_id if session.user_id is passed into the incoming data
        }])
      .into("favorites")
      .then( (result) => {
        res.status(201);
        })
      .catch( (err) => {
        res.status(501).send('Error happened, map cannot be favored');
        })
  }),

  // router.get("/map/new", (req, res) => {

  // })

  router.post("/map/new", (req, res) => {
    //this adds a new map
    //data is coming in the following format:
      // { (id: *** see comment below ***), name: , description: , image: , createdAt: , coords: { lat: , lng: }, user(=req.session.user_id) }
    checkUser();
    knex
      .insert([{
        map_id:           req.body.id, //*** comment out for testing as long as database id auto-increments - id will be generated
        map_name:         req.body.name,
        map_description:  req.body.description,
        map_image:        req.body.image
        map_createdAt:    req.body.createdAt,
        map_last_updated: req.body.createdAt, //when a map is created, the last updated variable should be the same as the created at
        map_latitude:     req.body.coords.lat,
        map_longitude:    req.body.coords.lng,
        map_user_id:      req.body.user
        }])
      .into("maps")
      .then( (result) => {
        res.status(201);
        })
      .catch( (err) => {
        res.status(501).send('Error happened, map cannot be created');
      })

  }),

  router.post("/map/:id/update", (req, res) => {
    //this updates a map
    //data is coming in the following format:
      // { name: , description: , last updated, coords: { lat: , lng: } }
    checkUser();
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
  }),

  router.post("/map/:id/delete", (req, res) => {
    //this deletes a map
    checkUser();
    knex("maps")
      .where("maps.map_id", req.params.id)
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
