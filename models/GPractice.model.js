const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const GPracticeSchema = new Schema(
  {
    name:{
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Password is required."],
    },
    address: {
      houseNumber: String,
      street: String,
      city: String,
      postalCode: String,
      country: String
    }  ,
    image:{
      type:String
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const GPractice = model("GPractice", GPracticeSchema);

module.exports = GPractice;
