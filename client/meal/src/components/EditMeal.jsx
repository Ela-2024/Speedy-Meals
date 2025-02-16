import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MealContext } from '../context/MealContextInstance'; 

import mealService from '../services/meal.service';
import Header from './Header';
import Button from './Button';
import './styles/EditMeal.css';

const EditMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateMeal } = useContext(MealContext);

  const [meal, setMeal] = useState({
    name: '',
    cookTime: '',
    directions: '',
    ingredientOne: '',
    ingredientTwo: '',
    ingredientThree: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const forbiddenIngredients = ['salt', 'pepper', 'cheese'];

  useEffect(() => {
    const loadMeal = async () => {
      try {
        const response = await mealService.getOneMeal(id);
        setMeal(response.data);
      } catch (error) {
        console.error('Failed to load meal for editing:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMeal();
  }, [id]);

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

    ["ingredientOne", "ingredientTwo", "ingredientThree"].forEach((ingredient) => {
      if (meal[ingredient] && forbiddenIngredients.includes(meal[ingredient].toLowerCase())) {
        tempErrors[ingredient] = `${meal[ingredient]} is not allowed as an ingredient`;
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeal({ ...meal, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await mealService.updateMeal(id, meal);
      updateMeal(meal);
      navigate('/');
    } catch (error) {
      console.error('Failed to update meal:', error);
    }
  };

  return (
    <div>
      <Header title="Edit Meal" />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {['name', 'cookTime', 'directions', 'ingredientOne', 'ingredientTwo', 'ingredientThree'].map((field) => (
            <div key={field}>
              <label>{field.replace(/([A-Z])/g, ' $1').trim()}:</label>
              <input
                type={field === 'cookTime' ? 'number' : 'text'}
                name={field}
                value={meal[field]}
                onChange={handleChange}
              />
              {errors[field] && <p>{errors[field]}</p>}
            </div>
          ))}
          <Button type="submit" text="Update Meal" />
          <Link to="/">Cancel</Link>
        </form>
      )}
    </div>
  );
};

export default EditMeal;
