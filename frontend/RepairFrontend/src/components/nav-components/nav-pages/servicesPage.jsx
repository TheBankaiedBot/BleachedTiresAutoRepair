import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ServicesPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/services");
        const data = await res.json();

        if (res.ok) {
          setServices(data.services || []);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Service fetch error:", err);
      }

      setLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <div className="service-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        Go Back
      </button>

      <h1>Our Services</h1>

      {loading && <p>Loading services...</p>}

      {!loading && services.length === 0 && (
        <p>No services available.</p>
      )}

      <div className="service-list">
        {services.map((service) => (
          <div key={service._id} className="service-card">
            <h3>{service.name}</h3>

            {service.description && <p>{service.description}</p>}

            {service.category && (
              <p><strong>Category:</strong> {service.category}</p>
            )}

            {service.price !== undefined && (
              <p><strong>Price:</strong> ${service.price}</p>
            )}

            {service.estimatedDuration && (
              <p><strong>Duration:</strong> {service.estimatedDuration} min</p>
            )}

            <p>
              <strong>Status:</strong>{" "}
              {service.available ? "Available" : "Unavailable"}
            </p>

            <button
              onClick={() =>
                navigate("/appointment", {
                  state: { serviceId: service._id }
                })
              }
            >
              Book This Service
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
