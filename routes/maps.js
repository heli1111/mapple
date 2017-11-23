"use strict";

const express   = require('express');
const checkUser = require('./checkuser');
const router    = express.Router();

//pre-filter function to check users

module.exports = (knex) => {

  router.get("/map", (req, res) => {
    //this route renders the main page with the most favored and most recent maps
    knex
      .select("*")
      .from("maps")
      .where() //filters
      .then((results) => {
        res.json(results);
    });
  }),

  router.get("/map/:id", (req, res) => {
    //this renders a particular map
    knex
      .select("*")
      .from("maps").join("pins")
      .where() //filters
      .then((results) => {
        res.json(results);
    });
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
