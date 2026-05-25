import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function AppointmentPage() {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <button onClick={() => navigate('/')}>Go Back</button>
            </div>
            <p>Book an Appointment!</p>
            <button onClick="">Book Now</button>
             
        </div>
    )
}