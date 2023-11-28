const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    username: {
      type: String,
      required: [true, "Name is required."],
    },
    firstname: {
      type: String,
      required: [true, "First Name is required."],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required."],
    },
    role: {
      type: String,
      enum: ["admin", "doctor", "patient"],
      default: "patient",
      required: true,
    },
    patientDetails: {
      type: {
        dateOfBirth: Date,
        contactNumber: String,
        gp: [{ type: Schema.Types.ObjectId, ref: "GPractice" }],
        address: {
          houseNumber: String,
          street: String,
          city: String,
          postalCode: String,
          country: String,
        },
      },
      required: false,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
