import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppointmentPage from "../nav-components/nav-pages/appointmentPage";
import DashboardPage from "../nav-components/nav-pages/dashboardPage";
import ServicesPage from "../nav-components/nav-pages/servicesPage";
import ContactPage from "../nav-components/nav-pages/contactPage";
import AIPage from "../nav-components/nav-pages/AI-ComponentPage";
import ProtectedRoute from "./protectedRoute";
import LoginPage from "../nav-components/nav-pages/loginPage";
import SignupPage from "../../Auth/SignupPage";

export default function PageRoutes(){
    return(
        <BrowserRouter>
            
                <Routes>
                    <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/appointmentPage" element={<ProtectedRoute><AppointmentPage /></ProtectedRoute>} />
                    <Route path="/servicesPage" element={<ProtectedRoute><ServicesPage /></ProtectedRoute>} />
                    <Route path="/contactPage" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
                    <Route path="/AIPage" element={<ProtectedRoute><AIPage /></ProtectedRoute>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} /> {/* catch-all route for undefined paths */}
                </Routes>
           
        </BrowserRouter>
    )
}