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

const patientRecordsRoutes = require("./routes/patientRecord.routes");
app.use("/patientRecord", patientRecordsRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// Set up the HTTP server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
// const userSockets = {}

// io.on("connection", (socket) => {
//     // console.log('tesitng')
//   socket.on("login", (userId) => {
//     console.log(userId);
//     UserSocketModel.findOne({ userId })
//       .then((userSocketData) => {
//         if (!userSocketData) {
//           return UserSocketModel.create({ userId, socketId: socket.id });
//         }
//         return userSocketData;
//       })
//       .then((userSocketData) => {
//         userSockets[userId] = socket;

//         // Handle disconnect logic if needed
//         socket.on("disconnect", () => {
//           UserSocketModel.findByIdAndUpdate(
//             userId,
//             { $set: { online: false } },
//             { new: true }
//           )
//             .then(() => {
//               console.log(`User disconnected: ${userId}`);
//               delete userSockets[userId];
//             })
//             .catch((error) => {
//               console.error("Error on user disconnection:", error);
//             });
//         });
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   });
//   socket.on("privateMessage", (messageData) => {
//     const { recipientId, message,userId } = messageData;
//     console.log("privateMessage triggered:");
//     console.log("message:", messageData.message);
//     // Check recipient's status or perform other actions
//     // Example: UserSocketModel.getStatus(recipientId)
//     //   .then((recipientStatus) => {
//     //     if (recipientStatus === 'online') { ... } else { ... }
//     //   })
//     //   .catch((error) => {
//     //     console.error('Error checking recipient status:', error);
//     //   });
//     const receivingMessage={
//         senderId: userId,
//         message,
//       }
//     io.to(recipientId).emit("doctorMessage", receivingMessage);
//     // Optionally, emit an acknowledgment back to the sender

//     socket.emit("messageSentConfirmation", { recipientId, message });
//   });

// });
// const userSockets = {};

// io.on("connection", (socket) => {
//   socket.on("login", async (userId) => {
//     console.log(userId);
//     try {
//       let userSocketData = await UserSocketModel.findOne({ userId });

//       if (!userSocketData) {
//         userSocketData = await UserSocketModel.create({ userId, socketId: socket.id });
//       }

//       userSockets[userId] = socket;

//       // Handle disconnect logic if needed
//       socket.on("disconnect", async () => {
//         try {
//           await UserSocketModel.findByIdAndUpdate(
//             userId,
//             { $set: { online: false } },
//             { new: true }
//           );
//           console.log(`User disconnected: ${userId}`);
//           delete userSockets[userId];
//         } catch (error) {
//           console.error("Error on user disconnection:", error);
//         }
//       });
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   });

//   socket.on("privateMessage", async (messageData) => {
//     const { recipientId, message, userId } = messageData;
//     console.log("privateMessage triggered:");
//     console.log("message:", messageData.message);

//     const receivingMessage = {
//       senderId: userId,
//       message,
//       recipientId:recipientId
//     };

//     io.to(recipientId).emit("testMessage", receivingMessage);
//     console.log("Message sent:", receivingMessage)
//     // Optionally, emit an acknowledgment back to the sender
//     socket.emit("messageSentConfirmation", { recipientId, message });
//   });
// });

// const userSockets = {};

io.on("connection", (socket) => {
  socket.on("login", async (userId) => {
    console.log("socket.id", socket.id);
    console.log("userId", userId);
    try {
      // let userSocketData = await UserSocketModel.findOne({ userId });
      
      userSocketData = await UserSocketModel.create({
        user: userId,
        socketId: socket.id,
      });
      console.log("userSocketData.socketId", userSocketData.socketId);
    
      // const updatedsocketData = await UserSocketModel.findOneAndUpdate(
      //   { user: userId },
      //   { $set: { socketId: socket.id } },
      //   { upsert: true }
      // );
      // console.log("socket.id updatedsocketData", updatedsocketData.socketId);

      // userSockets[userId] = socket;
      // console.log("userSocketsId", userSocketData.socketId);
      // Handle disconnect logic when the user disconnects
      // socket.on("disconnect", async () => {
      //   try {
      //     await UserSocketModel.findOneAndDelete({user:userId});
      //     console.log(`User disconnected: ${userId}`);
      //     // delete userSockets[userId];
      //   } catch (error) {
      //     console.error("Error on user disconnection:", error);
      //   }
      // });
    } catch (error) {
      console.error("Error:", error);
    }
  });
  // socket.on('diogo',(msg)=>{
  //   console.log(msg)
  //   socket.emit('diogo',(msg))
  // })
  socket.on("privateMessage", async (messageData) => {
    const { recipientId, message, userId } = messageData;
    console.log(messageData.message);
    console.log("socket.id privateMessage", socket.id);
    console.log("recipientId", recipientId);

    // Handling user association with socket
    try {
      // Retrieve the socketId associated with the recipientId from MongoDB
      // const recipientSocketInfo = await UserSocketModel.findOne({
      //   user: recipientId,
      // });
      // if (recipientSocketInfo && recipientSocketInfo.socketId) {
      //   const recipientSocketId = recipientSocketInfo.socketId;
      // Emit the message to the recipient using the retrieved socketId
      if (recipientId) {
      io.to(recipientId).emit("testMessage", {
        senderId: userId,
        message,
        recipientId,
      });
      console.log(`test message sent successfully`);

    } else {
      console.log(`User ${userId} is not connected`);
    }
      // io.sockets.connected[recipientId].emit("testMessage", {
      //   senderId: userId,
      //   message,
      //   recipientId,
      // });
      console.log("testMessage sent successfully");
      // } else {
      //   console.error("Recipient socketId not found");
      //   // Handle the scenario where the recipient's socketId is not found
      // }
      // Optionally, emit an acknowledgment back to the sender
      socket.emit("messageSentConfirmation", { recipientId, message });
    } catch (error) {
      console.error("Error:", error);
      socket.emit("recipientNotFound", { recipientId, message });
    }

    // Emitting message to the recipient
  });
});

module.exports = { app, server };
