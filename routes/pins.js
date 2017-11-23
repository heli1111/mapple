"use strict";

const express   = require('express');
const checkUser = require('./checkuser');
const router    = express.Router();

//pre-filter function to check users

module.exports = (knex) => {

  router.get("/pin/:id", (req, res) => {
    //this gets a particular pin
    knex
      .select("*")
      .from("pins")
      .where() //filters
      .then((results) => {
        res.json(results);
    });
  }),

  router.post("/pin/new", (req, res) => {
    //this adds a new pin
    checkUser();
    knex
      .insert([]) //data coming here
      .into("pin")

  }),

  router.post("/pin/:id/update", (req, res) => {
    //this updates a pin if user is logged
    checkUser();
    knex("pin")
      .where() //where('published_date', '<', 2000)
      .update()
  }),

  router.post("/pin/:id/delete", (req, res) => {
    //this deletes a pin if user is logged
    checkUser();
    knex("pin")
      .where() //filters
      .del()
  })

  return router;
}
