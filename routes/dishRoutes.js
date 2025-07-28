const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');

// GET all dishes (có thể thêm ?search=&page=&limit= sau này)
router.get('/', dishController.getAllDishes);
router.get('/rest/:id', dishController.getDishByRestId);

// GET detail dish by ID
router.get('/:id', dishController.getDishById);

router.get('/types', dishController.getAllTypeDishes);

module.exports = router;
