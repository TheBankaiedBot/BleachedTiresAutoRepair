import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AIPage() {
  const navigate = useNavigate();

  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [recommendedService, setRecommendedService] = useState("");

  // ------------------ ASK AI ------------------
  const handleAskAI = async () => {
    if (!problem.trim()) return;

    setLoading(true);
    setRecommendation("");
    setRecommendedService("");

    try {
      const res = await fetch("http://localhost:5000/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem })
      });

      const data = await res.json();
      setRecommendation(data.recommendation);
      setRecommendedService(data.recommendation);
    } catch (err) {
      setRecommendation("AI service unavailable.");
    }

    setLoading(false);
  };

  // ------------------ BOOK RECOMMENDED SERVICE ------------------
  const handleBookRecommendedService = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services");
      const data = await res.json();

      const services = data.services || [];

      const match = services.find(
        (s) => s.name.toLowerCase() === recommendedService.toLowerCase()
      );

      if (!match) {
        alert("Service not found in database.");
        return;
      }

      navigate("/appointmentPage", {
        state: { serviceId: match._id }
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="ai-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        Go Back
      </button>

      <h1>AI Service Helper</h1>

      <p>Describe your car issue and our AI will recommend the best service.</p>

      <textarea
        placeholder="Example: My brakes squeal when I stop..."
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        className="ai-textarea"
      />

      <button onClick={handleAskAI} disabled={loading} className="ai-btn">
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {recommendation && (
        <div className="ai-result">
          <h3>Recommended Service:</h3>
          <p>{recommendation}</p>

          <button
            className="ai-book-btn"
            onClick={handleBookRecommendedService}
          >
            Book This Service
          </button>
        </div>
      )}
    </div>
  );
}
