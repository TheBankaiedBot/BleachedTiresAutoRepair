import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ContactPage() {
    const navigate = useNavigate();

    return (
        <>
        <div>
            <button className="back-btn" onClick={() => navigate('/')}>Go Back</button>
        </div>
        <div className="contact-page">
            
            <h1>Contact Us</h1>
            <p>Phone: (123) 456-7890</p>
            <p>Email:bleachedtirescontact@gmail.com</p>
            <p>Address: 123 Main St, OHIO, USA</p>
            <p>Business Hours: Mon-Fri 8am-6pm, Sat 9am-4pm, Sun Closed</p>


        </div>
        </>
    )
}