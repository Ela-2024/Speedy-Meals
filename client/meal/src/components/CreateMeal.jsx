import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MealContext } from '../context/MealContextInstance';

import Header from './Header';
import Button from './Button';
import './styles/CreateMeal.css';

const CreateMeal = () => {
  const navigate = useNavigate();
  const { addMeal } = useContext(MealContext);

  const [meal, setMeal] = useState({
    name: '',
    cookTime: '',
    directions: '',
    ingredientOne: '',
    ingredientTwo: '',
    ingredientThree: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!meal.name) tempErrors.name = 'Dish name required!';
    else if (meal.name.length < 3) tempErrors.name = 'Name must be at least 3 characters';
    else if (meal.name.length > 20) tempErrors.name = 'Name must be no more than 20 characters';

    if (!meal.cookTime) tempErrors.cookTime = 'Dish cook time required!';
    else if (meal.cookTime < 2) tempErrors.cookTime = 'Cook time must be at least 2 minutes';
    else if (meal.cookTime > 240) tempErrors.cookTime = 'Cook time must be no more than 240 minutes';

    if (!meal.directions) tempErrors.directions = 'Dish directions required!';
    else if (meal.directions.length < 10) tempErrors.directions = 'Directions must be at least 10 characters';

    const forbiddenIngredients = ['salt', 'pepper', 'cheese'];

    if (meal.ingredientOne && forbiddenIngredients.includes(meal.ingredientOne.toLowerCase())) {
      tempErrors.ingredientOne = `${meal.ingredientOne} is not allowed as an ingredient`;
    }

    if (meal.ingredientTwo && forbiddenIngredients.includes(meal.ingredientTwo.toLowerCase())) {
      tempErrors.ingredientTwo = `${meal.ingredientTwo} is not allowed as an ingredient`;
    }

    if (meal.ingredientThree && forbiddenIngredients.includes(meal.ingredientThree.toLowerCase())) {
      tempErrors.ingredientThree = `${meal.ingredientThree} is not allowed as an ingredient`;
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeal({
      ...meal,
      [name]: value
    });

    // Real-time validation
    let error = '';

    if (name === 'name') {
      if (!value) error = 'Dish name required!';
      else if (value.length < 3) error = 'Name must be at least 3 characters';
      else if (value.length > 20) error = 'Name must be no more than 20 characters';
    }

    if (name === 'cookTime') {
      if (!value) error = 'Dish cook time required!';
      else if (value < 2) error = 'Cook time must be at least 2 minutes';
      else if (value > 240) error = 'Cook time must be no more than 240 minutes';
    }

    if (name === 'directions') {
      if (!value) error = 'Dish directions required!';
      else if (value.length < 10) error = 'Directions must be at least 10 characters';
    }

    const forbiddenIngredients = ['salt', 'pepper', 'cheese'];

    if (name.startsWith('ingredient') && forbiddenIngredients.includes(value.toLowerCase())) {
      error = `${value} is not allowed as an ingredient`;
    }

    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const newMeal = {
          ...meal,
          cookTime: parseInt(meal.cookTime)
        };

        await addMeal(newMeal);
        navigate('/');
      } catch (error) {
        console.error("Error creating meal:", error);
        if (error.response && error.response.data) {
          const serverErrors = error.response.data.errors;
          if (serverErrors) {
            const formattedErrors = {};
            serverErrors.forEach(err => {
              formattedErrors[err.field] = err.message;
            });
            setErrors(formattedErrors);
          }
        }
      }
    }
  };

  const isFormValid = () => {
    return meal.name && meal.cookTime && meal.directions && Object.values(errors).every(x => x === '');
  };

  return (
    <div className="container">
      <Header 
        title="Speedy Meals" 
        subtitle="Add the next culinary masterpiece!"
      />

      <div className="back-link">
        <Link to="/">back to home</Link>
      </div>

      <form onSubmit={handleSubmit} className="meal-form">
        <div className="form-group">
          <label>Dish Name</label>
          <input
            type="text"
            name="name"
            value={meal.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Total Minutes</label>
          <input
            type="number"
            name="cookTime"
            value={meal.cookTime}
            onChange={handleChange}
            className={errors.cookTime ? 'error' : ''}
          />
          {errors.cookTime && <p className="error-message">{errors.cookTime}</p>}
        </div>

        <div className="form-group">
          <label>Directions</label>
          <textarea
            name="directions"
            value={meal.directions}
            onChange={handleChange}
            className={errors.directions ? 'error' : ''}
          />
          {errors.directions && <p className="error-message">{errors.directions}</p>}
        </div>

        <div className="form-group">
          <label>Ingredient(s) - Optional</label>
          <input
            type="text"
            name="ingredientOne"
            placeholder="Ingredient One"
            value={meal.ingredientOne}
            onChange={handleChange}
            className={errors.ingredientOne ? 'error' : ''}
          />
          {errors.ingredientOne && <p className="error-message">{errors.ingredientOne}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="ingredientTwo"
            placeholder="Ingredient Two"
            value={meal.ingredientTwo}
            onChange={handleChange}
            className={errors.ingredientTwo ? 'error' : ''}
          />
          {errors.ingredientTwo && <p className="error-message">{errors.ingredientTwo}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="ingredientThree"
            placeholder="Ingredient Three"
            value={meal.ingredientThree}
            onChange={handleChange}
            className={errors.ingredientThree ? 'error' : ''}
          />
          {errors.ingredientThree && <p className="error-message">{errors.ingredientThree}</p>}
        </div>

        <Button 
          text="CREATE"
          type="submit"
          disabled={!isFormValid()}
        />
      </form>
    </div>
  );
};

export default CreateMeal;
