import mysql from "mysql";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "process.env.DB_HOST",
  user: "process.env.DB_USER",
  password: "process.env.DB_PASSWORD",
  database: "process.env.DB_DATABASE",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database: ", err);
  }
  if (connection) connection.release();
  return;
});
export default pool;


