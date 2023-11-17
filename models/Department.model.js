const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    image: {
      type: String,
     
    },
    description: {
      type: String,
      
    },
    doctors:{
        type:[{type: Schema.Types.ObjectId, ref:'Doctor'}],
        
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Department = model("Department", departmentSchema);

module.exports = Department;
