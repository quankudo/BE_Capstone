const jwt = require("jsonwebtoken");
require("dotenv").config(); // Đảm bảo có biến JWT_SECRET

const { errorResponse } = require("../utils/responseFormatter");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Kiểm tra có header Authorization không
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(errorResponse(
      "Không có token hoặc token không hợp lệ", 401
    ));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); 
  } catch (err) {
    return res.status(403).json(errorResponse(
      "Không có token hoặc token không hợp lệ", 403
    ));
  }
};

// Middleware kiểm tra quyền admin
const checkAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json(errorResponse(
      "Chỉ admin mới được phép truy cập", 403
    ));
  }
};

// Middleware kiểm tra quyền restaurant
const checkRestaurant = (req, res, next) => {
  if (req.user.role === "restaurant") {
    next();
  } else {
    return res.status(403).json(errorResponse(
      "Chỉ tài khoản nhà hàng mới được phép truy cập", 403
    ));
  }
};

module.exports = {
  authenticate,
  checkAdmin,
  checkRestaurant
};