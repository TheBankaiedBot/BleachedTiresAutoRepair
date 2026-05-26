import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAppointment,
  getMyAppointments,
  updateAppointment,
  cancelAppointment,
  getServices
} from "../../../api/api";

export default function AppointmentPage() {
  const navigate = useNavigate();

  // Form state
  const [serviceId, setServiceId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [message, setMessage] = useState("");
  const [services, setServices] = useState([]);

  // Appointments list
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Editing state
  const [editingId, setEditingId] = useState(null);

  // Map service IDs → names
  const serviceNames = Object.fromEntries(
    services.map((s) => [s._id, s.name])
  );

  // ------------------ LOAD APPOINTMENTS + SERVICES ------------------
  useEffect(() => {
    loadAppointments();
    loadServices();
  }, []);

  const loadAppointments = async () => {
    const result = await getMyAppointments();

    if (!result.success) {
      setMessage(result.message);
      setLoading(false);
      return;
    }

    setAppointments(result.appointments || []);
    setLoading(false);
  };

  const loadServices = async () => {
    const result = await getServices();

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setServices(result.services || []);
  };

  // ------------------ CREATE APPOINTMENT ------------------
  const handleBook = async () => {
    setMessage("");

    const result = await createAppointment({
      serviceId,
      appointmentDate,
      appointmentTime,
      customerNotes
    });

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage("Appointment booked successfully!");

    // Add new appointment to UI
    setAppointments((prev) => [...prev, result.data.appointment]);

    // Reset form
    resetForm();
  };

  // ------------------ EDIT APPOINTMENT ------------------
  const startEdit = (appt) => {
    setEditingId(appt._id);
    setServiceId(appt.serviceId);
    setAppointmentDate(appt.appointmentDate);
    setAppointmentTime(appt.appointmentTime);
    setCustomerNotes(appt.customerNotes);
  };

  const handleUpdate = async () => {
    const result = await updateAppointment(editingId, {
      serviceId,
      appointmentDate,
      appointmentTime,
      customerNotes
    });

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage("Appointment updated successfully");

    // Update UI
    setAppointments((prev) =>
      prev.map((a) =>
        a._id === editingId ? result.data.appointment : a
      )
    );

    resetForm();
  };

  // ------------------ CANCEL APPOINTMENT ------------------
  const handleCancel = async (id) => {
    const result = await cancelAppointment(id);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage("Appointment cancelled");

    setAppointments((prev) =>
      prev.map((a) =>
        a._id === id ? { ...a, status: "Cancelled" } : a
      )
    );
  };

  // ------------------ RESET FORM ------------------
  const resetForm = () => {
    setEditingId(null);
    setServiceId("");
    setAppointmentDate("");
    setAppointmentTime("");
    setCustomerNotes("");
  };

  // ------------------ UI ------------------
  return (
    <div className="appointment-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        Go Back
      </button>

      <h2>{editingId ? "Edit Appointment" : "Book an Appointment"}</h2>

      <div className="form-container">
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />

        <input
          type="time"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
        />

        <textarea
          placeholder="Notes"
          value={customerNotes}
          onChange={(e) => setCustomerNotes(e.target.value)}
        />

        {editingId ? (
          <button onClick={handleUpdate}>Save Changes</button>
        ) : (
          <button onClick={handleBook}>Book Now</button>
        )}

        {editingId && (
          <button onClick={resetForm}>Cancel Edit</button>
        )}

        {message && <p>{message}</p>}
      </div>

      <h2>Your Appointments</h2>

      {loading && <p>Loading...</p>}

      {!loading && appointments.length === 0 && (
        <p>You have no appointments yet.</p>
      )}

      {appointments.map((appt) => (
        <div key={appt._id} className="appointment-card">
          <p><strong>Service:</strong> {serviceNames[appt.serviceId] || "Unknown Service"}</p>
          <p><strong>Date:</strong> {appt.appointmentDate}</p>
          <p><strong>Time:</strong> {appt.appointmentTime}</p>
          <p><strong>Status:</strong> {appt.status}</p>

          {appt.status !== "Cancelled" && (
            <>
              <button onClick={() => startEdit(appt)}>Edit</button>
              <button onClick={() => handleCancel(appt._id)}>Cancel</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
