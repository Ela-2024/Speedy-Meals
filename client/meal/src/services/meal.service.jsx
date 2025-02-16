import axios from 'axios';
const API_URL = 'http://localhost:5000/api';


const mealService = {
  getAllMeals: () => {
    return axios.get(`${API_URL}/meals`);
  },
  getMealsUnder30: () => {
    return axios.get(`${API_URL}/meals/under30`);
  },
  getMealsOver60: () => {
    return axios.get(`${API_URL}/meals/over60`);
  },
  getOneMeal: (id) => {
    return axios.get(`${API_URL}/meals/${id}`);
  },
  createMeal: (meal) => {
    return axios.post(`${API_URL}/meals`, meal);
  },
  updateMeal: (id, meal) => {
    return axios.put(`${API_URL}/meals/${id}`, meal);
  },
  deleteMeal: (id) => {
    return axios.delete(`${API_URL}/meals/${id}`);
  }
};

export default mealService;

