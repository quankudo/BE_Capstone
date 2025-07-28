const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// GET all dishes (có thể thêm ?search=&page=&limit= sau này)
router.get('/', restaurantController.getRestaurants);
router.get('/getAll', restaurantController.getAllRestaurants);

// GET detail dish by ID
router.get('/:id', restaurantController.getRestaurantById);

router.get('/types', restaurantController.getAllTypeRestaurants);

module.exports = router;
