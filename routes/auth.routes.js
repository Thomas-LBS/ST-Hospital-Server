const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;
const mailjet = require("node-mailjet").apiConnect(
  "89745ade8698105b528d3a09d495e007",
  "33bbdd3b108653d941b38de6929523d4"
);
// Function to send an email
const sendGeneralMail = function (mail, sub, msg) {
  return mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Name: "ST Hospital",
          Email: "sunithajosephine22@gmail.com",
        },
        To: [
          {
            Email: mail,
            Name: "Sunitha",
          },
        ],
        Subject: sub,
        TextPart: msg,
      },
    ],
  });
};

router.get("/", (req, res, next) => {
  User.find()
  .populate('patientDetails.gp')
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.log("error", error);
    });
});

// router.get("/:id", (req, res, next) => {
//   const id = req.params.id;
//   User.findById(id)
// .populate('patientDetails.gp')

//     .then((users) => {
//       res.json(users);
//     })
//     .catch((error) => {
//       console.log("error", error);
//     });
// });

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", (req, res, next) => {
  const { email, password, name, role, firstname, lastname, patientDetails ,doctor} =
    req.body;
  // console.log(email, password, name ,role)
  // Check if email or password or name are provided as empty strings
  if (
    email === "" ||
    password === "" ||
    name === "" ||
    firstname === "" ||
    lastname === ""
  ) {
    res.status(400).json({
      message: "Provide email, password , name , firstname and lastname",
    });
    return;
  }

  // This regular expression check that the email is of a valid format
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

  // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      console.log("hashedPassword", hashedPassword);
      return User.create({
        email,
        password: hashedPassword,
        username: name,
        role,
        firstname: firstname,
        lastname: lastname,
        patientDetails: patientDetails,
        doctor
      });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      if (!createdUser) {
        res.status(500).json({ message: "Error creating user." });
        return;
      }
      console.log(createdUser.email);

      if (createdUser.role === "doctor" || createdUser.role === "admin") {
        sendGeneralMail(
          `${createdUser.email}`,
          "Login Credentials",
          `Hi ${createdUser.firstname} ${createdUser.lastname}. Your login credentials have been created by the Admin and you can find them below.You can change the credentials for 24 hours from now after which you will need to request them again if it remains unchanged.
        Username:${createdUser.username}
        Password:${password}
        email:${createdUser.email}`
        )
          .then((response) => {
            console.log("Email sent!", response.body);
            const {
              email: userEmail,
              name: userName,
              _id: userId,
              role: userRole,
            } = createdUser;
            const userObject = {
              email: userEmail,
              name: userName,
              _id: userId,
              role: userRole,
            };
            console.log(userObject);

            return res.status(201).json({ user: userObject });
            // Handle success
          })
          .catch((error) => {
            console.error(
              "Error sending email:",
              error.statusCode,
              error.message
            );
          });
      }
      //   const { email, name, _id, role } = createdUser;

      // // Create a new object that doesn't expose the password
      // const userObject = { email, name, _id, role };
      // console.log(userObject);
      // res.status(201).json({ user: userObject });

      // Send a json response containing the user object
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { name, password } = req.body;

  // Check if email or password are provided as empty string
  if (name === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ username: name })
    .populate("patientDetails.gp")
    .populate('doctor')
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const {
          _id,
          email,
          username,
          role,
          firstname,
          lastname,
          patientDetails,
          doctor
        } = foundUser;

        // Create an object that will be set as the token payload
        const payload = {
          _id,
          email,
          username,
          role,
          firstname,
          lastname,
          patientDetails,
          doctor
        };
        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken, user: foundUser });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});
router.put("/update/:id", (req, res, next) => {
  const userId = req.params.id;
  const updatedUserInfo = req.body;

  let {
    email,
    password,
    name,
    role,
    firstname,
    lastname,
    patientDetails,
    newPassword,
  } = updatedUserInfo;
  if (
    email === "" ||
    password === "" ||
    name === "" ||
    firstname === "" ||
    lastname === ""
  ) {
    res.status(400).json({
      message: "Provide email, password , name , firstname and lastname",
    });
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
      // console.log("foundUser", foundUser);
      // If the user with the same email already exists, send an error response
      if (!foundUser) {
        res.status(400).json({ message: "User Not Found." });
        return;
      }
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);

      if (!isSamePassword) {
        res.status(400).json({ errorMessage: "Wrong credentials." });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);

      // bcrypt
      //   .genSalt(saltRounds)
      //   .then((salt) => bcrypt.hashSync(newPassword, salt))
      //   .then((hashedPassword) => {
      // Create a user and save it in the database
      return User.findByIdAndUpdate(
        userId,
        {
          email,
          password: hashedPassword,
          username: name,
          role,
          firstname,
          lastname,
          patientDetails,
        },
        { new: true }
      ).then((updatedUser) => {
        console.log("updated user", updatedUser);
        if (!updatedUser) {
          res.status(500).json({ message: "Error creating user." });
          return;
        }
        const { email, username, _id, role } = updatedUser;
        const user = { email, username, _id, role };
        console.log(user);
        // Send a json response containing the user object
        res.status(201).json({ user: user });
      });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.

  // })
});

module.exports = router;
