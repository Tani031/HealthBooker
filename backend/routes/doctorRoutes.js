import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ 1. Get Doctor's Appointments
router.get("/appointments", protect, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied, Doctors only" });
    }

    const appointments = await Appointment.find({ doctorId: req.user.id })
      .populate("patientId", "name email gender age")
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 2. Update Appointment Status (approve/reject)
router.put("/appointments/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied, Doctors only" });
    }

    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    if (appointment.doctorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own appointments" });
    }

    appointment.status = status; // "approved" | "rejected"
    await appointment.save();

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 3. Set Availability
router.put("/availability", protect, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied, Doctors only" });
    }

    const { availability } = req.body; // [{ day: "Monday", slots: ["10:00 AM", "11:00 AM"] }]
    if (!availability || !Array.isArray(availability)) {
      return res.status(400).json({ message: "Invalid availability format" });
    }

    const doctor = await User.findById(req.user.id);
    doctor.availability = availability;
    await doctor.save();

    res.json({
      message: "✅ Availability updated successfully",
      availability: doctor.availability,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 4. Mark Appointment as Completed
router.put("/appointments/:id/complete", protect, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied, Doctors only" });
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    if (appointment.doctorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only complete your own appointments" });
    }

    appointment.status = "completed";
    await appointment.save();

    res.json({ message: "✅ Appointment marked as completed", appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
