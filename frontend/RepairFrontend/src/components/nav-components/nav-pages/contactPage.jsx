import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ContactPage() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/')}>Go Back</button>
            <h1>Contact Us</h1>

        </div>
    )
}