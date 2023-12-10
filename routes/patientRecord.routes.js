const express = require("express");
const router = express.Router();
const PatientRecord = require("../models/PatientRecord.model");

router.get("/", (req, res, next) => {
  PatientRecord.find()
    .populate({
      path: "user",
      populate: {
        path: "record",
        populate: [{ path: "doctor" }, { path: "appointment" }],
      },
    })
    .then((records) => {
      res.json(records);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/create", (req, res, next) => {
  const {
    user,
    doctor,
    appointment,
    complaints,
    description,
    prescribedMedications,
    temperature,
    pulseRate,
    bloodPressure,
    heartRate,
  } = req.body;
  PatientRecord.findOne({ user: user })
    .then((existingRecord) => {
      if (existingRecord) {
        existingRecord.record.push({
          doctor: doctor,
          appointment: appointment,
          complaints: complaints,
          description: description,
          prescribedMedications: prescribedMedications,
          vitals: {
            temperature: { value: temperature },
            bloodPressure: { value: bloodPressure },
            heartRate: { value: heartRate },
            pulseRate: { value: pulseRate },
          },
        });

        return existingRecord.save();
      } else {
        return PatientRecord.create({
          user: user,
          record: [
            {
              doctor: doctor,
              appointment: appointment,
              complaints: complaints,
              description: description,
              prescribedMedications: prescribedMedications,
              vitals: {
                temperature: { value: temperature },
                bloodPressure: { value: bloodPressure },
                heartRate: { value: heartRate },
                pulseRate: { value: pulseRate },
              },
            },
          ],
        });
      }
    })
    .then((savedRecord) => {
      res.json(savedRecord);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

router.get("/:id", (req, res, next) => {
  const userId = req.params.id;
  PatientRecord.findOne({ user: userId })
    .populate({
      path: "record",
      populate: [{ path: "doctor" }, { path: "appointment" }],
    })
    .populate("user")
    .then((foundRecord) => {
      res.json(foundRecord);
    })
    .catch((error) => {
      res.json(records);
    });
});

module.exports = router;
