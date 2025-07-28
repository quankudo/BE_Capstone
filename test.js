const bcrypt = require('bcrypt');
const db = require('./config/db');

async function hashAllUsers() {
  db.query("SELECT * FROM Users", async (err, users) => {
    if (err) return console.error(err);
    
    for (const user of users) {
      const hashed = await bcrypt.hash(user.Password, 10);
      db.query("UPDATE Users SET Password = ? WHERE Id = ?", [hashed, user.Id]);
    }

    console.log("✅ Đã mã hóa xong toàn bộ mật khẩu!");
  });
}

hashAllUsers();