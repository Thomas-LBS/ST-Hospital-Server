const express = require("express");
const router = express.Router();
const Department = require("../models/Department.model");
// const mailjet = require("node-mailjet").apiConnect(
//   process.env.MAILJET_API_KEY,
//   process.env.MAILJET_API_SECRET
// );

router.get("/", (req, res, next) => {
  Department.find()
  .populate('doctors')
    .then((departments) => {
      res.json(departments);
    })
    .catch((error) => {
      console.error("Error getting departments:", error);
    });
});

router.post("/add", (req, res, next) => {
  const deptData = req.body;
  console.log("Dept Data", deptData);
  Department.create(deptData)
    .then((addedDept) => {
      res.json(addedDept);
    })
    .catch((error) => {
      console.error("Error adding department:", error);
    });
});

router.get("/:id", (req, res, next) => {
  const deptId = req.params.id;
  Department.findById(deptId)
    .populate("doctors")
    .then((department) => {
      res.json(department);
    })
    .catch((error) => {
      console.error("Error getting departments:", error);
    });
});

router.put("/update/:id", (req, res, next) => {
  const deptId = req.params.id;
  const updateDept = req.body;
  Department.findByIdAndUpdate(deptId, updateDept, { new: true })
    .populate("doctors")
    .then((updatedDepartment) => {
      res.json(updatedDepartment);
    })
    .catch((error) => {
      console.error("Error getting departments:", error);
    });
});

router.delete("/delete/:id", (req, res, next) => {
  const deptId = req.params.id;
  Department.findByIdAndDelete(deptId).then((dept) => {
    res.json("Dept deleted");
  });
});

module.exports = router;
