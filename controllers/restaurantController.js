const db = require('../config/db');
const { successResponse, errorResponse } = require("../utils/responseFormatter");

module.exports.getAllTypeRestaurants = (req, res) => {
  db.query('SELECT * FROM TypeRestaurants', (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse(results));
  });
};

module.exports.getAllRestaurants = (req, res) => {
  db.query('SELECT * FROM Restaurants', (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse(results));
  });
};

module.exports.getRestaurants = (req, res) => {
  const { page = 1, limit = 6, search = "", idType, idDistrict } = req.query;
  const offset = (page - 1) * limit;

  let baseSql = `
    FROM Restaurants r
    JOIN Districts d ON r.IdDistrict = d.Id
    JOIN Cities c ON d.IdCity = c.Id
    WHERE 1=1
  `;
  const params = [];

  if (search) {
    baseSql += " AND r.Name LIKE ?";
    params.push(`%${search}%`);
  }

  if (idType) {
    baseSql += " AND r.IdTypeRestaurant = ?";
    params.push(idType);
  }

  if (idDistrict) {
    baseSql += " AND r.IdDistrict = ?";
    params.push(idDistrict);
  }

  // 1. Query tổng số bản ghi
  const countSql = `SELECT COUNT(*) as total ${baseSql}`;
  db.query(countSql, params, (err, countResult) => {
    if (err) return res.status(500).json(errorResponse(err.message));

    const totalItems = countResult[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    // 2. Query danh sách bản ghi với thông tin địa chỉ
    const dataSql = `
      SELECT r.*, d.Name AS DistrictName, c.Name AS CityName
      ${baseSql}
      LIMIT ? OFFSET ?
    `;
    const dataParams = [...params, parseInt(limit), parseInt(offset)];

    db.query(dataSql, dataParams, (err, results) => {
      if (err) return res.status(500).json(errorResponse(err.message));

      // Tùy chọn: Nối địa chỉ thành 1 chuỗi gọn gàng
      const dataWithAddress = results.map(item => ({
        ...item,
        Address: `${item.DistrictName}, ${item.CityName}`
      }));

      res.json(successResponse({
        data: dataWithAddress,
        totalItems,
        totalPages,
        currentPage: parseInt(page)
      }));
    });
  });
};



module.exports.getRestaurantById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT r.*, d.Name AS DistrictName, t.Name AS TypeName, c.Name as CityName
    FROM Restaurants r
    LEFT JOIN Districts d ON r.IdDistrict = d.Id
    LEFT JOIN Cities c ON d.IdCity = c.Id
    LEFT JOIN TypeRestaurants t ON r.IdTypeRestaurant = t.Id
    WHERE r.Id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    if (results.length === 0) return res.status(404).json(errorResponse("Nhà hàng không tồn tại", 404));

    res.json(successResponse(results[0]));
  });
};

