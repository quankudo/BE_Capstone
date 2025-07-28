const express = require('express');
const router = express.Router();
const evaluateDishesController = require('../controllers/evaluateDishesController');

// Lấy tất cả đánh giá của món ăn theo IdDish
router.get('/:id', evaluateDishesController.getEvaluateDishesByDishId);

// Thêm đánh giá món ăn mới
router.post('/', evaluateDishesController.createEvaluateDish);

module.exports = router;
