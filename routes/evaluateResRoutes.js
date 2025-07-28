const express = require('express');
const router = express.Router();
const evaluateResController = require('../controllers/evaluateResController');

// Lấy tất cả đánh giá của món ăn theo IdDish
router.get('/:id', evaluateResController.getEvaluateRestaurantsByRestaurantId);

// Thêm đánh giá món ăn mới
router.post('/', evaluateResController.createEvaluateRestaurant);

module.exports = router;