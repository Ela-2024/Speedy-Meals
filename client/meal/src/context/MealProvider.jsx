import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import mealService from '../services/meal.service';
import { MealContext } from './MealContextInstance';

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');

  const loadMeals = useCallback(async () => {
    try {
      let response;
      switch (filterType) {
        case 'under30':
          response = await mealService.getMealsUnder30();
          break;
        case 'over60':
          response = await mealService.getMealsOver60();
          break;
        default:
          response = await mealService.getAllMeals();
      }
      setMeals(response.data);
    } catch (error) {
      console.error('Failed to load meals:', error);
    } finally {
      setLoading(false);
    }
  }, [filterType]);

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  const addMeal = async (meal) => {
    const response = await mealService.createMeal(meal);
    setMeals((prevMeals) => [...prevMeals, response.data]);
    return response.data;
  };

  const updateMeal = async (id, meal) => {
    const response = await mealService.updateMeal(id, meal);
    setMeals((prevMeals) =>
      prevMeals.map((m) => (m._id === id ? response.data : m))
    );
    return response.data;
  };

  const deleteMeal = async (id) => {
    await mealService.deleteMeal(id);
    setMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== id));
  };

  return (
    <MealContext.Provider
      value={{ 
        meals, 
        loading, 
        addMeal, 
        updateMeal, 
        deleteMeal, 
        filterType, 
        setFilterType 
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

MealProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MealProvider;