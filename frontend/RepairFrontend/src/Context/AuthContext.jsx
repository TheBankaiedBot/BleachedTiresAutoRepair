
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // TEMP DEV TOKEN
  const [token, setToken] = useState(() => localStorage.getItem("token")); {/*() => localStorage.getItem("token")*/}
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
    } catch {
      setUser(null);
      localStorage.removeItem("token");
    }

    setLoading(false);
  }, [token]);

  // ⭐ Your login function with error handling
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/users/login/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Login failed"
        };
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);

        try {
          const payload = JSON.parse(atob(data.token.split(".")[1]));
          setUser({ id: payload.id });
        } catch {
          return {
            success: false,
            message: "Invalid token format"
          };
        }

        return {
          success: true,
          token: data.token
        };
      }

      return {
        success: false,
        message: "No token returned from server"
      };

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