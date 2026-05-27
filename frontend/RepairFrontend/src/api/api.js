// src/api/api.js

export const BASE_URL = "https://bleachedtiresautorepair.onrender.com/api";

// Helper to attach token
export const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ---------------------- AUTH ----------------------

export async function login(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    return {
      ok: res.ok,
      ...data
    };

  } catch {
    return {
      ok: false,
      success: false,
      message: "Unable to reach server"
    };
  }
}

// ------------------ APPOINTMENTS ------------------

export async function createAppointment(payload) {
  try {
    const res = await fetch(`${BASE_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader()
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Request failed" };
    }

    return { success: true, data };

  } catch {
    return { success: false, message: "Unable to reach server" };
  }
}

export async function getMyAppointments() {
  try {
    const res = await fetch(`${BASE_URL}/appointments/me`, {
      headers: { ...authHeader() }
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Request failed" };
    }

    return { success: true, appointments: data.appointments };

  } catch {
    return { success: false, message: "Unable to reach server" };
  }
}

export async function updateAppointment(id, payload) {
  try {
    const res = await fetch(`${BASE_URL}/appointments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeader()
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Request failed" };
    }

    return { success: true, data };

  } catch {
    return { success: false, message: "Unable to reach server" };
  }
}

export async function cancelAppointment(id) {
  try {
    const res = await fetch(`${BASE_URL}/appointments/${id}`, {
      method: "PATCH",
      headers: { ...authHeader() }
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Request failed" };
    }

    return { success: true, data };

  } catch {
    return { success: false, message: "Unable to reach server" };
  }
}

// ------------------ SERVICES ------------------

export async function getServices() {
  try {
    const res = await fetch(`${BASE_URL}/services`);
    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to load services" };
    }

    return { success: true, services: data.services };

  } catch {
    return { success: false, message: "Unable to reach server" };
  }
}
