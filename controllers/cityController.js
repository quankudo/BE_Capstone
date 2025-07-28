const db = require('../config/db');
const { successResponse, errorResponse } = require("../utils/responseFormatter");

module.exports.getCities = (req, res) => {
  db.query('SELECT * FROM Cities', (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse(results));
  });
};
