const db = require('../config/db');
const { successResponse, errorResponse } = require("../utils/responseFormatter");

module.exports.getEvaluateDishesByDishId = (req, res) => {
  const id = parseInt(req.params.id); // IdDish
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 5;

  const sql = `
    SELECT ed.Id, ed.Comment, ed.ScoreStar, u.Name AS UserName, ed.CreatedAt
    FROM EvaluateDishes ed
    JOIN Users u ON ed.IdUser = u.Id
    WHERE ed.IdDish = ?
    ORDER BY ed.CreatedAt DESC
    LIMIT ? OFFSET ?
  `;

  db.query(sql, [id, limit, offset], (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse(results));
  });
};

exports.createEvaluateDish = (req, res) => {
  const { IdUser, Comment, Status, IdDish, ScoreStar } = req.body;
  const sql = `
    INSERT INTO EvaluateDishes (IdUser, Comment, Status, IdDish, ScoreStar)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [IdUser, Comment, Status, IdDish, ScoreStar], (err, result) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.status(201).json(successResponse(result));
  });
};
