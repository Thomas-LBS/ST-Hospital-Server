const express = require("express");
const router = express.Router();
const Department = require("../models/Department.model");

router.get("/", (req, res, next) => {
  Department.find()
    .populate("doctors")
    .then((departments) => {
      res.json(departments);
    })
    .catch((error) => {
      res.json(error);
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
      res.json(error);
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
      res.json(error);
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
      res.json(error);
    });
});

router.delete("/delete/:id", (req, res, next) => {
  const deptId = req.params.id;
  Department.findByIdAndDelete(deptId)
    .then((dept) => {
      res.json("Dept deleted");
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
