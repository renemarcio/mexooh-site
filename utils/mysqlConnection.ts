import mysql, { QueryResult } from "mysql2/promise";

let pool: mysql.Pool | null;

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      port: Number(process.env.MYSQL_PORT),
      connectionLimit: 5,
      maxIdle: 3,
      idleTimeout: 10 * 1000, // 10 seconds
      waitForConnections: true,
      queueLimit: 0,
    });
  }
  return pool;
};

export const db = getPool();

export const query = async (query: string, params: any[] = []) => {
  const connection = await getPool().getConnection();
  const [rows] = await connection.query(query, params);
  getPool().releaseConnection(connection);
  return rows;
};

export const transaction = async (queries: string[], params: any[][] = []) => {
  const connection = await getPool().getConnection();
  await connection.beginTransaction();
  let rows: QueryResult[] = [];
  try {
    for (let i = 0; i < queries.length; i++) {
      const [result] = await connection.query(queries[i], params[i]);
      rows.push(result);
    }
    await connection.commit();
  } catch (err) {
    console.log(err);
    await connection.rollback();
  }
  getPool().releaseConnection(connection);
  return rows;
};
