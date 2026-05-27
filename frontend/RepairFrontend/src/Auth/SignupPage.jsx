import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    zipcode: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      // express-validator errors
      if (data.errors && data.errors.length > 0) {
        setError(data.errors[0].msg);
        setLoading(false);
        return;
      }

      // backend controller errors
      if (!response.ok || !data.success) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // SUCCESS → redirect back to where user came from
      const from = location.state?.from || "/";
      navigate(from, { replace: true });

    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error — please try again");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create an Account</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <input name="phone" placeholder="555-555-5555" onChange={handleChange} />
        <input name="zipcode" placeholder="Zipcode" onChange={handleChange} required />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{
            marginTop: "10px",
            background: "transparent",
            border: "none",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer"
          }}
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
}
