const express = require('express');
const router = express.Router();
const {updateAppointment, createAppointment, cancelAppointment, getMyAppointments} = require('../controllers/appointmentController');
const auth = require('../middleware/requireAuth');

router.post('/', auth, createAppointment);
router.get('/me',auth, getMyAppointments);
router.put('/:id',auth, updateAppointment);
router.patch('/:id',auth, cancelAppointment);

module.exports = router;