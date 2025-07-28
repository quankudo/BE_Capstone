const multer = require('multer');

const storage = multer.memoryStorage(); // lưu vào RAM trước khi đẩy lên Cloudinary

const upload = multer({ storage });

module.exports = upload;
