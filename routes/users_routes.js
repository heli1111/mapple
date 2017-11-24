"use strict";

const express   = require('express');
const checkUser = require('./checkuser');
const router    = express.Router();

//pre-filter function to check users

module.exports = (knex) => {

  router.get("/user/:id/favored", (req, res) => {
    //this returns maps that the user favored
    knex
      .select("maps.*", "pins.*", "fav_count_table.fav_count")
      .from("maps")
      .leftOuterJoin("favorites", "favorites.fav_map_id", "maps.map_id")
      .leftOuterJoin("pins", "maps.map_id", "pins.pin_map_id")
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
      .where("favorites.fav_user_id", req.params.id)
      .then((results) => {
        res.json(results);
        })
      .catch((err) => {
        res.status(400).send('Error happened, user\'s maps cannot be loaded');
      })
  }),

  router.get("/user/:id/contributed", (req, res) => {
    //this returns the maps to which the user contributed --> maps that belong to a user through map or pin ownership
    knex
      .select("maps.*", "pins.*", "fav_count_table.fav_count")
      .from("maps")
      .leftOuterJoin("pins", "maps.map_id", "pins.pin_map_id")
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
      .where("maps.map_user_id", req.params.id)
      .orWhere("pins.pin_user_id", req.params.id)
      .then((results) => {
        res.json(results);
        })
      .catch((err) => {
        res.status(400).send('Error happened, user\'s maps cannot be loaded');
      })
  })

  //,

  // router.post("/user/new", (req, res) => {
  //   //this adds a new user - feature not included
  //   knex
  //     .insert([]) //data coming here
  //     .into("users")

  // }),

  // router.post("user/:id/update", (req, res) => {
  //   //this updates a user - feature not included
  //   knex("users")
  //     .where() //where('published_date', '<', 2000)
  //     .update()
  // }),

  // router.post("user/:id/delete", (req, res) => {
  //   //this deletes a user - feature not included
  //   knex("users")
  //     .where() //filters
  //     .del()
  // })

  return router;
}
