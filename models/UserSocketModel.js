const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const UserSocketSchema = new Schema(
  {
    userId: { type: String, required: true },
    socketId: { type: String, required: true },
    online: {
        type: Boolean,
        default: true
      },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const UserSocket = model("UserSocket", UserSocketSchema);

module.exports = UserSocket;
