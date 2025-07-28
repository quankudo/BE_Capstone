const db = require('../config/db');
const { successResponse, errorResponse } = require("../utils/responseFormatter");

module.exports.getFavoriteRestaurantsByUser = (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT fr.*, r.Name, r.ImageUrl, r.Desc
    FROM FavoriteRestaurants fr
    JOIN Restaurants r ON fr.IdRes = r.Id
    WHERE fr.IdUser = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse(results));
  });
};

module.exports.getFavoriteDishesByUser = (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT fr.*, d.Name, d.ImageUrl, d.Desc
    FROM FavoriteDishes fr
    JOIN Dishes d ON fr.IdDish = d.Id
    WHERE fr.IdUser = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse(results));
  });
};