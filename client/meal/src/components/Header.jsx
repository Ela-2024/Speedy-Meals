import { useContext } from 'react';
import PropTypes from 'prop-types';
import { MealContext } from '../context/MealContextInstance'; 

import './styles/Header.css';
const Header = ({ title, subtitle }) => {
  const { meals } = useContext(MealContext);
  
  return (
    <div className="header">
      <h1>{title}</h1>
      {meals && <p className="meal-count">{meals.length} great meals and counting!</p>}
      <p>{subtitle}</p>
    </div>
  );
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default Header;