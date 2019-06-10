const express = require("express");
const { User } = require("../models");
const { hash, compare, encode, verify } = require("../auth");

const userRouter = express.Router();

//Get all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.stats(500).send(error.message);
  }
});

//Get a specific user
userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.stats(500).send(error.message);
  }
});

// Register route
userRouter.post("/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const emailExists = await User.findOne({
      where: { email: email }
    });

    if (emailExists) {
      return res.status(409).send("This email is already in use.");
    }

    if (password) {
      const passwordDigest = await hash(password);
      const user = await User.create({
        name,
        email,
        password_digest: passwordDigest
      });
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      const token = encode(userData);
      res.json({ token, userData });
    } else {
      const user = await User.create({ name, email });
      const userData = {
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
      };

      const token = encode(userData);

      res.json({ token, userData });
    }
  } catch (error) {
    console.error(error);
  }
});

//Login route
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user !== null) {
      const isAuthenticated = await compare(password, user.password_digest);
      if (isAuthenticated === true) {
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email
        };
        const token = encode(userData);
        return res.json({ token, userData });
      }
      return res.status(401).send("Invalid Credentials");
    }
    return res.status(401).send("Invalid Credentials");
  } catch (error) {
    console.error(error);
  }
});

//Get a user's tracks
userRouter.get("/:id/tracks", async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    const tracks = await user.getTracks();
    res.json({ tracks });
  } catch (error) {
    console.error(error);
    res.stats(500).send(error.message);
  }
});

module.exports = userRouter;
