// import mysql, { ConnectionOptions } from "mysql2/promise";

// let connection: mysql.Connection;

// const access: ConnectionOptions = {
//   host: process.env.MYSQL_HOST,
//   database: process.env.MYSQL_DATABASE,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   port: Number(process.env.MYSQL_PORT),
// };

// // export const createConnection = async () => {
// //   if (!connection) {
// //     connection = await mysql.createConnection({
// //       host: process.env.MYSQL_HOST,
// //       database: process.env.MYSQL_DATABASE,
// //       user: process.env.MYSQL_USER,
// //       password: process.env.MYSQL_PASSWORD,
// //     });
// //     console.log(
// //       `Conectado em ${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT} | Banco de dados: ${process.env.MYSQL_DATABASE}`
// //     );
// //   } else {
// //     console.log("Conexão já existente.");
// //   }
// //   return connection;
// // };

// // export const db = async () => createConnection();

// const db = mysql.createPool(access);
// export default db;

import mysql from "mysql2/promise";

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
