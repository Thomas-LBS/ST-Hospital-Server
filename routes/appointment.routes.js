const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment.model");
const User = require("../models/User.model");
const Department = require("../models/Department.model");
const Doctor = require("../models/Doctor.model");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  Appointment.find()
    .populate("user department doctor")
    .then((appts) => {
      res.json(appts);
    });
});
router.post("/create", async (req, res, next) => {
  try {
    const { user,department,doctor,start,end } = req.body;

          // Fetch the actual user, department, and doctor documents
          const fetchedUser = await User.findById(user);
          const fetchedDept = await Department.findById(department);
          const fetchedDoctor = await Doctor.findById(doctor);
    

      const createdAppointment = await Appointment.create({
        user: fetchedUser.id,
        department: fetchedDept.id,
        doctor: fetchedDoctor.id,
        start,
        end
      });

    res.json(createdAppointment);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ error: "Error creating appointment" });
  }
});

router.get("/doctor/:id", (req, res, next) => {
    const doctorid = req.params.id;
    console.log(doctorid)
    Appointment.find({doctor:doctorid})
      .populate("user department doctor")
      .then((appts) => {
        res.json(appts);
      });
  });
router.get("/patient/:id", (req, res, next) => {
    const patientid = req.params.id;
    console.log(patientid)
    Appointment.find({user:patientid})
      .populate("user department doctor")
      .then((appts) => {
        console.log(appts)
        res.json(appts);
      });
  });




module.exports = router;
