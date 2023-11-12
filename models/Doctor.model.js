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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    image: { type: String, default: "default_image_link.jpg" },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Doctor = model("Doctor", doctorSchema);

module.exports = User;
