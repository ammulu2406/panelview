// require("dotenv").config();

// const mysql = require('mysql2/promise');

// const config = {
//   db: { /* do not put password or any sensitive info here, done only for demo */
//     host: process.env.DB_CONTAINER,
//     port: process.env.DB_PORT,
//     user: process.env.MYSQL_ROOT_USER,
//     password: process.env.MYSQL_ROOT_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     waitForConnections: true,
//     connectionLimit: 2,
//     queueLimit: 0,
//   },
// };
  
// const pool = mysql.createPool(config.db);

// // Utility function to query the database
// async function query(sql, params) {
//   const [rows, fields] = await pool.execute(sql, params);

//   return rows;
// }

// module.exports = {
//   query,
// }

const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'panel_game' 
});

// Test the connection
connection.getConnection()
    .then(() => console.log('Connected to the database.'))
    .catch((err) => {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit the application if the connection fails
    });

module.exports = connection;
