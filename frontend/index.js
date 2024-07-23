const mongoose = require('mongoose');
const express = require('express');
const cors=require('cors');
const jwt = require('jsonwebtoken');
const router = require('../backend/Routes/routes');
const multer = require('multer');
const secretKey = 'utsav';
const app = express();
app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SocietyDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{console.log("backend is working and mongodb connected")});

//assigning port
const PORT = process.env.PORT ||4000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
app.use(router);
app.use(express.urlencoded({ extended: true }));