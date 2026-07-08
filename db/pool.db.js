import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '',
  connectionLimit: 10,
  waitForConnections: true,
});

export default pool;