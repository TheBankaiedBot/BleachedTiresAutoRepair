import { useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);

    //  Login failed
    if (!result.success) {
      setError(result.message || "Login failed");
      setLoading(false);
      return;
    }

    //  Login succeeded
    const token = result.data.token;
    setToken(token);

    // Decode token
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({ id: payload.id });

    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Don’t have an account?{" "}
        <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}
