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
        console.log(results);
        })
      .catch((err) => {
        console.log(`res.status(400).send('Error happened, user\'s maps cannot be loaded');`)
      })



    // knex
    //   .select("maps.*", "pins.*", "fav_count_table.fav_count")
    //   .from("maps")
    //   .leftOuterJoin("favorites", "favorites.fav_map_id", "maps.map_id")
    //   .leftOuterJoin("pins", "maps.map_id", "pins.pin_map_id")
    //   .leftOuterJoin(
    //     function () {
    //       this
    //         .select("favorites.fav_map_id")
    //         .count("favorites.fav_user_id as fav_count")
    //         .from("favorites")
    //         .groupBy("favorites.fav_map_id")
    //         .as("fav_count_table")
    //     },
    //       "fav_count_table.fav_map_id", "maps.map_id")
    //   .where("favorites.fav_user_id", req.params.id)
    //   .then((results) => {
    //     console.log(results)
    //     })
    //   .catch((err) => {
    //     console.log(`res.status(400).send('Error happened, user\'s maps cannot be loaded');`)
    //   })

    // knex("maps")
    //   .where("maps.map_id", "=", req.params.id)
    //   .returning("map_id")
    //   .update({
    //     //map_id:          id, //*** comment out for testing as long as database id auto-increments - id will be generated
    //     map_name:        data.name,
    //     map_description: data.description,
    //     map_createdAt:   data.createdAt,
    //     // map_latitude:    data.coords.lat,
    //     // map_longitude:   data.coords.lng,
    //     map_user_id:     data.user
    //     })
    //   .then( (result) => {
    //     console.log('res.status(202);')
    //     })
    //   .catch( (err) => {
    //     console.log('res.status(501);', err)
    //     })



  // knex
  //   .insert([{
  //     //map_id:          id, //this will be injected but now the id is auto-incremented
  //     map_name:        data.name,
  //     map_description: data.description,
  //     map_createdAt:   data.createdAt,
  //     //map_latitude:    data.coords.lat,
  //     //map_longitude:   data.coords.lng,
  //     map_user_id:     data.user
  //   }])
  //   .into("maps")
  //   // .then(console.log('ok'))
  //   .catch((err) => {console.log('oh-oh')})


// const countFavorites = (this) => {
//   this
//     .select("favorites.fav_map_id")
//     .count("favorites.fav_user_id as fav_count")
//     .from("favorites")
//     .groupBy("favorites.fav_map_id")
//     .as("fav_count_table")
// }


// knex
//       .select("maps.*", "pins.*", "fav_count_table.fav_count")
//       .from("maps")
//       .leftOuterJoin("pins", "maps.map_id", "pins.pin_map_id")
//       .leftOuterJoin(

//         function () {
//           this
//             .select("favorites.fav_map_id")
//             .count("favorites.fav_user_id as fav_count")
//             .from("favorites")
//             .groupBy("favorites.fav_map_id")
//             .as("fav_count_table")
//         },
//         "fav_count_table.fav_map_id", "maps.map_id")

//       .where("maps.map_id", req.params.id)
//       .then((results) => {
//         console.log(results);
//         })
//       .catch((err) => {
//         console.log(":(")
//         })

// const hello = function () {
//     knex
//           .select("favorites.fav_map_id")
//           .count("favorites.fav_user_id as fav_count")
//           .from("favorites")
//           .groupBy("favorites.fav_map_id")
//           .as("fav_count_table")
//           .then((results) => {
//             console.log(results);
//           })
//           .catch((err) => {
//             console.log(':(((')
//           })

// }()


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
