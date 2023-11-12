const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const doctorSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "Name is required."],
    },
    lastname: {
      type: String,
      required: [true, "Name is required."],
    },
    department: {
      type:[ {type: Schema.Types.ObjectId,
      ref: "Department"}],
      required: true,
    },
    position: {
      type: String,
      enum: ["Chief", "Attending", "General"], 
    },
    image: { type: String, default: "default_image_link.jpg" },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Doctor = model("Doctor", doctorSchema);

module.exports = Doctor;
