const db = require('../config/db');
const { successResponse, errorResponse } = require("../utils/responseFormatter");

// GET /evaluate-restaurants/:id?offset=0&limit=5
module.exports.getEvaluateRestaurantsByRestaurantId = (req, res) => {
  const id = parseInt(req.params.id);
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 5;

  const sql = `
    SELECT er.Id, er.Comment, er.ScoreStar, u.Name AS UserName, er.CreatedAt
    FROM EvaluateRestaurants er
    JOIN Users u ON er.IdUser = u.Id
    WHERE er.IdRes = ?
    ORDER BY er.CreatedAt DESC
    LIMIT ? OFFSET ?
  `;

  db.query(sql, [id, limit, offset], (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse(results));
  });
};

module.exports.createEvaluateRestaurant = (req, res) => {
  const { id } = req.params; // Id nhà hàng
  const { scoreStar, comment } = req.body;
  const idUser = req.user.id;

  const sql = `
    INSERT INTO EvaluateRestaurants (IdUser, IdRestaurant, ScoreStar, Comment)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [idUser, id, scoreStar, comment], (err, result) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.status(201).json(successResponse(results));
  });
};
