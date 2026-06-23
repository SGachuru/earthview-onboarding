const path = require('path');
const express = require('express');
const app = require('./src/app');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');
dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
  });
}

const server = app.listen(PORT, () => {
  console.log(Server running in  mode on port );
});
process.on('unhandledRejection', (err) => {
  console.log(Error: );
  server.close(() => process.exit(1));
});
