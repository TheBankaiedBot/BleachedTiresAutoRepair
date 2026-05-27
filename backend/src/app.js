// app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const serviceRoutes = require('./routes/serviceRoutes'); // FIX

// initialize express
const app = express();

// initialize CORS middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// connect to DB
connectDB();

// AI logger
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.path, 'Content-Type:', req.headers['content-type']);
  next();
});

// use routes
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes); 

// health check
app.get('/', (req, res) => {
  res.send('API is Running...');
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  res.status(500).json({ message: 'Internal Server Error', error: err?.message || 'unknown' });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
