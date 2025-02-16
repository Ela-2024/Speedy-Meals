require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/speedy-meals')
  .then(() => {
    console.log(' MongoDB connected successfully to', mongoose.connection.name);
    console.log('Database host:', mongoose.connection.host);
  })
  .catch(err => {
    console.error(' MongoDB connection error:', err);
  });

// Routes
const mealRoutes = require('./routes/meal.routes');
app.use('/api/meals', mealRoutes);

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});