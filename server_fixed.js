const path = require('path');  
const express = require('express');  
const app = require('./src/app');  
const connectDB = require('./src/config/db');  
const dotenv = require('dotenv');  
dotenv.config();  
connectDB();  
