const db = require('../config/db');
const { successResponse, errorResponse } = require("../utils/responseFormatter");

module.exports.getStats = (req, res) => {
  const scope = req.query.scope || 'today'; // today | week | month | year
  const restId = parseInt(req.query.restId);

  const conditions = {
    today: "DATE(CreatedAt) = CURDATE()",
    week: "YEARWEEK(CreatedAt, 1) = YEARWEEK(CURDATE(), 1)",
    month: "MONTH(CreatedAt) = MONTH(CURDATE()) AND YEAR(CreatedAt) = YEAR(CURDATE())",
    year: "YEAR(CreatedAt) = YEAR(CURDATE())"
  };

  const condition = conditions[scope];
  if (!condition || isNaN(restId)) {
    return res.status(400).json({ success: false, message: "Invalid scope or restId" });
  }

  const queries = {
    reviews: {
      sql: `SELECT COUNT(*) AS total FROM EvaluateRestaurants WHERE IdRes = ? AND ${condition}`,
      params: [restId]
    },
    favorites: {
      sql: `SELECT COUNT(DISTINCT IdUser) AS total FROM FavoriteRestaurants WHERE IdRes = ?`,
      params: [restId]
    },
    dishes: {
      sql: `SELECT COUNT(*) AS total FROM Dishes WHERE IdRes = ?`,
      params: [restId]
    }
  };

  const promises = Object.entries(queries).map(([key, { sql, params }]) =>
    new Promise((resolve, reject) => {
      db.query(sql, params, (err, rows) => {
        if (err) return reject({ key, error: err });
        resolve({ key, total: rows[0].total });
      });
    })
  );

  Promise.all(promises)
    .then(results => {
      const data = {};
      results.forEach(({ key, total }) => data[key] = total);
      res.json(successResponse(data));
    })
    .catch(err => {
      res.status(500).json(errorResponse(`Lỗi khi lấy ${err.key}: ${err.error.message}`));
    });
};
