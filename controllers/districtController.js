const db = require('../config/db');

const { successResponse, errorResponse } = require("../utils/responseFormatter");

module.exports.getDistricts = (req, res) => {
  const sql = 'SELECT * FROM Districts';

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse(results));
  });
};

module.exports.getDistrictsByIdCity = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM Districts WHERE IdCity = ?';

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse(results));
  });
};
