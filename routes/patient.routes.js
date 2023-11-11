const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt")
const saltRounds = 10

router.get("/", (req, res, next) => {
  res.json("Home page All good in here");
});

router.put("/update/:id", (req, res, next) => {
  const userId = req.params.id;
  const { email, password, name,newpassword,role } = req.body;
  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }
  User.findById(userId)
    .then((foundUser) => {
      console.log("foundUser",foundUser)
      // If the user with the same email already exists, send an error response
      if (!foundUser) {
        res.status(400).json({ message: "User Not Found." });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      return User.findByIdAndUpdate(
        userId,
        { email, password: hashedPassword, username: name, role },
        { new: true }
      );
    })
    .then((createdUser) => {
      if (!createdUser) {
        res.status(500).json({ message: "Error creating user." });
        return;
      }
      const { email, name, _id, role } = createdUser;

      // Create a new object that doesn't expose the password
      const user = { email, name, _id, role };
      console.log(user);
      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

module.exports = router;
