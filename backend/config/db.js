let mysql      = require('mysql')

let connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'matcha',
  password : '27092709',
  database : 'matcha'
})

connection.connect()

module.exports = connection