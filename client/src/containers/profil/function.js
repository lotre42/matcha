const  mysql = require('mysql2/promise');

let jsontransform = (user) =>{
    let ret = {
        "info": {},
        "tag": {}
    }
    let i = 0;
    for (var prop in user) {
        if (i < 17 || i === 28){
             ret.info[prop] = `${user[prop]}`;
        }
        else if (user[prop] == 1){
            ret.tag[prop] = `${user[prop]}`;
        }
        i++;
    }
    return ret    
}


let parseTag = (tag) => {
    let ret = {};
    for (let prop in tag) {
        if (tag[prop] == 1)
            ret[prop] = `${tag[prop]}`;
    }
    return (ret)
}

let popularity = (id) =>{
    const lik = "SELECT * from lik WHERE id_profil = ?";
    const view = "SELECT vue from users WHERE id = ?";  
    const changelike = "Update users SET lik = ? WHERE id = ?"
    const maxlike = "SELECT MAX(lik) AS maxlike FROM users"
    const maxvue = "SELECT MAX(vue) AS maxvue FROM users"                        
  let requete = async() =>{
    const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake', socketPath: '/var/mysql/mysql.sock'});
    const [like, fields] = await connection.execute(lik, [id]);
    const [vue, field] = await connection.execute(view, [id]);
    await connection.execute(changelike, [like.length, id]);
    const [maxl, fiel] = await connection.execute(maxlike);
    const [maxv, fie] = await connection.execute(maxvue);    
    let pop = (like.length * 3) / maxl[0].maxlike + (vue[0].vue * 2) / maxv[0].maxvue;
    pop = Math.round(pop*100)/100;
    await connection.execute("Update users SET pop = ? WHERE id = ?", [pop, id]);
  }
    requete();   
}

let uploadImg = async (id, file) => {
    const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake', socketPath: '/var/mysql/mysql.sock'});
    const upload = "UPDATE img SET " + file + " = ? WHERE id = ?" 
    const img = '../../uploads/' + id+'-'+file+'.png'
    await connection.execute(upload, [img,id])
    
}


module.exports = {jsontransform, parseTag, popularity, uploadImg}