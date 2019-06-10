const express = require("express");
const { Track } = require("../models");

const trackRouter = express.Router();

//Get all tracks
trackRouter.get("/", async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json({ tracks });
  } catch (error) {
    console.error(error);
    res.stats(500).send(error.message);
  }
});

//Get a specific track
trackRouter.get("/:id", async (req, res) => {
  try {
    const track = await Track.findOne({ where: { id: req.params.id } });
    res.json({ track });
  } catch (error) {
    console.error(error);
    res.stats(500).send(error.message);
  }
});

trackRouter.post("/", async (req, res) => {
  try {
    const { title, url, userId } = req.body;
    const track = await Track.create({
      title,
      url
    });
    track.setUser(userId);
    res.json(track);
  } catch (error) {
    console.error(error);
    res.stats(500).send(error.message);
  }
});

trackRouter.delete("/:id", async (req, res) => {
  try {
    const track = await Track.destroy({ where: { id: req.params.id } });
    res.json(track);
  } catch (error) {
    console.error(error);
    res.stats(500).send(error.message);
  }
});

trackRouter.put("/:id", async (req, res) => {
  try {
    const track = await Track.findOne({ where: { id: req.params.id } });
    track.update({ title: req.body.title });
    res.json(track);
  } catch (e) {
    console.error(error);
    res.stats(500).send(error.message);
  }
});

module.exports = trackRouter;
