let mysql      = require('mysql2')

let con = mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake'});

module.exports = con