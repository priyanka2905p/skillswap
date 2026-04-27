const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.mysql.railway.internal,        // Railway MYSQLHOST
  user: process.env.root,        // Railway MYSQLUSER
  password: process.env.FncdOyvkUXhKoQaoWBOLQqPCZlMyVOdx,// Railway MYSQLPASSWORD
  database: process.env.railway,    // Railway MYSQLDATABASE
  ssl: {
    rejectUnauthorized: true
  }
});

// Connect check (optional but useful)
db.connect((err) => {
  if (err) {
    console.log("❌ DB Connection Failed:", err);
  } else {
    console.log("✅ Connected to Railway MySQL");
  }
});

module.exports = db;