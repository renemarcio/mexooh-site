import mysql, { ConnectionOptions } from "mysql2/promise";

let connection: mysql.Connection;

const access: ConnectionOptions = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: Number(process.env.MYSQL_PORT),
};

// export const createConnection = async () => {
//   if (!connection) {
//     connection = await mysql.createConnection({
//       host: process.env.MYSQL_HOST,
//       database: process.env.MYSQL_DATABASE,
//       user: process.env.MYSQL_USER,
//       password: process.env.MYSQL_PASSWORD,
//     });
//     console.log(
//       `Conectado em ${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT} | Banco de dados: ${process.env.MYSQL_DATABASE}`
//     );
//   } else {
//     console.log("Conexão já existente.");
//   }
//   return connection;
// };

// export const db = async () => createConnection();

const db = mysql.createPool(access);
export default db;
