const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    appointmentDate: {type: Date, required: true},
    appointmentTime: {type: String, required: true},
    status: {
        type: String,
        enum: ["Scheduled", "Completed", "Cancelled"],
        default: "Scheduled"
    },
    customerNotes: String
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;