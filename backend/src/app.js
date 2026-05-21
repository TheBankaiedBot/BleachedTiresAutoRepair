//app.js
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

//initialize express
const app = express();

//connect to DB
connectDB();

//health check on route
app.get('/', (req, res) => {
    res.send('APi is Running...');
});

//setup port, log express server and send confirmation message.
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log("Server is running on port ${PORT}"));