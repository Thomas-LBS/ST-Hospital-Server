// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const cors = require("cors");

//websocket.io codes
const http = require("http");
const { Server } = require("socket.io");
const UserSocketModel = require("./models/UserSocketModel"); // Assuming the UserSocket model file

const app = express();
app.use(cors());
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const departmentRoutes = require("./routes/department.routes");
app.use("/departments", departmentRoutes);

const doctorsRoutes = require("./routes/doctors.routes");
app.use("/doctors", doctorsRoutes);

const patientRoutes = require("./routes/patient.routes");
app.use("/patient", patientRoutes);

const gPractionerRoutes = require("./routes/gPractice.routes");
app.use("/gPractice", gPractionerRoutes);

const createRoutes = require("./routes/create.routes");
app.use("/create", createRoutes);

const appointmentRoutes = require("./routes/appointment.routes");
app.use("/appointment", appointmentRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// Set up the HTTP server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your client's URL
    methods: ["GET", "POST"], // Add the required methods
  },
});

// io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.id}`)

//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });

//   // Handle messaging between doctors here
//   socket.on('doctorMessage', (message) => {
//     console.log(`Doctor ${socket.id} sent a message: ${message}`);

//     // Broadcast the message to other doctors or handle logic as per your requirement
//     io.emit('doctorMessage', message);
//   });
// });


io.on("connection", (socket) => {
  socket.on("login", (userId) => {
    UserSocketModel.findOne({ userId })
      .then((userSocketData) => {
        if (!userSocketData) {
          return UserSocketModel.create({ userId, socketId: socket.id });
        }
        return userSocketData;
      })
      .then((userSocketData) => {
        socket.on("disconnect", () => {
          // Handle disconnect logic if needed
          UserSocketModel.findByIdAndUpdate(
            userId,
            { $set: { online: false } },
            { new: true }
          )
            .then(() => {
              console.log(`User disconnected: ${userId}`);
            })
            .catch((error) => {
              console.error("Error on user disconnection:", error);
            });
        });

        socket.on("privateMessage", (messageData) => {
          const { recipientId, message } = messageData;

          // Check recipient's status or perform other actions
          // Example: UserSocketModel.getStatus(recipientId)
          //   .then((recipientStatus) => {
          //     if (recipientStatus === 'online') { ... } else { ... }
          //   })
          //   .catch((error) => {
          //     console.error('Error checking recipient status:', error);
          //   });
          io.to(recipientId).emit("privateMessage", {
            senderId: userId,
            message,
          });
          // Optionally, emit an acknowledgment back to the sender

          socket.emit("messageSentConfirmation", { recipientId, message });
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});

module.exports = { app, server };
