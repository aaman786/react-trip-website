const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user_schema");
const authRouter = express.Router();

const bcryptSalt = bcryptjs.genSaltSync(10);
const secretKey = "passwordKey";

authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("USer exits..");
      return res.status(400).json({ msg: "User already exists!" });
    }

    const encryptedPassword = bcryptjs.hashSync(password, bcryptSalt);

    let user = new User({
      name,
      email,
      password: encryptedPassword,
    });

    user = await user.save();

    res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

authRouter.post("/log-in", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist." });
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Entered password is incorrect!" });
    }

    jwt.sign({ id: user._id }, secretKey, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json(user);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

authRouter.get("/user-data", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, secretKey, {}, async (err, userData) => {
        if (err) throw err;
        const user = await User.findById(userData.id);
        res.json(user);
      });
    } else res.json(null);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

module.exports = authRouter;
