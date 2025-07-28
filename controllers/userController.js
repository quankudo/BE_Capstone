const db = require('../config/db');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/responseFormatter");

// Lấy danh sách Users
module.exports.getUsers = (req, res) => {
  db.query("SELECT * FROM Users", (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    res.json(successResponse(results));
  });
};

// Đăng ký người dùng
module.exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!name || !email || !password) {
    return res.status(400).json(errorResponse("Vui lòng nhập đầy đủ thông tin", 400));
  }

  // Kiểm tra email đã tồn tại chưa
  db.query("SELECT * FROM Users WHERE Email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    if (results.length > 0) return res.status(400).json(errorResponse("Email đã được sử dụng", 400));

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm user vào database
    const sql = "INSERT INTO Users (Name, Email, Password) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, "Customer"], (err, result) => {
      if (err) return res.status(500).json(errorResponse(err.message));
      res.status(201).json(successResponse({ id: result.insertId }, "Đăng ký thành công"));
    });
  });
};

// Đăng nhập người dùng
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  
  if (!email || !password) {
    return res.status(400).json(errorResponse("Thiếu email hoặc mật khẩu", 400));
  }

  // Kiểm tra người dùng
  db.query("SELECT * FROM Users WHERE Email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json(errorResponse(err.message));
    if (results.length === 0) return res.status(401).json(errorResponse("Tài khoản không tồn tại", 401));

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) return res.status(401).json(errorResponse("Mật khẩu không đúng", 401));

    // Tạo JWT token
    const token = jwt.sign({ id: user.Id, email: user.Email }, process.env.JWT_SECRET, { expiresIn: "3h" });

    res.json(successResponse({ token, user: { id: user.Id, name: user.Name, email: user.Email, role: user.Role } }, "Đăng nhập thành công"));
  });
};

