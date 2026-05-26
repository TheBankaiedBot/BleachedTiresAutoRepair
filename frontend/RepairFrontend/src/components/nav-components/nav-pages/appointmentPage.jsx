import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AppointmentPage() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
const [loading, setLoading] = useState(true);

  const [serviceId, setServiceId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [message, setMessage] = useState("");

  const handleBook = async () => {
  const token = localStorage.getItem("token");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/appointments/me", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        setAppointments(data.appointments || []);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Server error:", err);
    }

    setLoading(false);
  };

  fetchAppointments();
}, []);

  try {
    const res = await fetch("http://localhost:5000/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        serviceId,
        appointmentDate,
        appointmentTime,
        customerNotes
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Something went wrong");
      return;
    }

    setMessage("Appointment booked successfully!");
    setTimeout(() => navigate("/"), 1500);

  } catch (err) {
    setMessage("Server unreachable");
  }
};

  return (
    <div className="appointment-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        Go Back
      </button>

      <h2>Book an Appointment</h2>

      <div className="form-container">
        <input
          placeholder="Service ID"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        />

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

        <button onClick={handleBook}>Book Now</button>

        {message && <p>{message}</p>}
      </div>
      <h2>Your Appointments</h2>

      {loading && <p>Loading...</p>}

      {!loading && appointments.length === 0 && (
        <p>You have no appointments yet.</p>
      )}

      {appointments.map((appt) => (
        <div key={appt._id} className="appointment-card">
        <p><strong>Service:</strong> {appt.serviceId}</p>
        <p><strong>Date:</strong> {appt.appointmentDate}</p>
        <p><strong>Time:</strong> {appt.appointmentTime}</p>
        <p><strong>Status:</strong> {appt.status}</p>
        </div>
      ))}

      
    </div>
  );
}
