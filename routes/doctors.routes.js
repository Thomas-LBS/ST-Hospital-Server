const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor.model");
const Department = require("../models/Department.model");


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
  // console.log("doctor Data", doctorData);
  
  Doctor.create(doctorData)
    .then((addedDoctor) => {
      Department.findByIdAndUpdate(addedDoctor.department[0]._id,{ $push: { doctors: addedDoctor._id } },{new:true})
      .then(addedDoctor=>{
console.log(addedDoctor)
        res.json(addedDoctor);
      })
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

  Doctor.findById(doctorId)
    .populate("department") 
    .then((foundDoctor) => {
      const oldDepartmentId = foundDoctor.department[0]._id;

      Doctor.findByIdAndUpdate(doctorId, updateDoctor, { new: true })
        .populate("department")
        .then((updatedDoctor) => {
          const newDepartmentId = updatedDoctor.department[0]._id;

          Department.findByIdAndUpdate(
            oldDepartmentId,
            { $pull: { doctors: doctorId } },
            { new: true }
          ).then(() => {
            Department.findByIdAndUpdate(
              newDepartmentId,
              { $push: { doctors: doctorId } },
              { new: true }
            ).then((updatedDept) => {
              res.json(updatedDoctor);
            });
          });
        })
        .catch((error) => {
          console.error("Error updating Doctor:", error);
          res.status(500).json({ error: "Error updating Doctor" });
        });
    })
    .catch((error) => {
      console.error("Error finding Doctor:", error);
      res.status(500).json({ error: "Error finding Doctor" });
    });
});


router.delete("/:id", (req, res, next) => {
  const doctorId = req.params.id;
  Doctor.findByIdAndDelete(doctorId).then((doctor) => {
    res.json("doctor deleted");
  });
});

module.exports = router;
