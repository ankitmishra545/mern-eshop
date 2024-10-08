import mongoose from "mongoose";

//creating model for users who signing up
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profileImage: String,
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
