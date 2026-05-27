import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from token on startup
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ id: payload.id });
    } catch (err) {
      console.error("Invalid token:", err);
      setUser(null);
      localStorage.removeItem("token");
    }

    setLoading(false);
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Login failed"
        };
      }

      const jwt = data.data.token;

      localStorage.setItem("token", jwt);
      setToken(jwt);

      const payload = JSON.parse(atob(jwt.split(".")[1]));
      setUser({ id: payload.id });

      return { success: true };

    } catch (err) {
      return {
        success: false,
        message: "Server unreachable"
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
