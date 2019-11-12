const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User");

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

router.post("/sign_up", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const biography = req.body.biography;
    const token = req.body.token;
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(biography);

    if (username && email && password && biography) {
      const user = new User({
        username: username,
        email: email,
        password: password,
        biography: biography,
        token: token
      });
      await user.save();
      res.json(user);
    } else {
      res.status(400).json({ error: "Wrong parameters" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
