const { createPool } = require("mysql2/promise");

const dbConnection = createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || "workanadb",
});

module.exports = {
  dbConnection,
};
