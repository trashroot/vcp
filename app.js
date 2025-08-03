// app.js

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


// Request logging middleware using winston
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());

app.use('/students', studentRoutes);



app.get('/', (req, res) => {
  logger.info('Root endpoint accessed');
  // Example warning log
  logger.warn('Root endpoint was accessed. This is a sample warning.');
  // Example error log
  logger.error('Root endpoint error simulation. This is a sample error.');
  res.send('Student Management System API');
});


app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err}`);
  res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
