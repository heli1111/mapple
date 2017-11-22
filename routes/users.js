"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("user")
      .then((results) => {
        res.json(results);
    });
  }),

  router.post("/", (req, res) => {
    knex
      .insert([])
      .into("user")

  }),

  router.put("/", (req, res) => {
    knex("user")
      .where() //.where('published_date', '<', 2000)
      .update()
  }),

  router.delete("/", (req, res) => {
    knex("user")
      .where()
      .del()
  })

  return router;
}
