import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  console.log("LoginPage mounted");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const res = await login(email, password);

    if (res.token) {
      // SUCCESS → go to dashboard
      navigate("/");
    } else {
      // FAILURE → show message
      setMessage(res.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        value={email}
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        value={password}
      />

      <button onClick={handleSubmit}>Login</button>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}
