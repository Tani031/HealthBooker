import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ 1. Search Doctors
router.get("/doctors", protect, async (req, res) => {
  try {
    const { specialization } = req.query;
    const query = { role: "doctor", isApproved: true }; // ✅ only approved doctors
    if (specialization) query.specialization = specialization;

    const doctors = await User.find(query).select("-password");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 2. Book Appointment (with availability check)
router.post("/appointments", protect, async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    const doctor = await User.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Check slot availability
    const day = new Date(date).toLocaleString("en-US", { weekday: "long" });
    const availableDay = doctor.availability.find((a) => a.day === day);

    if (!availableDay || !availableDay.slots.includes(time)) {
      return res.status(400).json({ message: "Selected slot not available" });
    }

    const appointment = await Appointment.create({
      patientId: req.user.id,
      doctorId,
      date,
      time,
      status: "pending",
    });

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 3. View Patient Appointments
router.get("/appointments", protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user.id })
      .populate("doctorId", "name specialization email")
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
