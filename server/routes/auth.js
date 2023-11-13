const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../helpers/generateToken");

router.post("/register", async (req, res) => {
  if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({
      error: "Please enter valid credentials",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("User not found");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json("Password incorrect");
    }

    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
