npm run dev
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

module.exports = app;
