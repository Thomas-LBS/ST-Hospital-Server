const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor.model");
const Department = require("../models/Department.model");
const GPractice=require('../models/GPractice.model')
const gpracticeData = [
  {
    name: "Julius Gezondheidcentrum",
    email: "emily.johnson@example.com",
    phoneNumber: 1234567890,
    address: {
      houseNumber: "22",
      street: "Maple Lane",
      city: "Springfield",
      postalCode: "54321",
      country: "USA"
    },
    image: "https://example.com/emily_johnson.jpg"
  },
  {
    name: "De Meridiaan",
    email: "michael.brown@example.com",
    phoneNumber: 9876543210,
    address: {
      houseNumber: "7C",
      street: "Oak Street",
      city: "New York City",
      postalCode: "12345",
      country: "USA"
    },
    image: "https://example.com/michael_brown.jpg"
  },
  {
    name: "Benschop Huisartsenpraktijk",
    email: "sophia.martinez@example.com",
    phoneNumber: 5554443333,
    address: {
      houseNumber: "101",
      street: "Main Avenue",
      city: "Los Angeles",
      postalCode: "67890",
      country: "USA"
    },
    image: "https://example.com/sophia_martinez.jpg"
  },
  {
    name: "Dukatenburg Huisartsenpraktijk ",
    email: "benjamin.lee@example.com",
    phoneNumber: 1112223333,
    address: {
      houseNumber: "55",
      street: "Cedar Road",
      city: "San Francisco",
      postalCode: "13579",
      country: "USA"
    },
    image: "https://example.com/benjamin_lee.jpg"
  },
  {
    name: "Bosboomstraat Huisartsenpraktijk",
    email: "olivia.garcia@example.com",
    phoneNumber: 9998887777,
    address: {
      houseNumber: "3D",
      street: "Pine Street",
      city: "Chicago",
      postalCode: "24680",
      country: "USA"
    },
    image: "https://example.com/olivia_garcia.jpg"
  },
  {
    name: "Dr. Daniel Nguyen",
    email: "daniel.nguyen@example.com",
    phoneNumber: 7776665555,
    address: {
      houseNumber: "88",
      street: "Elm Avenue",
      city: "Miami",
      postalCode: "97531",
      country: "USA"
    },
    image: "https://example.com/daniel_nguyen.jpg"
  },
  {
    name: "Biltstraat Huisartsenpraktijk",
    email: "emma.wilson@example.com",
    phoneNumber: 3332221111,
    address: {
      houseNumber: "11B",
      street: "Willow Lane",
      city: "Seattle",
      postalCode: "86420",
      country: "USA"
    },
    image: "https://example.com/emma_wilson.jpg"
  },
  {
    name: "Plettenburg Huisartsenpraktijk",
    email: "liam.hernandez@example.com",
    phoneNumber: 6667778888,
    address: {
      houseNumber: "45",
      street: "Cypress Road",
      city: "Houston",
      postalCode: "75241",
      country: "USA"
    },
    image: "https://example.com/liam_hernandez.jpg"
  },
  {
    name: "Gezondheidscentrum De Schans",
    email: "isabella.adams@example.com",
    phoneNumber: 2223334444,
    address: {
      houseNumber: "77",
      street: "Chestnut Street",
      city: "Philadelphia",
      postalCode: "36912",
      country: "USA"
    },
    image: "https://example.com/isabella_adams.jpg"
  },
  {
    name: "Huisartsenpost Nieuwegein",
    email: "noah.taylor@example.com",
    phoneNumber: 4445556666,
    address: {
      houseNumber: "29",
      street: "Birch Lane",
      city: "Boston",
      postalCode: "58274",
      country: "USA"
    },
    image: "https://example.com/noah_taylor.jpg"
  }
];

const departmentsData = [
  {
    name: "Cardiology",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/cardiology_icon.svg",
    description: "Department specializing in heart-related issues",
    doctors: [],
  },
  {
    name: "Orthopedics",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/orthopaedic.svg",
    description: "Department focusing on musculoskeletal issues",
    doctors: [],
  },
  {
    name: "Pediatrics",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/paediatricurology.svg",
    description: "Department specializing in child healthcare",
    doctors: [],
  },
  {
    name: "Opthalmology",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/ophthalmology.svg",
    description: "Department specializing in eye-related issues",
    doctors: [],
  },
  {
    name: "Plastic Surgery",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/plasticsurgery.svg",
    description:
      "Department covering restoration, reconstruction or alteration of the human body",
    doctors: [],
  },
  {
    name: "Obstetrics and Gynecology",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/gynecology.svg",
    description: "Department focused on women's health",
    doctors: [],
  },
  {
    name: "Neonatology",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/neonatology.svg",
    description: "Department for medical care of newborn infants",
    doctors: [],
  },
  {
    name: "Radiology",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/radiology.svg",
    description: "Department handling medical imaging",
    doctors: [],
  },
  {
    name: "Oncology",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/oncology_icon.svg",
    description: "Department specializing in cancer treatment",
    doctors: [],
  },
  {
    name: "Neurology",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/neurology.svg",
    description: "Department dealing with disorders of the nervous system",
    doctors: [],
  },
  {
    name: "Dermatology",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/dermatology.svg",
    description: "Department focused on skin-related issues",
    doctors: [],
  },
  {
    name: "Endocrinology",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/endocrinology.svg",
    description: "Department specializing in endocrine system disorders",
    doctors: [],
  },
  {
    name: "Gastroenterology",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/gastroenterology.svg",
    description: "Department dealing with digestive system disorders",
    doctors: [],
  },
  {
    name: "Urology",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/urology.svg",
    description:
      "Department specializing in urinary tract and male reproductive system issues",
    doctors: [],
  },
  {
    name: "Nephrology",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/nephrology.svg",
    description: "Department focusing on kidney-related issues",
    doctors: [],
  },
  {
    name: "Pulmonology",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/pulmonology.svg",
    description: "Department dealing with respiratory system disorders",
    doctors: [],
  },
  {
    name: "Vascular Surgery",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/vascularsurgery.svg",
    description: "Department specializing in vascular diseases",
    doctors: [],
  },
  {
    name: "Dentistry",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/dentistry.svg",
    description: "Department focusing on the teeth, gums, and mouth",
    doctors: [],
  },
  {
    name: "Psychiatry",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/psychiatry.svg",
    description: "Department specializing in mental health",
    doctors: [],
  },
  {
    name: "ENT",
    image:
      "https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/ent.svg",
    description:
      "Department providing care and treatment of ear, nose, throat and neck & head diseases",
    doctors: [],
  },
];

const doctorsData = [
  {
    firstname: "Bob",
    lastname: "Miller",
    position: "Chief",
    image: "doctor_image_1_1.jpg",
    education: [ 'MD', 'MBBS' ],
    phoneNumber: '657-492-4523',
  },
  {
    firstname: "Alice",
    lastname: "White",
    position: "Attending",
    image: "doctor_image_1_2.jpg",
    education: [ 'MD' ],
    phoneNumber: '182-397-8136',
  },
  {
    firstname: "John",
    lastname: "Doe",
    position: "General",
    image: "doctor_image_1_3.jpg",
    education: [ 'MD', 'MBBS' ],
    phoneNumber: '845-998-3768',
  },
  {
    firstname: "Fiona",
    lastname: "Brown",
    position: "Chief",
    image: "doctor_image_2_1.jpg",
    education: [ 'MD', 'PhD' ],
    phoneNumber: '333-98-5331',
  },
  {
    firstname: "Bob",
    lastname: "Johnson",
    position: "Attending",
    image: "doctor_image_2_2.jpg",
    education: [ 'PhD', 'MBBS' ],
    phoneNumber: '984-431-1595',
  },
  {
    firstname: "George",
    lastname: "Davis",
    position: "General",
    image: "doctor_image_2_3.jpg",
    education: [ 'MBBS' ],
    phoneNumber: '726-632-1884',
  },
  {
    firstname: "Bob",
    lastname: "Johnson",
    position: "Chief",
    image: "doctor_image_3_1.jpg",
    education: [ 'MBBS', 'MD' ],
    phoneNumber: '737-230-9443',
  },
  {
    firstname: "Charlie",
    lastname: "Miller",
    position: "Attending",
    image: "doctor_image_3_2.jpg",
    education: [ 'MBBS' ],
    phoneNumber: '190-914-4631',
  },
  {
    firstname: "Diana",
    lastname: "Jones",
    position: "General",
    image: "doctor_image_3_3.jpg",
    education: [ 'MD' ],
    phoneNumber: '846-871-1438',
  },
  {
    firstname: "Bob",
    lastname: "Johnson",
    position: "Chief",
    image: "doctor_image_4_1.jpg",
    education: [ 'MBBS', 'MD' ],
    phoneNumber: '553-996-7924',
  },
  {
    firstname: "Eddie",
    lastname: "Davis",
    position: "Attending",
    image: "doctor_image_4_2.jpg",
    education: [ 'MD', 'MBBS' ],
    phoneNumber: '742-678-1939',
  },
  {
    firstname: "John",
    lastname: "Martinez",
    position: "General",
    image: "doctor_image_4_3.jpg",
    education: [ 'MD' ],
    phoneNumber: '216-890-7617',
  },
  {
    firstname: "Charlie",
    lastname: "White",
    position: "Chief",
    image: "doctor_image_5_1.jpg",
    education: [ 'MBBS' ],
    phoneNumber: '136-469-2031',
  },
  {
    firstname: "Bob",
    lastname: "Davis",
    position: "Attending",
    image: "doctor_image_5_2.jpg",
    education: [ 'MD', 'PhD' ],
    phoneNumber: '821-706-2992',
  },
  {
    firstname: "Helen",
    lastname: "Jones",
    position: "General",
    image: "doctor_image_5_3.jpg",
    education: [ 'PhD', 'MBBS' ],
    phoneNumber: '714-210-8793',
  },
  {
    firstname: "Eddie",
    lastname: "White",
    position: "Chief",
    image: "doctor_image_6_1.jpg",
    education: [ 'MBBS', 'MD' ],
    phoneNumber: '695-231-5740',
  },
  {
    firstname: "George",
    lastname: "Martinez",
    position: "Attending",
    image: "doctor_image_6_2.jpg",
    education: [ 'MD', 'PhD' ],
    phoneNumber: '296-323-1614',
  },
  {
    firstname: "Jane",
    lastname: "White",
    position: "General",
    image: "doctor_image_6_3.jpg",
    education: [ 'MD' ],
    phoneNumber: '191-72-1132',
  },
  {
    firstname: "Bob",
    lastname: "Davis",
    position: "Chief",
    image: "doctor_image_7_1.jpg",
    education: [ 'PhD', 'MBBS' ],
    phoneNumber: '261-702-8741',
  },
  {
    firstname: "Eddie",
    lastname: "Davis",
    position: "Attending",
    image: "doctor_image_7_2.jpg",
    education: [ 'MBBS' ],
    phoneNumber: '359-505-5893',
  },
  {
    firstname: "Fiona",
    lastname: "Smith",
    position: "General",
    image: "doctor_image_7_3.jpg",
    education: [ 'PhD', 'MBBS' ],
    phoneNumber: '397-750-8229',
  },
  {
    firstname: "John",
    lastname: "White",
    position: "Chief",
    image: "doctor_image_8_1.jpg",
    education: [ 'PhD', 'MBBS' ],
    phoneNumber: '187-209-4685',
  },
  {
    firstname: "Helen",
    lastname: "Jones",
    position: "Attending",
    image: "doctor_image_8_2.jpg",
    education: [ 'MBBS', 'MD' ],
    phoneNumber: '235-423-7852',
  },
  {
    firstname: "Diana",
    lastname: "Jones",
    position: "General",
    image: "doctor_image_8_3.jpg",
    education: [ 'MBBS' ],
    phoneNumber: '658-550-7607',
  },
  {
    firstname: "John",
    lastname: "Martinez",
    position: "Chief",
    image: "doctor_image_9_1.jpg",
    education: [ 'MD' ],
    phoneNumber: '890-171-5354',
  },
  {
    firstname: "Bob",
    lastname: "Jones",
    position: "Attending",
    image: "doctor_image_9_2.jpg",
    education: [ 'MBBS' ],
    phoneNumber: '429-463-1672',
  },
  {
    firstname: "Diana",
    lastname: "Smith",
    position: "General",
    image: "doctor_image_9_3.jpg",
    education: [ 'MBBS', 'MD' ],
    phoneNumber: '113-456-2466',
  },
  {
    firstname: "Eddie",
    lastname: "Doe",
    position: "Chief",
    image: "doctor_image_10_1.jpg",
    education: [ 'MD' ],
    phoneNumber: '674-60-7060',
  },
  {
    firstname: "George",
    lastname: "Davis",
    position: "Attending",
    image: "doctor_image_10_2.jpg",
    education: [ 'PhD', 'MBBS' ],
    phoneNumber: '273-781-9809',
  },
  {
    firstname: "Jane",
    lastname: "Miller",
    position: "General",
    image: "doctor_image_10_3.jpg",
    education: [ 'MBBS' ],
    phoneNumber: '339-659-4017',
  },
  {
    firstname: "Helen",
    lastname: "White",
    position: "Chief",
    image: "doctor_image_11_1.jpg",
    education: [ 'MBBS', 'MD' ],
    phoneNumber: '732-46-5823',
  },
  {
    firstname: "Fiona",
    lastname: "Jones",
    position: "Attending",
    image: "doctor_image_11_2.jpg",
    education: [ 'MBBS', 'MD' ],
    phoneNumber: '344-561-3394',
  },
  {
    firstname: "Jane",
    lastname: "Smith",
    position: "General",
    image: "doctor_image_11_3.jpg",
    education: [ 'MD', 'MBBS' ],
    phoneNumber: '852-766-6854',
  },
  {
    firstname: "Alice",
    lastname: "Garcia",
    position: "Chief",
    image: "doctor_image_12_1.jpg",
    education: [ 'MD' ],
    phoneNumber: '335-214-1626',
  },
  {
    firstname: "Helen",
    lastname: "Miller",
    position: "Attending",
    image: "doctor_image_12_2.jpg",
    education: [ 'MBBS', 'MD' ],
    phoneNumber: '535-937-3691',
  },
  {
    firstname: "Bob",
    lastname: "Martinez",
    position: "General",
    image: "doctor_image_12_3.jpg",
    education: [ 'MD', 'PhD' ],
    phoneNumber: '749-700-531',
  },
  {
    firstname: "Fiona",
    lastname: "Miller",
    position: "Chief",
    image: "doctor_image_13_1.jpg",
    education: [ 'PhD', 'MBBS' ],
    phoneNumber: '330-196-1056',
  },
  {
    firstname: "John",
    lastname: "Martinez",
    position: "Attending",
    image: "doctor_image_13_2.jpg",
    education: [ 'MBBS', 'MD' ],
    phoneNumber: '685-293-9572',
  },
  {
    firstname: "Bob",
    lastname: "Davis",
    position: "General",
    image: "doctor_image_13_3.jpg",
    education: [ 'MD' ],
    phoneNumber: '540-610-359',
  },
  {
    firstname: "John",
    lastname: "Johnson",
    position: "Chief",
    image: "doctor_image_14_1.jpg",
    education: [ 'MD', 'PhD' ],
    phoneNumber: '474-594-8007',
  },
  {
    firstname: "John",
    lastname: "Martinez",
    position: "Attending",
    image: "doctor_image_14_2.jpg",
    education: [ 'MBBS', 'MD' ],
    phoneNumber: '401-124-7165',
  },
  {
    firstname: "Fiona",
    lastname: "White",
    position: "General",
    image: "doctor_image_14_3.jpg",
    education: [ 'PhD', 'MBBS' ],
    phoneNumber: '457-847-4859',
  },
  {
    firstname: "Alice",
    lastname: "White",
    position: "Chief",
    image: "doctor_image_15_1.jpg",
    education: [ 'MD', 'MBBS' ],
    phoneNumber: '860-713-3427',
  },
  {
    firstname: "Eddie",
    lastname: "White",
    position: "Attending",
    image: "doctor_image_15_2.jpg",
    education: [ 'MD' ],
    phoneNumber: '488-359-1333',
  },
  {
    firstname: "Diana",
    lastname: "Martinez",
    position: "General",
    image: "doctor_image_15_3.jpg",
    education: [ 'MD', 'PhD' ],
    phoneNumber: '724-426-9730',
  },
  {
    firstname: "Bob",
    lastname: "Davis",
    position: "Chief",
    image: "doctor_image_16_1.jpg",
    education: [ 'MBBS' ],
    phoneNumber: '310-891-9610',
  },
  {
    firstname: "Charlie",
    lastname: "Jones",
    position: "Attending",
    image: "doctor_image_16_2.jpg",
    education: [ 'MBBS', 'MD' ],
    phoneNumber: '440-20-1216',
  },
  {
    firstname: "Diana",
    lastname: "Miller",
    position: "General",
    image: "doctor_image_16_3.jpg",
    education: [ 'MD', 'PhD' ],
    phoneNumber: '891-694-6596',
  },
  {
    firstname: "Helen",
    lastname: "Smith",
    position: "Chief",
    image: "doctor_image_17_1.jpg",
    education: [ 'MD', 'MBBS' ],
    phoneNumber: '763-918-6266',
  },
  {
    firstname: "Diana",
    lastname: "Miller",
    position: "Attending",
    image: "doctor_image_17_2.jpg",
    education: [ 'PhD', 'MBBS' ],
    phoneNumber: '283-307-9352',
  },
  {
    firstname: "Jane",
    lastname: "Davis",
    position: "General",
    image: "doctor_image_17_3.jpg",
    education: [ 'MD', 'MBBS' ],
    phoneNumber: '790-111-3119',
  },
  {
    firstname: "Alice",
    lastname: "White",
    position: "Chief",
    image: "doctor_image_18_1.jpg",
    education: [ 'MBBS' ],
    phoneNumber: '291-440-5117',
  },
  {
    firstname: "Eddie",
    lastname: "Davis",
    position: "Attending",
    image: "doctor_image_18_2.jpg",
    education: [ 'MD' ],
    phoneNumber: '796-987-9280',
  },
  {
    firstname: "Alice",
    lastname: "White",
    position: "General",
    image: "doctor_image_18_3.jpg",
    education: [ 'MBBS', 'MD' ],
    phoneNumber: '228-4-7011',
  },
  {
    firstname: "Alice",
    lastname: "Martinez",
    position: "Chief",
    image: "doctor_image_19_1.jpg",
    education: [ 'MBBS', 'MD' ],
    phoneNumber: '395-780-1419',
  },
  {
    firstname: "John",
    lastname: "Miller",
    position: "Attending",
    image: "doctor_image_19_2.jpg",
    education: [ 'PhD', 'MBBS' ],
    phoneNumber: '333-521-2915',
  },
  {
    firstname: "Eddie",
    lastname: "Doe",
    position: "General",
    image: "doctor_image_19_3.jpg",
    education: [ 'PhD', 'MBBS' ],
    phoneNumber: '354-984-1503',
  },
  {
    firstname: "Charlie",
    lastname: "Brown",
    position: "Chief",
    image: "doctor_image_20_1.jpg",
    education: [ 'PhD', 'MBBS' ],
    phoneNumber: '639-280-2227',
  },
  {
    firstname: "Fiona",
    lastname: "Johnson",
    position: "Attending",
    image: "doctor_image_20_2.jpg",
    education: [ 'MBBS', 'MD' ],
    phoneNumber: '939-970-9403',
  },
  {
    firstname: "George",
    lastname: "Martinez",
    position: "General",
    image: "doctor_image_20_3.jpg",
    education: [ 'MBBS' ],
    phoneNumber: '585-525-5792',
  },
];

router.get("/", async (req, res, next) => {
  try {
    // Create departments
    const departments = await Department.create(departmentsData);

    // Create an array to store doctors
    const doctors = [];

    // Iterate through departments and doctorsData to link them
    departments.forEach((department, index) => {
      const chiefData = doctorsData[index * 3];
      const attendingData = doctorsData[index * 3 + 1];
      const generalData = doctorsData[index * 3 + 2];

      // Create doctors with corresponding data and link to the department
      const chief = new Doctor({
        firstname: chiefData.firstname,
        lastname: chiefData.lastname,
        position: chiefData.position,
        education:chiefData.education,
        phoneNumber:chiefData.phoneNumber,
        department: department._id,
      });

      const attending = new Doctor({
        firstname: attendingData.firstname,
        lastname: attendingData.lastname,
        position: attendingData.position,
        education:attendingData.education,
        phoneNumber:attendingData.phoneNumber,
        department: department._id,
      });

      const general = new Doctor({
        firstname: generalData.firstname,
        lastname: generalData.lastname,
        position: generalData.position,
        education:generalData.education,
        phoneNumber:generalData.phoneNumber,
        department: department._id,
      });

      doctors.push(chief, attending, general);
    });

    // Save all doctors
    const savedDoctors = await Doctor.create(doctors);

    // Update departments with references to doctors
    for (let i = 0; i < departments.length; i++) {
      const departmentId = departments[i]._id;
      const departmentDoctors = savedDoctors
        .slice(i * 3, (i + 1) * 3)
        .map((doctor) => doctor._id);
      await Department.findByIdAndUpdate(departmentId, {
        doctors: departmentDoctors,
      });
    }

    console.log("Data created and linked successfully.");
    res.send({ departments, doctors: savedDoctors });
  } catch (error) {
    console.error("Error creating and linking data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/gp", async (req, res, next) => {
GPractice.create(gpracticeData)
.then(response=>{
  console.log('created successfully')
})
.catch(error=>{
  console.log('error',error)
})

})

module.exports = router;
