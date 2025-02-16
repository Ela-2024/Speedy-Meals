const Meal = require('../models/meal.model.js');

module.exports = {
  // Get all meals
  getAllMeals: (req, res) => {
    Meal.find({})
      .then(meals => res.json(meals))
      .catch(err => res.status(400).json(normalizeErrors(err)));
  },
  
  // Get meals with cook time under 30 minutes
  getMealsUnder30: (req, res) => {
    Meal.find({ cookTime: { $lt: 30 } })
      .then(meals => res.json(meals))
      .catch(err => res.status(400).json(normalizeErrors(err)));
  },
  
  // Get meals with cook time over 60 minutes
  getMealsOver60: (req, res) => {
    Meal.find({ cookTime: { $gt: 60 } })
      .then(meals => res.json(meals))
      .catch(err => res.status(400).json(normalizeErrors(err)));
  },
  
  // Get one meal by id
  getOneMeal: (req, res) => {
    Meal.findById(req.params.id)
      .then(meal => res.json(meal))
      .catch(err => res.status(400).json(normalizeErrors(err)));
  },
  
  // Create a new meal
  createMeal: (req, res) => {
    Meal.create(req.body)
      .then(newMeal => res.json(newMeal))
      .catch(err => res.status(400).json(normalizeErrors(err)));
  },
  
  // Update a meal
  updateMeal: (req, res) => {
    Meal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .then(updatedMeal => res.json(updatedMeal))
      .catch(err => res.status(400).json(normalizeErrors(err)));
  },
  
  // Delete a meal
  deleteMeal: (req, res) => {
    Meal.findByIdAndDelete(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(400).json(normalizeErrors(err)));
  }
};

// Normalize errors function
const normalizeErrors = (err) => {
  let errorResponse = {
    type: err.name,
    code: err.code || 400,
    message: err.message
  };

  if (err.name === 'ValidationError') {
    errorResponse.errors = Object.keys(err.errors).map(field => ({
      field,
      message: err.errors[field].message
    }));
  }
  
  return errorResponse;
};