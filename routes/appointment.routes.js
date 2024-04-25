const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Appointment = require("../models/Appointment.model");
const Department = require("../models/Department.model");
const Doctor = require("../models/Doctor.model");
const mongoose = require("mongoose");
const mailjet = require("node-mailjet").apiConnect(
  "89745ade8698105b528d3a09d495e007",
  "33bbdd3b108653d941b38de6929523d4"
);
const axios = require("axios");

// Function to send an SMS reminder
const sendReminderSMS = async (phoneNumber, message) => {
  const authToken = "Bearer 0485cb1c4dcc4d75a7778be376f42468"; // Replace with your Sinch API token
  const smsApiEndpoint =
    "https://sms.api.sinch.com/xms/v1/cbebf37557b74f8bb754f9d35756b6fe/batches";

  const requestBody = {
    from: "0682827102",
    to: [phoneNumber],
    body: message,
  };

  try {
    const response = await axios.post(smsApiEndpoint, requestBody, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    res.json(error);
  }
};

function convertTo12HourFormat(timestamp) {
  const date = new Date(timestamp);
  const localTime = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  let hours = localTime.getHours();
  const minutes = ("0" + localTime.getMinutes()).slice(-2);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const formattedTime = hours + ":" + minutes + " " + ampm;

  return formattedTime;
}

// Function to send an email
const sendGeneralMail = function (mail, sub, msg) {
  return mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Name: "ST Hospital",
          Email: "sunithajosephine22@gmail.com",
        },
        To: [
          {
            Email: "sunithatheresa18@gmail.com",
            Name: "Sunitha",
          },
        ],
        Subject: sub,
        TextPart: msg,
      },
    ],
  });
};
// Function to send a custom email
const sendCustomMail = async (name, senderEmail, subject, message) => {
  try {
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Name: name,
            Email: senderEmail,
          },
          To: [
            {
              Email: "sunithatheresa18@gmail.com",
              Name: "Sunitha",
            },
          ],
          Subject: subject,
          TextPart: message,
        },
      ],
    });
  } catch (error) {
    throw error;
  }
};

router.get("/", (req, res, next) => {
  Appointment.find()
    .populate("user")
    .populate("doctor")
    .populate("department")
    .then((appts) => {
      res.json(appts);
    });
});

router.post("/create", async (req, res, next) => {
  try {
    const { user, department, doctor, start, end, complaints } = req.body;
    const fetchedUser = await User.findById(user);
    const fetchedDept = await Department.findById(department);
    const fetchedDoctor = await Doctor.findById(doctor);

    const createdAppointment = await Appointment.create({
      user: fetchedUser.id,
      department: fetchedDept.id,
      doctor: fetchedDoctor.id,
      start,
      end,
      complaints,
    });
    sendGeneralMail(
      `${fetchedUser.email}`,
      "Appointment Confirmation",
      `Hi ${fetchedUser.firstname} ${
        fetchedUser.lastname
      }. You have booked an appointment with DR.${fetchedDoctor.firstname} ${
        fetchedDoctor.lastname
      } at ${convertTo12HourFormat(createdAppointment.start)} on ${new Date(
        createdAppointment.start
      ).toDateString()}`
    )
      .then((response) => {})
      .catch((error) => {
        res.json(error);
      });
    // Calculate the time 24 hours before the appointment
    const reminderTime = new Date(start);
    reminderTime.setHours(reminderTime.getHours() - 24);

    // Schedule the SMS reminder
    const currentTime = new Date();
    const timeDifference = reminderTime.getTime() - currentTime.getTime();

    if (timeDifference > 0) {
      setTimeout(() => {
        sendReminderSMS(
          fetchedUser.patientDetails.contactNumber,
          `Your appointment with ${fetchedDoctor.firstname} ${
            fetchedDoctor.lastname
          } is in 24 hours! at ${convertTo12HourFormat(
            createdAppointment.start
          )}`
        );
      }, timeDifference);
    }

    res.json(createdAppointment);
  } catch (error) {
    res.status(500).json({ error: "Error creating appointment" });
  }
});

router.get("/doctor/:id", (req, res, next) => {
  const doctorid = req.params.id;
  Appointment.find({ doctor: doctorid })
    .populate("user")
    .populate("doctor")
    .populate("department")
    .then((appts) => {
      res.json(appts);
    });
});
router.get("/patient/:id", (req, res, next) => {
  const patientid = req.params.id;
  Appointment.find({ user: patientid })
    .populate("user")
    .populate("doctor")
    .populate("department")
    .then((appts) => {
      res.json(appts);
    });
});
router.patch("/patient/update/:id", (req, res, next) => {
  const apptId = req.params.id;
  const newStartTime = req.body.slotStartTime;
  const newendTime = req.body.slotEndTime;
  Appointment.findByIdAndUpdate(
    apptId,
    { start: newStartTime, end: newendTime },
    { new: true }
  )
    .populate("user")
    .populate("doctor")
    .populate("department")
    .then((appts) => {
      sendGeneralMail(
        `${appts.user.email}`,
        "Appointment Changed",
        `Hi ${appts.user[0].firstname} ${
          appts.user[0].lastname
        }. You have changed your appointment with DR.${
          appts.doctor[0].firstname
        } ${appts.doctor[0].lastname} to ${convertTo12HourFormat(
          appts.start
        )} on ${new Date(appts.start).toDateString()}`
      )
        .then((response) => {
          // Handle success
          res.json(appts);
        })
        .catch((error) => {
          res.json(error);
        });
    });
});

router.delete("/patient/delete/:id", (req, res, next) => {
  const apptid = req.params.id;
  Appointment.findByIdAndDelete(apptid)
    .populate("user")
    .populate("doctor")
    .populate("department")
    .then((appts) => {
      sendGeneralMail(
        `${appts.user.email}`,
        "Appointment Cancelled",
        `Hi ${appts.user[0].firstname} ${
          appts.user[0].lastname
        }. You have cancelled your appointment with DR.${
          appts.doctor[0].firstname
        } ${appts.doctor[0].lastname} at ${convertTo12HourFormat(
          appts.start
        )} on ${new Date(appts.start).toDateString()}`
      )
        .then((response) => {
          // Handle success
          res.json(appts);
        })
        .catch((error) => {
          res.json(error);
        });
    });
});
router.get("/sendMail", (req, res, next) => {
  res.json("everything working fine here")
})
router.post("/sendMail", (req, res, next) => {
  const { name, senderEmail, subject, message } = req.body;

  // Sending email using the sendCustomMail function
  sendCustomMail(name, senderEmail, subject, message)
    .then(() => {
      res.json({ message: "Email sent successfully!" });
    })
    .catch((error) => {
      res.status(404).json({ error: "Error sending email" });
    });
});

module.exports = router;
