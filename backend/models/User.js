import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["patient", "doctor", "admin"], required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gender: { type: String },
  age: { type: Number },

  // Doctor-specific fields
  specialization: { type: String },
  experience: { type: Number },
  availability: [
    {
      day: String,   // e.g. "Monday"
      slots: [String], // e.g. ["10:00 AM", "11:00 AM"]
    },
  ],

  // ✅ For admin approval
  isApproved: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
