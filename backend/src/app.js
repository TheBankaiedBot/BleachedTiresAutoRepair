//app.js
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const userRoutes =require('./routes/userRoutes');


//initialize express
const app = express();
app.use(express.json());

//connect to DB
connectDB();


//use routes
app.use('/api/users', userRoutes);

//health check on route
app.get('/', (req, res) => {
    res.send('APi is Running...');
});

//setup port, log express server and send confirmation message.
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));