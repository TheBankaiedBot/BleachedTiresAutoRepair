import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PageRoutes from '../../routes/pageRoutes';
import AppointmentPage from '../nav-pages/appointmentPage';
import ServicePage from '../nav-pages/servicesPage';


export default function DashboardPage(){
    const navigate = useNavigate();

    return(
        <div>
            <section>
                <p>Left Navigation</p>
                <button onClick={() => navigate('/appointmentPage')}>
                    Book an Appointment!
                </button>
                <p>Dashboard</p>
            </section>
            <section>
                <p>Right Navigation</p>
                    <button onClick={() => navigate('/servicesPage')}>
                        Check out our Services!
                    </button>
            </section>
        </div>
    )
}
