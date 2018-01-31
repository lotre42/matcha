const  mysql = require('mysql2/promise');

let requete = async (req, data) => {
    const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake'});
    const [rows, fields] = await connection.execute(req, data);
    return rows
}

module.exports = requete;