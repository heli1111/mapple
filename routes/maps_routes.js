"use strict";

const express   = require('express');
const checkUser = require('./checkuser');
const router    = express.Router();

//pre-filter function to check users

module.exports = (knex) => {

  router.get("/map", (req, res) => {
    //this route renders the main page with the most favored and most recent maps
    knex
      .select("maps.*", "pins.*", "fav.count")
      .from("maps")
      .leftOuterJoin("pins", "maps.map_id", "pins.pin_map_id")
      .leftOuterJoin(function() {
        this
        .select("favorites.map_id")
        .count("favorites.user_id as count")
        .from("favorites")
        .groupBy("favorites.map_id")
        .as("fav")
        }, "fav.map_id", "maps.id")
      .then((results) => {
        res.json(results);
        })
      .catch((err) => {
        res.status(400).send('Error happened');
        })
  }),

  router.get("/map/:id", (req, res) => {
    //this renders a particular map
    knex
      .select("maps.*", "pins.*", "fav.count")
      .from("maps")
      .leftOuterJoin("pins", "maps.map_id", "pins.pin_map_id")
      .leftOuterJoin(function() {
        this
        .select("favorites.map_id")
        .count("favorites.user_id as count")
        .from("favorites")
        .groupBy("favorites.map_id")
        .as("fav")
        }, "fav.map_id", "maps.id")
      .where("maps.id", req.params.id)
      .then((results) => {
        res.json(results);
        })
      .catch((err) => {
        res.status(400).send('Error happened');
        })
  }),

  router.post("/map/:id/favor", (req, res) => {
    //this renders a particular map
    //req.session.user_id is required
    knex
      .insert([ { map_id: req.params.id }, { user_id: req.session.user_id } ])
      .into("favorites")
  }),

  router.post("/map/new", (req, res) => {
    //this adds a new map
    checkUser();
    knex
      .insert([]) //data coming here
      .into("maps")

  }),

  router.post("/map/:id/update", (req, res) => {
    //this updates a map
    checkUser();
    knex("maps")
      .where() //.where('published_date', '<', 2000)
      .update()
  }),

  router.post("/map/:id/delete", (req, res) => {
    //this deletes a map
    checkUser();
    knex("maps")
      .where() //filters
      .del()
  })

  return router;
}
