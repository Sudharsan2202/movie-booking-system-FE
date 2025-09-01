import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

// Prevent model overwrite in dev environments
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
