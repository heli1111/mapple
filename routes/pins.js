"use strict";

const express = require('express');
const router = express.Router({mergeParams: true});

module.exports = (knex) => {

    // get list of pins
    router.get('/', (req, res) => {
        // TODO: should get pins for current map only
        let pins = knex.select().from('pins');
        pins.then((result) => {
            res.json(result);
        }).catch((err) => {
            res.status(500).send(err);
        });
    });

    // get single pin
    router.get('/:pin_id', (req, res) => {
        let pin = knex('pins').select().where('pin_id', req.params.pin_id);
        pin.then((result) => {
            res.json(result);
        }).catch((err) => {
            res.status(500).send(err);
        });
    });

    // create single pin
    router.post('/', (req, res) => {
        // TODO: check authorization
        // TODO: check db errors
        let pin = {
            pin_name: req.body.pin_name,
            pin_description: req.body.pin_description,
            pin_image: req.body.pin_image,
            pin_createdAt: new Date(),
            pin_latitude: req.body.pin_latitude,
            pin_longitude: req.body.pin_longitude,
            pin_user_id: req.params.user_id,
            pin_map_id: req.params.map_id
        };
        let newPin = knex('pins').returning('pin_id').insert(pin);
        newPin.then((result) => {
            console.log(result);
            res.send('OK');
        }).catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
    });

    // update single pin
    router.put('/:pin_id', (req, res) => {
        // TODO
        res.send('OK');
    })

    // delete single pin
    router.delete('/:pin_id', (req, res) => {
        console.log('delete request received');
        knex('pins').where('pin_id', req.params.pin_id).del().then((result) => {
            console.log(result);
            res.send('OK');
        }).catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
    });

    return router;
}