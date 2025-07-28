const express = require('express');
const router = express.Router();
const dashboardRestController = require('../controllers/dashboardRestController');

// GET all dishes (có thể thêm ?search=&page=&limit= sau này)
router.get('/', dashboardRestController.getStats);

module.exports = router;
