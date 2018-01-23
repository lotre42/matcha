let mysql = require('mysql');

let connection = mysql.createConnection({
  host: "localhost",
  port     : 3306,
  user: "matcha",
  password: "27092709"
});



connection.connect();

connection.query('CREATE DATABASE IF NOT EXISTS matcha')
connection.query('USE matcha')
connection.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, lastname VARCHAR(255) NOT NULL, firstname VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)')
connection.end()