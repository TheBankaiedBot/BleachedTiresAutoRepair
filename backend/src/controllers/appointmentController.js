const Appointment = require("../models/appointmentModel");



createAppointment = async (req, res) => {
const Appointment = require("../models/appointmentModel");
const { create } = require("../models/userModel");


const { serviceId, appointmentDate, appointmentTime, customerNotes } = req.body;
const userId = req.user.id;
const appointmentId = req.params.id;

try {
    const appointment = await Appointment.create({
        userId,
        serviceId,
        appointmentDate,
        appointmentTime,
        customerNotes
    })
    res.status(201).json({message: 'Appointment created successfully', appointment});
} catch (err){
    if(err.code === 11000) return res.status(409).json({message: 'You already have an active appiontment'});

}
}


const updateAppointment = async (req, res) => {
    try{
    
    const userId = req.user.id;
    const appointmentId = req.params.id;
    const appt = await Appointment.findById(appointmentId);
    if(!appt) return res.status(404).json({message: 'Appointment not found'});
    
    if(!appt.userId.equals(userId)) return res.status(403).json({message: 'Unauthorized update'});

    if(['Cancelled','Completed'].includes(appt.status)) return res.status(400).json({message: 'Cannot modify a cancelled or completed appointment'});

    appt.serviceId = req.body.serviceId || appt.serviceId;
    appt.appointmentDate = req.body.appointmentDate || appt.appointmentDate;
    appt.appointmentTime = req.body.appointmentTime || appt.appointmentTime;
    appt.customerNotes = req.body.customerNotes || appt.customerNotes;
    const saved = await appt.save();
     return res.status(200).json(saved);
    } catch (err) {
        res.status(500).json({message: ' Server Error'});
        if(err.code === 11000) return res.status (409).json({message: 'No Details Changed'});
    }     
}

const cancelAppointment = async(req, res) => {
    try {
        const userId = req.user.id;
        const appointmentId = req.params.id;
        const appt = await Appointment.findById(appointmentId);
        if(!appt) return res.status(404).json({message: 'Appointment not found'});

        if(!appt.userId.equals(userId)) return res.status(403).json({message: 'Unauthorized cancellation'});

        if(appt.status === 'Cancelled') return res.status(400).json({message:' Appointment alreday cancelled'});
        appt.status = 'Cancelled';
        await appt.save();
        return res.status(200).json({message: 'Appointment cancelled successfully'});
    } catch (err) {
        res.status(500).json({message: 'Server Error'});
    }
}

const getMyAppointments = async(req, res) => {
    try {
        const userId = req.user.id;
        const appointmentId = req.params.id;
        const appointments = await Appointment.find({userId});
        res.status(200).json({message: 'Appointments retrieved successfully', appointments});
    } catch (err) {
        res.status(500).json({message: 'Server Error'});
    }

}
module.exports = {createAppointment, updateAppointment, cancelAppointment, getMyAppointments};