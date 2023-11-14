const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor.model");


router.get("/", (req, res, next) => {
  Doctor.find()
  .populate('department')
    .then((doctors) => {
      res.json(doctors);
    })
    .catch((error) => {
      console.error("Error getting doctors:", error);
    });
});

router.post("/add", (req, res, next) => {
  const doctorData = req.body;
  console.log("doctor Data", doctorData);
  Doctor.create(doctorData)
    .then((addedDoctor) => {
      res.json(addedDoctor);
    })
    .catch((error) => {
      console.error("Error adding doctor:", error);
    });
});

router.get("/:id", (req, res, next) => {
  const doctorId = req.params.id;
  Doctor.findById(doctorId)
    .populate("department")
    .then((doctor) => {
      res.json(doctor);
    })
    .catch((error) => {
      console.error("Error getting doctor:", error);
    });
});

router.put("/update/:id", (req, res, next) => {
  const doctorId = req.params.id;
  const updateDoctor = req.body;
  Doctor.findByIdAndUpdate(doctorId, updateDoctor, { new: true })
    .populate("department")
    .then((updatedDoctor) => {
      res.json(updatedDoctor);
    })
    .catch((error) => {
      console.error("Error getting Doctor:", error);
    });
});
router.delete("/:id", (req, res, next) => {
  const doctorId = req.params.id;
  Doctor.findByIdAndDelete(doctorId).then((doctor) => {
    res.json("doctor deleted");
  });
});

module.exports = router;
