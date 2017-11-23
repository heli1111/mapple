"use strict";

const express   = require('express');
const checkUser = require('./checkuser');
const router    = express.Router();

//pre-filter function to check users

module.exports = (knex) => {

  router.get("/user/:id", (req, res) => {
    //this returns a user-specific profile page --> maps that belong to a user through map or pin ownership
    knex
      .select("*")
      .from("users") //joins with map and pin tables
      .where() //filters --> :id params applied
      .then((results) => {
        res.json(results);
    });
  }),

  router.post("/user/new", (req, res) => {
    //this adds a new user - feature not included
    knex
      .insert([]) //data coming here
      .into("users")

  }),

  router.post("user/:id/update", (req, res) => {
    //this updates a user - feature not included
    knex("users")
      .where() //where('published_date', '<', 2000)
      .update()
  }),

  router.post("user/:id/delete", (req, res) => {
    //this deletes a user - feature not included
    knex("users")
      .where() //filters
      .del()
  })

  return router;
}
