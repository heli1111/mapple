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
const data = {
  name: 'newfoundland',
  description: 'ice cold lava',
  createdAt: undefined,
  coords: {
    lat:  40.000000,
    lng: -70.000000
  },
  user: undefined}

//------------------------------------------------------------------
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
          .where("maps.map_user_id", 3)
          .orWhere("pins.pin_user_id", 3)

          .then((result) => console.log(result))
          .catch((err) => console.log(err))


