import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MealContext } from '../context/MealContextInstance';

import mealService from '../services/meal.service';
import Header from './Header';
import Button from './Button';
import './styles/MealDetails.css';

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteMeal } = useContext(MealContext);
  
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadMeal = async () => {
      try {
        const response = await mealService.getOneMeal(id);
        setMeal(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load meal details:", error);
        setLoading(false);
      }
    };
    
    loadMeal();
  }, [id]);
  
  const handleDelete = async () => {
    try {
      await deleteMeal(id);
      navigate('/');
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (!meal) return <div>Meal not found</div>;
  
  return (
    <div className="container">
      <Header 
        title="Speedy Meals" 
        subtitle={`${meal.name} recipe`}
      />
      
      <div className="back-link">
        <Link to="/">back to home</Link>
      </div>
      
      <div className="meal-details">
        <div className="detail-row">
          <h3>Cook Time</h3>
          <p>{meal.cookTime} minutes</p>
        </div>
        
        <div className="detail-row">
          <h3>Ingredients</h3>
          <ul>
            {meal.ingredientOne && <li>{meal.ingredientOne}</li>}
            {meal.ingredientTwo && <li>{meal.ingredientTwo}</li>}
            {meal.ingredientThree && <li>{meal.ingredientThree}</li>}
          </ul>
        </div>
        
        <div className="detail-row">
          <h3>Directions</h3>
          <p>{meal.directions}</p>
        </div>
      </div>
      
      <Button 
        text="REMOVE"
        onClick={handleDelete}
        className="delete-button"
      />
    </div>
  );
};

export default MealDetails;