let mysql = require('mysql');
let con = mysql.createConnection({
  host: "localhost",
  port     : 3306,
  user: "root",
  password: "27092709",
  socketPath: '/var/mysql/mysql.sock'
});



con.connect()
con.query('CREATE DATABASE IF NOT EXISTS matchafake')
con.query('USE matchafake')
var user = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, username VARCHAR(255) NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(100) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, bio VARCHAR(255), sexe VARCHAR(10), orientation VARCHAR(20), age INT, validation tinyint (1), ville VARCHAR(255), lat FLOAT, lon FLOAT, vue INT, lik INT, pop FLOAT, enligne tinyint (1), connexion DATETIME)"
con.query(user, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
var img = "CREATE TABLE IF NOT EXISTS img (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, profile_picture VARCHAR(255) NOT NULL, picture_1 VARCHAR(255) NOT NULL, picture_2 VARCHAR(100) NOT NULL, picture_3 VARCHAR(255) NOT NULL, picture_4 VARCHAR(255) NOT NULL)"
con.query(img, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
var tag = "CREATE TABLE IF NOT EXISTS tag (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, Sport tinyint (1), Music tinyint (1), Geek tinyint (1), Tatouage tinyint (1), Bouffe tinyint (1), Etudiant tinyint (1), Cinema tinyint (1), Voyage tinyint (1), Feignant tinyint (1), Litterature tinyint (1), Shopping tinyint (1))"
con.query(tag, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
var vue = "CREATE TABLE IF NOT EXISTS vue (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, id_visiteur INT, id_profil INT, date DATETIME)"
con.query(vue, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
var like = "CREATE TABLE IF NOT EXISTS lik (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, id_likeur INT, id_profil INT, date DATETIME)"
con.query(like, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
var message = "CREATE TABLE IF NOT EXISTS message (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, id_envoyeur INT, id_receveur INT, date DATETIME, message VARCHAR(255))"
con.query(message, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
con.end()