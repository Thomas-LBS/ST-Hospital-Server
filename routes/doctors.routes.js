const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor.model");
const doctorsData = [
  {
    firstname: "Bob",
    lastname: "Miller",
    position: "Chief",
    image: "doctor_image_1_1.jpg",
  },
  {
    firstname: "Alice",
    lastname: "White",
    position: "Attending",
    image: "doctor_image_1_2.jpg",
  },
  {
    firstname: "John",
    lastname: "Doe",
    position: "General",
    image: "doctor_image_1_3.jpg",
  },
  {
    firstname: "Fiona",
    lastname: "Brown",
    position: "Chief",
    image: "doctor_image_2_1.jpg",
  },
  {
    firstname: "Bob",
    lastname: "Johnson",
    position: "Attending",
    image: "doctor_image_2_2.jpg",
  },
  {
    firstname: "George",
    lastname: "Davis",
    position: "General",
    image: "doctor_image_2_3.jpg",
  },
  {
    firstname: "Bob",
    lastname: "Johnson",
    position: "Chief",
    image: "doctor_image_3_1.jpg",
  },
  {
    firstname: "Charlie",
    lastname: "Miller",
    position: "Attending",
    image: "doctor_image_3_2.jpg",
  },
  {
    firstname: "Diana",
    lastname: "Jones",
    position: "General",
    image: "doctor_image_3_3.jpg",
  },
  {
    firstname: "Bob",
    lastname: "Johnson",
    position: "Chief",
    image: "doctor_image_4_1.jpg",
  },
  {
    firstname: "Eddie",
    lastname: "Davis",
    position: "Attending",
    image: "doctor_image_4_2.jpg",
  },
  {
    firstname: "John",
    lastname: "Martinez",
    position: "General",
    image: "doctor_image_4_3.jpg",
  },
  {
    firstname: "Charlie",
    lastname: "White",
    position: "Chief",
    image: "doctor_image_5_1.jpg",
  },
  {
    firstname: "Bob",
    lastname: "Davis",
    position: "Attending",
    image: "doctor_image_5_2.jpg",
  },
  {
    firstname: "Helen",
    lastname: "Jones",
    position: "General",
    image: "doctor_image_5_3.jpg",
  },
  {
    firstname: "Eddie",
    lastname: "White",
    position: "Chief",
    image: "doctor_image_6_1.jpg",
  },
  {
    firstname: "George",
    lastname: "Martinez",
    position: "Attending",
    image: "doctor_image_6_2.jpg",
  },
  {
    firstname: "Jane",
    lastname: "White",
    position: "General",
    image: "doctor_image_6_3.jpg",
  },
  {
    firstname: "Bob",
    lastname: "Davis",
    position: "Chief",
    image: "doctor_image_7_1.jpg",
  },
  {
    firstname: "Eddie",
    lastname: "Davis",
    position: "Attending",
    image: "doctor_image_7_2.jpg",
  },
  {
    firstname: "Fiona",
    lastname: "Smith",
    position: "General",
    image: "doctor_image_7_3.jpg",
  },
  {
    firstname: "John",
    lastname: "White",
    position: "Chief",
    image: "doctor_image_8_1.jpg",
  },
  {
    firstname: "Helen",
    lastname: "Jones",
    position: "Attending",
    image: "doctor_image_8_2.jpg",
  },
  {
    firstname: "Diana",
    lastname: "Jones",
    position: "General",
    image: "doctor_image_8_3.jpg",
  },
  {
    firstname: "John",
    lastname: "Martinez",
    position: "Chief",
    image: "doctor_image_9_1.jpg",
  },
  {
    firstname: "Bob",
    lastname: "Jones",
    position: "Attending",
    image: "doctor_image_9_2.jpg",
  },
  {
    firstname: "Diana",
    lastname: "Smith",
    position: "General",
    image: "doctor_image_9_3.jpg",
  },
  {
    firstname: "Eddie",
    lastname: "Doe",
    position: "Chief",
    image: "doctor_image_10_1.jpg",
  },
  {
    firstname: "George",
    lastname: "Davis",
    position: "Attending",
    image: "doctor_image_10_2.jpg",
  },
  {
    firstname: "Jane",
    lastname: "Miller",
    position: "General",
    image: "doctor_image_10_3.jpg",
  },
  {
    firstname: "Helen",
    lastname: "White",
    position: "Chief",
    image: "doctor_image_11_1.jpg",
  },
  {
    firstname: "Fiona",
    lastname: "Jones",
    position: "Attending",
    image: "doctor_image_11_2.jpg",
  },
  {
    firstname: "Jane",
    lastname: "Smith",
    position: "General",
    image: "doctor_image_11_3.jpg",
  },
  {
    firstname: "Alice",
    lastname: "Garcia",
    position: "Chief",
    image: "doctor_image_12_1.jpg",
  },
  {
    firstname: "Helen",
    lastname: "Miller",
    position: "Attending",
    image: "doctor_image_12_2.jpg",
  },
  {
    firstname: "Bob",
    lastname: "Martinez",
    position: "General",
    image: "doctor_image_12_3.jpg",
  },
  {
    firstname: "Fiona",
    lastname: "Miller",
    position: "Chief",
    image: "doctor_image_13_1.jpg",
  },
  {
    firstname: "John",
    lastname: "Martinez",
    position: "Attending",
    image: "doctor_image_13_2.jpg",
  },
  {
    firstname: "Bob",
    lastname: "Davis",
    position: "General",
    image: "doctor_image_13_3.jpg",
  },
  {
    firstname: "John",
    lastname: "Johnson",
    position: "Chief",
    image: "doctor_image_14_1.jpg",
  },
  {
    firstname: "John",
    lastname: "Martinez",
    position: "Attending",
    image: "doctor_image_14_2.jpg",
  },
  {
    firstname: "Fiona",
    lastname: "White",
    position: "General",
    image: "doctor_image_14_3.jpg",
  },
  {
    firstname: "Alice",
    lastname: "White",
    position: "Chief",
    image: "doctor_image_15_1.jpg",
  },
  {
    firstname: "Eddie",
    lastname: "White",
    position: "Attending",
    image: "doctor_image_15_2.jpg",
  },
  {
    firstname: "Diana",
    lastname: "Martinez",
    position: "General",
    image: "doctor_image_15_3.jpg",
  },
  {
    firstname: "Bob",
    lastname: "Davis",
    position: "Chief",
    image: "doctor_image_16_1.jpg",
  },
  {
    firstname: "Charlie",
    lastname: "Jones",
    position: "Attending",
    image: "doctor_image_16_2.jpg",
  },
  {
    firstname: "Diana",
    lastname: "Miller",
    position: "General",
    image: "doctor_image_16_3.jpg",
  },
  {
    firstname: "Helen",
    lastname: "Smith",
    position: "Chief",
    image: "doctor_image_17_1.jpg",
  },
  {
    firstname: "Diana",
    lastname: "Miller",
    position: "Attending",
    image: "doctor_image_17_2.jpg",
  },
  {
    firstname: "Jane",
    lastname: "Davis",
    position: "General",
    image: "doctor_image_17_3.jpg",
  },
  {
    firstname: "Alice",
    lastname: "White",
    position: "Chief",
    image: "doctor_image_18_1.jpg",
  },
  {
    firstname: "Eddie",
    lastname: "Davis",
    position: "Attending",
    image: "doctor_image_18_2.jpg",
  },
  {
    firstname: "Alice",
    lastname: "White",
    position: "General",
    image: "doctor_image_18_3.jpg",
  },
  {
    firstname: "Alice",
    lastname: "Martinez",
    position: "Chief",
    image: "doctor_image_19_1.jpg",
  },
  {
    firstname: "John",
    lastname: "Miller",
    position: "Attending",
    image: "doctor_image_19_2.jpg",
  },
  {
    firstname: "Eddie",
    lastname: "Doe",
    position: "General",
    image: "doctor_image_19_3.jpg",
  },
  {
    firstname: "Charlie",
    lastname: "Brown",
    position: "Chief",
    image: "doctor_image_20_1.jpg",
  },
  {
    firstname: "Fiona",
    lastname: "Johnson",
    position: "Attending",
    image: "doctor_image_20_2.jpg",
  },
  {
    firstname: "George",
    lastname: "Martinez",
    position: "General",
    image: "doctor_image_20_3.jpg",
  },
];

router.get("/create", (req, res, next) => {
  Doctor.create(doctorsData)
    .then((doctors) => {
      console.log("Departments created and saved to the database:", doctors);
      res.send(doctors);
    })
    .catch((error) => {
      console.error("Error creating doctors:", error);
    });
});

router.get("/", (req, res, next) => {
  Doctor.find()
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
  Department.create(doctorData)
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
    .populate("Department")
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
  Department.findByIdAndUpdate(doctorId, updateDoctor, { new: true })
    .populate("Department")
    .then((updatedDoctor) => {
      res.json(updatedDoctor);
    })
    .catch((error) => {
      console.error("Error getting Doctor:", error);
    });
});
router.delete("/:id", (req, res, next) => {
  const doctorId = req.params.id;
  Department.findByIdAndDelete(doctorId).then((doctor) => {
    res.json("doctor deleted");
  });
});

module.exports = router;
