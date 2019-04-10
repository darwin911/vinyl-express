const express = require('express');
const { Track } = require('../models');

const trackRouter = express.Router();

//Get all tracks
trackRouter.get('/', async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json({ tracks });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

//Get a specific track
trackRouter.get('/:id', async (req, res) => {
  try {
    const track = await Track.findOne({ where: { id: req.params.id } });
    res.json({ track });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

module.exports = trackRouter;