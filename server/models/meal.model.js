const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Dish name is required'],
    minlength: [3, 'Dish name must be at least 3 characters long'],
    maxlength: [20, 'Dish name must be no more than 20 characters long']
  },
  cookTime: {
    type: Number,
    required: [true, 'Cook time is required'],
    min: [2, 'Cook time must be at least 2 minutes'],
    max: [240, 'Cook time must be no more than 240 minutes']
  },
  directions: {
    type: String,
    required: [true, 'Directions are required'],
    minlength: [10, 'Directions must be at least 10 characters long']
  },
  ingredientOne: {
    type: String,
    validate: {
      validator: function(value) {
        if (!value) return true;  // Allow empty value
        return !['salt', 'pepper', 'cheese'].includes(value.toLowerCase());
      },
      message: props => `${props.value} is not allowed as an ingredient`
    }
  },
  ingredientTwo: {
    type: String,
    validate: {
      validator: function(value) {
        if (!value) return true;  // Allow empty value
        return !['salt', 'pepper', 'cheese'].includes(value.toLowerCase());
      },
      message: props => `${props.value} is not allowed as an ingredient`
    }
  },
  ingredientThree: {
    type: String,
    validate: {
      validator: function(value) {
        if (!value) return true;  // Allow empty value
        return !['salt', 'pepper', 'cheese'].includes(value.toLowerCase());
      },
      message: props => `${props.value} is not allowed as an ingredient`
    }
  }
}, { timestamps: true });

const Meal = mongoose.model('Meal', MealSchema);
module.exports = Meal;
