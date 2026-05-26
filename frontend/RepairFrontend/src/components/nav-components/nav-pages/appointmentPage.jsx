import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AppointmentPage() {
  const navigate = useNavigate();

  // Form state
  const [serviceId, setServiceId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [message, setMessage] = useState("");

  // Appointments list
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Editing state
  const [editingId, setEditingId] = useState(null);

  // Load appointments on mount
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

  // Create appointment
  const handleBook = async () => {
    const token = localStorage.getItem("token");

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

      // Add new appointment to list
      setAppointments(prev => [...prev, data.appointment]);

      // Reset form
      setServiceId("");
      setAppointmentDate("");
      setAppointmentTime("");
      setCustomerNotes("");

    } catch (err) {
      setMessage("Server unreachable");
    }
  };

  // Load appointment into form for editing
  const startEdit = (appt) => {
    setEditingId(appt._id);
    setServiceId(appt.serviceId);
    setAppointmentDate(appt.appointmentDate);
    setAppointmentTime(appt.appointmentTime);
    setCustomerNotes(appt.customerNotes);
  };

  // Save updated appointment
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/appointments/${editingId}`, {
      method: "PUT",
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

    if (res.ok) {
      setMessage("Appointment updated successfully");

      // Update UI list
      setAppointments(prev =>
        prev.map(a => a._id === editingId ? data.appointment : a)
      );

      // Reset form
      setEditingId(null);
      setServiceId("");
      setAppointmentDate("");
      setAppointmentTime("");
      setCustomerNotes("");

    } else {
      setMessage(data.message || "Update failed");
    }
  };

  const handleCancel = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Appointment cancelled");

      // Update UI list
      setAppointments(prev =>
        prev.map(a =>
          a._id === id ? { ...a, status: "Cancelled" } : a
        )
      );
    } else {
      setMessage(data.message || "Cancel failed");
    }
  } catch (err) {
    setMessage("Server unreachable");
  }
  };

  

  return (
    <div className="appointment-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        Go Back
      </button>

      <h2>{editingId ? "Edit Appointment" : "Book an Appointment"}</h2>

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

        {editingId ? (
          <button onClick={handleUpdate}>Save Changes</button>
        ) : (
          <button onClick={handleBook}>Book Now</button>
        )}

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setServiceId("");
              setAppointmentDate("");
              setAppointmentTime("");
              setCustomerNotes("");
            }}
          >
            Cancel Edit
          </button>
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
    <p><strong>Service:</strong> {appt.serviceId}</p>
    <p><strong>Date:</strong> {appt.appointmentDate}</p>
    <p><strong>Time:</strong> {appt.appointmentTime}</p>
    <p><strong>Status:</strong> {appt.status}</p>

    <button onClick={() => startEdit(appt)}>Edit</button>

    <button onClick={() => handleCancel(appt._id)}>
      Cancel
    </button>

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
