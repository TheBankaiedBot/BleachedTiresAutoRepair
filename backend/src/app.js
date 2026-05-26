//app.js
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const userRoutes =require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const authRoutes = require('./routes/authRoutes');
//initialize express
const app = express();
app.use(express.json());

//connect to DB
connectDB();

//AI logger to fix the issue of not logging request body in user registration route
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.path, 'Content-Type:', req.headers['content-type']);
  next();
});

//use routes
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);    

//health check on route
app.get('/', (req, res) => {
    res.send('APi is Running...');
});

//setup port, log express server and send confirmation message.
const PORT = process.env.PORT || 5000;
//ai generated code for error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  res.status(500).json({ message: 'Internal Server Error', error: err?.message || 'unknown' });
});
app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));