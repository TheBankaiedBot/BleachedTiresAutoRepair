
1. Project Title & Description
This is the capstone project of my software engineering bootcamp. It is an appointment booking web app for an Auto Repair Service named "Bleached Tires". It also includes an AI feature to help you find what service you need.
2. Live Demo Links
Frontend URL (Netlify): https://profound-vacherin-540fd8.netlify.app/login

Backend URL (Render): https://bleachedtiresautorepair.onrender.com/

3. Features
Core Features:

    User Authentication (login/signup with JWT)

    Appointment Booking

    AI Service Recommendation

    Service List

    Contact Page

    Dashboard Overview

4. Tech Stack
Break it into frontend, backend, and database:

Frontend
    React

    Vite

    React Router

    Context API

Backend
    Node.js

    Express

    JWT Authentication

    CORS

Database
    MongoDB Atlas

5. Folder Structure:
AutoRepairServiceProject/
│
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   │   ├── aiController.js
│   │   │   ├── appointmentController.js
│   │   │   ├── loginController.js
│   │   │   ├── serviceController.js
│   │   │   └── userController.js
│   │   ├── middleware/requireAuth.js
│   │   ├── models/
│   │   │   ├── appointmentModel.js
│   │   │   ├── serviceModel.js
│   │   │   └── userModel.js
│   │   ├── routes/
│   │   │   ├── aiRoutes.js
│   │   │   ├── appointmentRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── requestValidation.js
│   │   │   ├── serviceRoutes.js
│   │   │   └── userRoutes.js
│   │   └── app.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    └── RepairFrontend/
        ├── public/
        │   ├── _redirects
        │   ├── favicon.svg
        │   └── icons.svg
        ├── src/
        │   ├── api/
        │   │   ├── api.js
        │   │   └── handleSubmit.jsx
        │   ├── Auth/SignupPage.jsx
        │   ├── Context/AuthContext.jsx
        │   ├── components/nav-components/nav-pages/
        │   │   ├── AI-ComponentPage.jsx
        │   │   ├── appointmentPage.jsx
        │   │   ├── contactPage.jsx
        │   │   ├── dashboardPage.jsx
        │   │   ├── loginPage.jsx
        │   │   └── servicesPage.jsx
        │   ├── routes/
        │   │   ├── pageRoutes.jsx
        │   │   └── protectedRoute.jsx
        │   ├── css/
        │   │   ├── App.css
        │   │   ├── general.css
        │   │   └── index.css
        │   └── assets/
        │       ├── 1000010047.jpg
        │       ├── AiFrontImg.webp
        │       ├── autoShopImg1.jpg
        │       ├── autoShopImg2.jpg
        │       └── autoShopImg3.jpg
        ├── App.jsx
        ├── main.jsx
        ├── vite.config.js
        ├── package.json
        └── README.md

6. Environment Variables
PORT=
MONGO_URI=
JWT_SECRET=
OPENAI_API_KEY=

7. Installation & Setup
Clone the repository
    git clone https://github.com/TheBankaiedBot/BleachedTiresAutoRepair
cd AutoRepairServiceProject
Backend Setup
    cd backend
    npm install
    npm start
    Backend runs on: http://localhost:5000
Frontend Setup
    cd frontend/RepairFrontend
    npm install
    npm run dev
Frontend runs on: http://localhost:5173
8. Deployment Instructions
Frontend (Netlify)
    Build settings:
        Setting	Value
        Base directory	frontend/RepairFrontend
        Build command	npm run build
        Publish directory	dist
        Package directory	(leave empty)


        Required file:  
            frontend/RepairFrontend/public/_redirects
                Code:
                /*    /index.html   200
Backend (Render)
    Service settings:

        Setting	Value
        Root directory	backend
        Build command	npm install
        Start command	node app.js or npm start
        Environment variables	Add all backend .env values


9. API Endpoints
Auth
    POST /api/users/register
    POST /api/users/login
Appointments
    GET  /api/appointments
    POST /api/appointments
AI
    POST /api/ai/recommend
Services
    GET /api/services

10. Author
Elijah Thomas  
GitHub: https://github.com/TheBankaiedBot (github.com in Bing)

11. License
This project is for educational and portfolio use.