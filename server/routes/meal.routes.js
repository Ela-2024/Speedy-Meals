const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meal.controller');

router.get('/', mealController.getAllMeals);
router.get('/under30', mealController.getMealsUnder30);
router.get('/over60', mealController.getMealsOver60);
router.get('/:id', mealController.getOneMeal);
router.post('/', mealController.createMeal);
router.put('/:id', mealController.updateMeal);
router.delete('/:id', mealController.deleteMeal);

module.exports = router;