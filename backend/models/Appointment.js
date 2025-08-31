import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    doctorId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    
    // ✅ Status field add karo
    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected", "completed"], 
      default: "pending" 
    }
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
