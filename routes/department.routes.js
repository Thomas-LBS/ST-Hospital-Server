const express = require("express");
const router = express.Router();
const Department = require("../models/Department.model");
const departmentsData = [
  {
    name: "Cardiology",
    image: "cardiology_image.jpg",
    description: "Department specializing in heart-related issues",
    doctors: [],
  },
  {
    name: "Orthopedics",
    image: "orthopedics_image.jpg",
    description: "Department focusing on musculoskeletal issues",
    doctors: [],
  },
  {
    name: "Pediatrics",
    image: "pediatrics_image.jpg",
    description: "Department specializing in child healthcare",
    doctors: [],
  },
  {
    name: "Internal Medicine",
    image: "internal_medicine_image.jpg",
    description:
      "Department dealing with the prevention, diagnosis, and treatment of adult diseases",
    doctors: [],
  },
  {
    name: "Surgery",
    image: "surgery_image.jpg",
    description: "Department covering various surgical specialties",
    doctors: [],
  },
  {
    name: "Obstetrics and Gynecology",
    image: "obgyn_image.jpg",
    description: "Department focused on women's health",
    doctors: [],
  },
  {
    name: "Emergency Medicine",
    image: "emergency_medicine_image.jpg",
    description: "Department providing emergency care",
    doctors: [],
  },
  {
    name: "Radiology",
    image: "radiology_image.jpg",
    description: "Department handling medical imaging",
    doctors: [],
  },
  {
    name: "Oncology",
    image: "oncology_image.jpg",
    description: "Department specializing in cancer treatment",
    doctors: [],
  },
  {
    name: "Neurology",
    image: "neurology_image.jpg",
    description: "Department dealing with disorders of the nervous system",
    doctors: [],
  },
  {
    name: "Dermatology",
    image: "dermatology_image.jpg",
    description: "Department focused on skin-related issues",
    doctors: [],
  },
  {
    name: "Endocrinology",
    image: "endocrinology_image.jpg",
    description: "Department specializing in endocrine system disorders",
    doctors: [],
  },
  {
    name: "Gastroenterology",
    image: "gastroenterology_image.jpg",
    description: "Department dealing with digestive system disorders",
    doctors: [],
  },
  {
    name: "Urology",
    image: "urology_image.jpg",
    description:
      "Department specializing in urinary tract and male reproductive system issues",
    doctors: [],
  },
  {
    name: "Nephrology",
    image: "nephrology_image.jpg",
    description: "Department focusing on kidney-related issues",
    doctors: [],
  },
  {
    name: "Pulmonology",
    image: "pulmonology_image.jpg",
    description: "Department dealing with respiratory system disorders",
    doctors: [],
  },
  {
    name: "Hematology",
    image: "hematology_image.jpg",
    description: "Department specializing in blood-related disorders",
    doctors: [],
  },
  {
    name: "Infectious Diseases",
    image: "infectious_diseases_image.jpg",
    description: "Department focusing on infectious diseases",
    doctors: [],
  },
  {
    name: "Psychiatry",
    image: "psychiatry_image.jpg",
    description: "Department specializing in mental health",
    doctors: [],
  },
  {
    name: "Physical Therapy",
    image: "physical_therapy_image.jpg",
    description: "Department providing physical therapy services",
    doctors: [],
  },
];

router.get("/create", (req, res, next) => {
  Department.create(departmentsData)
    .then((departments) => {
      console.log(
        "Departments created and saved to the database:",
        departments
      );
      res.send(departments);
    })
    .catch((error) => {
      console.error("Error creating departments:", error);
    });
});

router.get("/", (req, res, next) => {
  Department.find()
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
    .populate("Doctors")
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

router.delete("/:id", (req, res, next) => {
  const deptId = req.params.id;
  Department.findByIdAndDelete(deptId).then((dept) => {
    res.json("Dept deleted");
  });
});

module.exports = router;
