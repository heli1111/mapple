"use strict";

const express        = require("express");
const bodyParser     = require("body-parser");
const pg     = require("pg");
const sass           = require("node-sass-middleware");
const app            = express();

const router    = express.Router();

const knex           = require("knex")({
    client: 'pg',
    connection: {
      host     : 'localhost',
      user     : 'labber',
      password : 'labber',
      database : 'midterm',
      port     : 5432,
      ssl      : true
    }
    });

const req = { params : { id: 3 }, session : { user_id: 1 } }

    // knex
    //   .select("maps.id", "maps.name", "fav.count")
    //   .from("maps")
    //   .join(function() {
    //     this
    //     .select("favorites.map_id")
    //     .count("favorites.user_id as count")
    //     .from("favorites")
    //     .groupBy("favorites.map_id")
    //     .as("fav")
    //     }, "fav.map_id", "maps.id")
    //   .where("maps.id", req.params.id)
    //   .then((results) => {
    //     console.log(results);
    //     })
    //   .catch((err) => {
    //     console.log(err)
    //     })

const x = function () {

   knex
      .select('*')
      .from('favorites')
      .then((results) => {console.log(results)})
      .catch((err) => {console.log(err)})
}()

   knex
      .insert([ { user_id: 1, map_id: 3 } ])
      .into("favorites")
      .then(x())
      .catch((err) => {console.log(err)})



      // .join("favorites", "favorites.map_id", "maps.id")
      // .select("favorites.map_id")
      // .count("favorites.user_id")
      // .groupBy("maps.id")
      // .then((results) => {
      //   console.log(results);
      //   })
      // .catch((err) => {
      //   console.log(err)
      // });


// select maps.id, maps.name, maps.user_id as map_owner, count(favorites.user_id) as favs
// from maps join favorites on favorites.map_id = maps.id
// group by favorites.map_id

