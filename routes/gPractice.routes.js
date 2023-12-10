const express = require("express");
const router = express.Router();
const GPractice = require("../models/GPractice.model");

router.get("/", (req, res, next) => {
  GPractice.find()
    .then((gps) => {
      res.json(gps);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error finding GPractice" });
    });
});
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  GPractice.findById(id)
    .then((gps) => {
      res.json(gps);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error finding GPractice" });
    });
});

module.exports = router;
