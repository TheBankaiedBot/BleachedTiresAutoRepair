import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServicesPage() {
    const navigate = useNavigate();

    return (
        <div>
            <button className="back-btn" onClick={() => navigate('/')}>Go Back</button>
            <h1>Our Services</h1>
            <p>Welcome to our services page!</p>
        </div>
    );
};

