const express = require('express');
const router = express.Router();
const districtController = require('../controllers/districtController');

router.get('/', districtController.getDistricts);
router.get('/:id', districtController.getDistrictsByIdCity);

module.exports = router;