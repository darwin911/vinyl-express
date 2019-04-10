const express = require('express');
const { User } = require('../models');
const { hash, compare, encode, verify } = require('../auth');

const userRouter = express.Router();

//Get all users
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

//Get a specific user
userRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id }});
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

// Register route
userRouter.post('/', async (req, res) => {
  try {
    const { email, password, name, picture } = req.body;
    if (password) {
      const passwordDigest = await hash(password);
      const user = await User.create({
        email,
        password_digest: passwordDigest,
        name,
      });
      const userData = {
        // id: user.id,
        // name: user.name,
        // email: user.email,
        // picture: user.picture,
      };

      const token = encode(userData);

      res.json({
        token,
        userData,
      });
    }
    else {
      const user = await User.create({
        email,
        name,
        picture
      });

      const userData = {
        email: user.email,
        name: user.name,
        picture: user.picture,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      const token = encode(userData);

      res.json({
        token,
        userData,
      });
    }
  } catch(e) {
    console.error(e);
  }
});

//Login route
userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user !== null) {
      const authenticated = await compare(password, user.password_digest);
      if (authenticated === true) {
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.picture,
        };

        const token = encode(userData);

        res.json({
          token,
          userData,
        });
      }
      return res.status(401).send('Invalid Credentials');
    }
    return res.status(401).send('Invalid Credentials');
  } catch(e) {
    console.error(e);
  }
});

module.exports = userRouter;