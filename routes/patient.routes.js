const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/", (req, res, next) => {
  res.json("Home page All good in here");
});

router.put("/update/:id", (req, res, next) => {
  const userId = req.params.id;
  const updatedUserInfo=req.body
  const { email, password, name,role ,firstname,lastname,patientDetails,newPassword} = updatedUserInfo;
  if (email === "" || password === "" || name === "" || firstname === "" || lastname === ""  ) {
    res.status(400).json({ message: "Provide email, password , name , firstname and lastname" });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }
  // // This regular expression checks password for special characters and minimum length
  // const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  // if (!passwordRegex.test(password)) {
  //   res.status(400).json({
  //     message:
  //       "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
  //   });
  //   return;
  // }

  if (newPassword === "") {
    newPassword = password;
  }
  User.findById(userId)
    .then((foundUser) => {
      console.log("foundUser", foundUser);
      // If the user with the same email already exists, send an error response
      if (!foundUser) {
        res.status(400).json({ message: "User Not Found." });
        return;
      }
      bcrypt.compare(password, foundUser.password).then((isSamePassword) => {
        if (!isSamePassword) {
          res.status(400).json({ errorMessage: "Wrong credentials." });
          return;
        }

        bcrypt
          .genSalt(saltRounds)
          .then((salt) => bcrypt.hash(newPassword, salt))
          .then((hashedPassword) => {
            // Create a user and save it in the database
            return User.findByIdAndUpdate(
              userId,
              updatedUserInfo,
              { new: true }
            ).then((updatedUser) => {
              if (!createdUser) {
                res.status(500).json({ message: "Error creating user." });
                return;
              }
              const { email, name, _id, role } = createdUser;
              const user = { email, name, _id, role };
              console.log(user);
              // Send a json response containing the user object
              res.status(201).json({ user: user });
              
            });
          })
          .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
      });
      
    })
});

module.exports = router;
