"use strict";

const express   = require('express');
const checkUser = require('./checkuser');
const router    = express.Router();

//pre-filter function to check users

module.exports = (knex) => {

  router.get("/:user_id", (req, res) => {
    // renders index.ejs template with single_user variables
    let getUsersFavorites = (id) => {
      let mapData =
        knex
          .select("maps.*", "fav_count_table.fav_count")
          .from("maps")
          .leftOuterJoin("favorites", "favorites.fav_map_id", "maps.map_id")
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
          .where("favorites.fav_user_id", id)
          .orderBy("fav_count", "desc")

      let pinData =
        knex
          .select("pins.*")
          .from("maps")
          .leftOuterJoin("favorites", "favorites.fav_map_id", "maps.map_id")
          .leftOuterJoin("pins", "maps.map_id", "pins.pin_map_id")
          .where("favorites.fav_user_id", id)
          .orderBy("fav_count", "desc")

      Promise.all([mapData,pinData])
        .then( (result) => {
          res.json({
            mapData: result[0],
            pinData: result[1]
          })
        })
        .catch( (err) => {
          res.status(400).send('Error happened, user maps cannot be loaded');
        })
    }

    let getUsersContributions = (id) => {
      let mapData =
        knex
          .select("maps.*")
          .max("fav_count_table.fav_count as fav_count")
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
          .where("maps.map_user_id", id)
          .orWhere("pins.pin_user_id", id)
          .groupBy("maps.map_id")

      let pinData =
        knex
          .select("pins.*")
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
          .where("maps.map_user_id", id)
          .orWhere("pins.pin_user_id", id)

      Promise.all([mapData,pinData])
        .then( (result) => {
          res.json({
            mapData: result[0],
            pinData: result[1]
          })
        })
        .catch( (err) => {
          res.status(400).send('Error happened, user maps cannot be loaded');
        })
    }

    return {
      usersFavorites: getUsersFavorites(req.params.id),
      usersContributions: getUsersContributions(req.params.id)
    }

//the routes below are not used as long as user registration doesn't exist

  //,

  // router.post("/:user_id", (req, res) =>{
  //   //this adds a new user - feature not included
  //   knex
  //     .insert([]) //data coming here
  //     .into("users")

  // }),

  // router.put("/:user_id", (req, res) => {
  //   //this updates a user - feature not included
  //   knex("users")
  //     .where() //where('published_date', '<', 2000)
  //     .update()
  // }),

  // router.delete("/:user_id", (req, res) => {
  //   //this deletes a user - feature not included
  //   knex("users")
  //     .where() //filters
  //     .del()
  // })

  return router;

}
)}
