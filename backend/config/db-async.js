let mysql      = require('mysql2')

  let con = mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake',socketPath: '/var/mysql/mysql.sock' });

module.exports = con