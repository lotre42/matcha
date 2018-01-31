let mysql      = require('mysql2/promise')
const bluebird = require('bluebird');

let con = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '27092709',
  database : 'matchafake',
  Promise: bluebird
})

// con.connect((err) => {
//   if (err)
//     console.log(err)
// })

module.exports = con