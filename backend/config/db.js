let mysql      = require('mysql')
let con = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '27092709',
  database : 'matcha'
})

con.connect((err) => {
  if (err)
    console.log(err)
})

module.exports = con