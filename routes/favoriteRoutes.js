const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

router.get('/restaurants/:userId', favoriteController.getFavoriteRestaurantsByUser);
router.get('/dishes/:userId', favoriteController.getFavoriteDishesByUser);

module.exports = router;