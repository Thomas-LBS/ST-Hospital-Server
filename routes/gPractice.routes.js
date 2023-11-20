const express = require("express");
const router = express.Router();
const GPractice=require('../models/GPractice.model')


router.get("/", (req, res, next) => {
  GPractice.find()
  .then(gps=>{
    
    res.json(gps);
  })
});
router.get("/:id", (req, res, next) => {
  const id=req.params.id
  console.log(id)
  GPractice.findById(id)
  .then(gps=>{
    
    res.json(gps);
  })
});

module.exports = router;


