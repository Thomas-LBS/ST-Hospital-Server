const express = require("express");
const router = express.Router();
const Department = require("../models/Department.model");
const Doctor = require("../models/Doctor.model");
const GPractice = require("../models/GPractice.model");
router.get("/", (req, res, next) => {
  res.json("Home page All good in here")
})

router.get("/search", (req, res, next) => {
  const searchInput = req.query.input
    Department.find({ name: { $regex: searchInput, $options: 'i' } })
    .populate('doctors')
    .then((department) => {
      Doctor.find({
        $or: [
          { firstname: { $regex: searchInput, $options: 'i' } },
          { lastname: { $regex: searchInput, $options: 'i' } }
        ]
      })
      .populate('department')
        .then((doctors) => {
          GPractice.find({ name: { $regex: searchInput, $options: 'i' } })
            .then((gPractice) => {
              res.json({ department, doctors, gPractice })
            })
            .catch((error) => {
              console.log("error while finding gPractice ", error)
            })
        })
        .catch((error) => {
          console.log("error while finding doctors ", error)
        })
    })
    .catch((error) => {
      console.log("error while finding department ", error)
    })
})



module.exports = router
