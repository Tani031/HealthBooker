import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();


// ✅ 1. Get all doctors
router.get("/doctors", protect, adminOnly, async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 2. Approve doctor
router.put("/doctors/:id/approve", protect, adminOnly, async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.isApproved = true;
    await doctor.save();

    res.json({ message: "Doctor approved successfully", doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 3. Delete doctor
router.delete("/doctors/:id", protect, adminOnly, async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await doctor.deleteOne();
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 4. Get all patients
router.get("/patients", protect, adminOnly, async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select("-password");
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 5. Delete patient
router.delete("/patients/:id", protect, adminOnly, async (req, res) => {
  try {
    const patient = await User.findById(req.params.id);
    if (!patient || patient.role !== "patient") {
      return res.status(404).json({ message: "Patient not found" });
    }

    await patient.deleteOne();
    res.json({ message: "Patient deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 6. Get all appointments
router.get("/appointments", protect, adminOnly, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name email")
      .populate("doctorId", "name email specialization");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
