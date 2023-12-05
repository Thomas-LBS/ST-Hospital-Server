// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config()

// ℹ️ Connects to the database
require("./db")

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express")
const cors = require("cors")



const app = express()
app.use(cors())
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app)

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes")
app.use("/", indexRoutes)

const authRoutes = require("./routes/auth.routes")
app.use("/auth", authRoutes)

const departmentRoutes = require("./routes/department.routes")
app.use("/departments", departmentRoutes)

const doctorsRoutes = require("./routes/doctors.routes")
app.use("/doctors", doctorsRoutes)

const patientRoutes = require("./routes/patient.routes")
app.use("/patient", patientRoutes)

const gPractionerRoutes = require("./routes/gPractice.routes")
app.use("/gPractice", gPractionerRoutes)

const createRoutes = require("./routes/create.routes")
app.use("/create", createRoutes)

const appointmentRoutes = require("./routes/appointment.routes")
app.use("/appointment", appointmentRoutes)

const patientRecordsRoutes = require("./routes/patientRecord.routes")
app.use("/patientRecord", patientRecordsRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app)

// Set up the HTTP server


module.exports = { app  }
