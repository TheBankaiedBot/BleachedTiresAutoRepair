import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PageRoutes from '../../routes/pageRoutes';
import AppointmentPage from '../nav-pages/appointmentPage';
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import ServicePage from '../nav-pages/servicesPage';
import autoShopImg1 from '../../../assets/autoShopImg1.jpg';
import autoShopImg2 from '../../../assets/autoShopImg2.jpg';
import autoShopImg3 from '../../../assets/autoShopImg3.jpg';
import AiFrontImg from '../../../assets/AiFrontImg.webp';



export default function DashboardPage(){
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);


    return(
        <div className="dashboard-grid">
            
            

        <div className="left-column">
            <div>
                <button 
                className="back-btn"
                onClick={() => {
                logout();
                navigate("/login");
            }}
            >
                Logout
            </button>
            </div>

            
            <div className="info-box">
                <img className="box-img" src={autoShopImg1} placeholder="AutoShopImg1"></img>
                <button className="box-btn" onClick={() => navigate('/appointmentPage')}>
                    View or Book an Appointment!
                </button>
            </div>

            <div className="info-box">
                <img className="box-img" src={autoShopImg2} placeholder="AutoShopImg2"></img>
                    <button className="box-btn" onClick={() => navigate('/servicesPage')}>
                        Check out our Services!
                    </button>
            </div>

            <div className="info-box">
                <img className="box-img" src={autoShopImg3} placeholder="AutoShopImg3"></img>
                <button className="box-btn" onClick={() => navigate('/contactPage')}>
                    Contact Us!
                </button>
            </div>

        </div>
        <div className="right-column">
            
            <div className="ai-feature">
            
                <img className="box-img"  src={AiFrontImg} placeholder="AI"></img>
                <button className="box-btn" onClick={() => navigate('/AIPage')}>
                    Figure out what service you need with our AI helper!
                </button>
            
            </div>
        </div>
        </div>
    );
}
