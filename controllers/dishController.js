const db = require('../config/db');
const { successResponse, errorResponse } = require("../utils/responseFormatter");

module.exports.getAllTypeDishes = (req, res) => {
  db.query('SELECT * FROM TypeDishes', (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse(results));
  });
};

module.exports.getAllDishes = (req, res) => {
  const { page = 1, limit = 10, search = '', type, restaurantId } = req.query;
  const offset = (page - 1) * limit;

  let sql = 'SELECT * FROM Dishes WHERE 1=1';
  let params = [];

  if (search) {
    sql += ' AND Name LIKE ?';
    params.push(`%${search}%`);
  }

  if (type) {
    sql += ' AND Type = ?';
    params.push(type);
  }

  if (restaurantId) {
    sql += ' AND IdRes = ?';
    params.push(restaurantId);
  }

  sql += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), parseInt(offset));

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse(results));
  });
};


module.exports.getDishById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT d.*, r.Name AS RestaurantName, t.Name AS TypeDishName
    FROM Dishes d
    LEFT JOIN Restaurants r ON d.IdRes = r.Id
    LEFT JOIN TypeDishes t ON d.IdTypeDish = t.Id
    WHERE d.Id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    if (results.length === 0) return res.status(404).json(errorResponse("Món ăn không tồn tại", 404));

    res.json(successResponse(results[0]));
  });
};

module.exports.getDishByRestId = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT d.*, r.Name AS RestaurantName, t.Name AS TypeDishName
    FROM Dishes d
    LEFT JOIN Restaurants r ON d.IdRes = r.Id
    LEFT JOIN TypeDishes t ON d.IdTypeDish = t.Id
    WHERE d.IdRes = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    if (results.length === 0) return res.status(404).json(errorResponse("Món ăn không tồn tại", 404));

    res.json(successResponse(results));
  });
};

