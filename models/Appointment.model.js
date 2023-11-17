const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
  {
    user: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: [true, "Name is required."],
    },
    department: {
      type: [{ type: Schema.Types.ObjectId, ref: "Department" }],
      required: [true, "Department is required."],
    },
    doctor: {
      type: [{ type: Schema.Types.ObjectId, ref: "Doctor" }],
      required: [true, "Doctor is required."],
    },
    // title: {
    //   type: String,
    //   required: [true, "Title is required."],
    // },
    start:{
      type: Date,
      // required: [true, "Start Time is required."],
    },
    end:{
      type: Date,
      // required: [true, "End Time is required."],
    },
    // description:{
    //   type: String,
    //   required: [true, "Description is required."],
    // },
  },

  {
    timestamps: true,
  }
);


const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;
