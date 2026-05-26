// src/api/api.js

const BASE_URL = "http://localhost:5000/api"; // 

// Helper to attach token
const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ---------------------- AUTH ----------------------

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (data.token) localStorage.setItem("token", data.token);
  return data;
}

// ------------------ APPOINTMENTS ------------------

export async function createAppointment(payload) {
  const res = await fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader()
    },
    body: JSON.stringify(payload)
  });

  return res.json();
}

export async function getMyAppointments() {
  const res = await fetch(`${BASE_URL}/appointments/me`, {
    headers: { ...authHeader() }
  });

  return res.json();
}

export async function updateAppointment(id, payload) {
  const res = await fetch(`${BASE_URL}/appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader()
    },
    body: JSON.stringify(payload)
  });

  return res.json();
}

export async function cancelAppointment(id) {
  const res = await fetch(`${BASE_URL}/appointments/${id}`, {
    method: "PATCH",
    headers: { ...authHeader() }
  });

  return res.json();
}
