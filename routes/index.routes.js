const express = require("express");
const router = express.Router();
const Department = require("../models/Department.model");
const Doctor = require("../models/Doctor.model");
const GPractice = require("../models/GPractice.model");
const UserSocketModel=require('../models/UserSocketModel')
router.get("/", (req, res, next) => {
  res.json("Home page All good in here");
});

router.get("/search", (req, res, next) => {
  const searchInput = req.query.input;
    Department.find({ name: searchInput })
    .populate('doctors')
    .then((department) => {
      Doctor.find({ firstname: searchInput })
      .populate('department')
        .then((doctors) => {
          GPractice.find({ name: searchInput })
            .then((gPractice) => {
              res.json({ department, doctors, gPractice });
            })
            .catch((error) => {
              console.log("error while finding gPractice ", error);
            });
        })
        .catch((error) => {
          console.log("error while finding doctors ", error);
        });
    })
    .catch((error) => {
      console.log("error while finding department ", error);
    });
});

router.get("/usersocket", (req, res, next) => {
  UserSocketModel.find()
  .populate('user')
  .then(response=>{
    res.json(response)
  })

});

module.exports = router;
