import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppointmentPage from "../nav-components/nav-pages/appointmentPage";
import DashboardPage from "../nav-components/nav-pages/dashboardPage";
import ServicesPage from "../nav-components/nav-pages/servicesPage";
import ContactPage from "../nav-components/nav-pages/contactPage";
import AIPage from "../nav-components/nav-pages/AI-ComponentPage";

export default function PageRoutes(){
    return(
        <div>
            
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/appointmentPage" element={<AppointmentPage />} />
                    <Route path="/servicesPage" element={<ServicesPage />} />
                    <Route path="/contactPage" element={<ContactPage />} />
                    <Route path="/AIPage" element={<AIPage />} />

                </Routes>
           
        </div>
    )
}