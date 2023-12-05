const { Schema, model } = require("mongoose");

const doctorSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required."],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required."],
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    position: {
      type: String,
      enum: ["Chief", "Attending", "General"],
    },
    education: [
      {
        type: String,
      },
    ],
    phoneNumber: {
      type: String,
    },
    appointment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    image: { type: String, default: "default_image_link.jpg" },
  },
  {
    timestamps: true,
  }
);

const Doctor = model("Doctor", doctorSchema);

module.exports = Doctor;
