const express = require("express");
const { Track } = require("../models");

const trackRouter = express.Router();

//Get all tracks
trackRouter.get("/", async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json({ tracks });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

//Get a specific track
trackRouter.get("/:id", async (req, res) => {
  try {
    const track = await Track.findOne({ where: { id: req.params.id } });
    res.json({ track });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

trackRouter.post("/", async (req, res) => {
  try {
    const { title, url, userId } = req.body;
    console.log("Title: ", title);
    console.log("URL: ", url);
    console.log("UserID: ", userId);
    const track = await Track.create({
      title,
      url
    });
    track.setUser(userId);
    res.json({ track });
  } catch (e) {
    console.error(e);
    res.stats(500).send(e.message);
  }
});

trackRouter.delete("/:id", async (req, res) => {
  try {
    const track = await Track.destroy({ where: { id: req.params.id } });
    res.json({ track });
  } catch (e) {
    res.stats(500).send(e.message);
  }
});

trackRouter.put("/:id", async (req, res) => {
  try {
    const track = await Track.findOne({ where: { id: req.params.id } });
    track.update({ title: req.body.title });
    res.json({ track });
  } catch (e) {
    res.stats(500).send(e.message);
  }
});

module.exports = trackRouter;
