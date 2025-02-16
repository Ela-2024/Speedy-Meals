import  { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MealContext } from '../context/MealContextInstance'; 

import Header from './Header';
import Button from './Button';
import './styles/Dashboard.css';

const Dashboard = () => {
  const { meals, loading, filterType, setFilterType } = useContext(MealContext);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <Header 
        title="Speedy Meals" 
        subtitle="Find inspiration with these delicious meals!"
        mealsCount={meals.length}
      />
      
      <div className="filter-buttons">
        <Button 
          text="UNDER 30" 
          onClick={() => setFilterType('under30')} 
          className={filterType === 'under30' ? 'active' : ''}
        />
        <Button 
          text="OVER 60" 
          onClick={() => setFilterType('over60')} 
          className={filterType === 'over60' ? 'active' : ''}
        />
        <Button 
          text="RESET" 
          onClick={() => setFilterType('all')} 
          className={filterType === 'all' ? 'active' : ''}
        />
      </div>
      
      <div className="add-meal-link">
        <Link to="/meals/new">add a meal</Link>
      </div>
      
      <table className="meals-table">
        <thead>
          <tr>
            <th>Meal</th>
            <th>Prep Time</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {meals.map(meal => (
            <tr key={meal._id}>
              <td>
                {meal.name}
                {meal.ingredientOne && meal.ingredientTwo && meal.ingredientThree && 
                  <span className="star-icon">★</span>
                }
              </td>
              <td>{meal.cookTime}</td>
              <td>
                <Link to={`/meals/${meal._id}`}>details</Link> | 
                <Link to={`/meals/${meal._id}/edit`}>edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;