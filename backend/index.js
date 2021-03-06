const express = require ('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const multer = require('multer');
const randomstring = require("randomstring");
const set = require('./config/setup');
const con = require('./config/db');
const ascon = require('./config/db-async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const mailer = require('./mailer');
const geolib = require('geolib');
const { jsontransform, parseTag, popularity, uploadImg } = require('./function');
const { matchbyinfo, matchbylike } = require('./match');
const  mysql = require('mysql2/promise');
const requete = require('./requete')
const sorttab = require('./sorttab');
const {loc} = require('./localisation')
const fs = require('fs');

// let test = require("./test")

const secret = "7nTx713Jo25A4hrlWQ3hsQPPIAd0yT";
// const upload = multer({
//     dest: 'uploads/'
// });
const app = express();
// let fake = require("./config/fill_fake")
const server = app.listen(3000);
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const io = require('socket.io').listen(server)

io.on('connection', socket => {
    socket.on('messages', (data) => {
        jwt.verify(data.token, secret);
        let payloadtoken = jwt.decode(data.token);
        let db = async () => {
            let insert = "INSERT INTO message SET id_envoyeur = ?, id_receveur = ?, message = ?, date = now()"
            const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake', socketPath: '/var/mysql/mysql.sock'});
            await connection.execute(insert, [payloadtoken.user.info.id, data.receveur, data.message]);
        }
        db().then(()=>{
            let send = {message: data.message, id_receveur: data.receveur, id_envoyeur: payloadtoken.user.info.id}
            socket.broadcast.emit('messages', send)
            
        });
    })
  })
// app.post('/users', function(req, res){
//     // let fill = require("./config/fill_fake");
//     con.query('SELECT * FROM users WHERE email = ? OR username = ?', [req.body.email, req.body.username], (err, rows, result) => {
//         if (rows[0] && (rows[0]['email'] || rows[0]['pseudo'])){
//             res.send('Username ou email utilisé');
//         }
//         else
//         {
//             const info = {username: req.body.username, email: req.body.email};
//             const token = jwt.sign({user: info}, secret)
//             mailer(`Veuillez ouvrir le lien suivant afin de valider votre compte:  http://localhost:8080/verifemail?token=${token}`, req.body.email, "Inscription Matcha")
//             let tag = "INSERT INTO tag SET Sport = ?, Music = ?, Geek = ?, Tatouage = ?, Bouffe = ?, Etudiant = ?, Cinema = ?, Voyage = ?, Feignant = ?, Litterature = ?, Shopping = ?"; 
//             con.query(tag, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], function (err, result) {
//                 if (err) throw err;
//             });  
//             let hash = bcrypt.hashSync(req.body.password, 12);  
//             let user = "INSERT INTO users SET username = ?, nom = ?, prenom = ?, email = ?, password = ?, validation = ?";  
//             con.query(user, [req.body.username, req.body.nom, req.body.prenom, req.body.email, hash, false], function (err, result) {
//                 if (err) throw err;
//             });
//             let img = "INSERT INTO img SET profile_picture = ?, picture_1 = ?, picture_2 = ?, picture_3 = ?, picture_4 = ?";  
//             con.query(img, ["../../avatar.png", "../../avatar.png", "../../avatar.png", "../../avatar.png", "../../avatar.png"], function (err, result) {
//                 if (err) throw err;
//             });
//             res.json(token);             
//         }
//     })
// });
app.get('/updatemessage', function(req, res) {
    jwt.verify(req.headers.authorization, secret)
    let token = req.headers.authorization;
    let payloadtoken = jwt.decode(token)  
    let requete = async () => {
        const send = "SELECT message, id_envoyeur FROM message WHERE (id_envoyeur = ? AND id_receveur = ?) OR (id_receveur = ? AND id_envoyeur = ?)";
        const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake', socketPath: '/var/mysql/mysql.sock'});
        const [envoi, fields] = await connection.execute(send, [payloadtoken.user.info.id, req.query[0],payloadtoken.user.info.id, req.query[0]]);
        for (let i = 0; i < envoi.length; i++){
            if (envoi[i].id_envoyeur != payloadtoken.user.info.id)
                envoi[i].id_envoyeur = 0;
        }
        res.send(envoi);
        }
    requete();
})
app.get('/deconnexion', function(req, res) {
    jwt.verify(req.headers.authorization, secret)
    let token = req.headers.authorization;
    let payloadtoken = jwt.decode(token) 
    let requete = async () => {
        const insert = "UPDATE users SET enligne = 0, connexion = now() WHERE id = ?";        
        const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake', socketPath: '/var/mysql/mysql.sock'});
        await connection.execute(insert, [req.query[0]]);
    }
    requete();
})
app.get('/profil', function(req, res) {
    jwt.verify(req.headers.authorization, secret)
    let token = req.headers.authorization;
    let payloadtoken = jwt.decode(token)  
    let requete = async () => {
        let ret = {"info": {},
                    "tag": {},
                    "image":{},
                    "like" : "",
                    "date": ""
        }
        let test = "Select * FROM users WHERE id = ?"
        let update = "UPDATE users SET vue = vue + 1 WHERE id=?"
        let vue = "INSERT INTO vue SET id_visiteur=?, id_profil=?, date=NOW()"
        const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake', socketPath: '/var/mysql/mysql.sock'});
        const [info, fields] = await connection.execute(test, [req.query[0]]);
        const [tag, field] = await connection.execute("Select * FROM tag WHERE id = ?", [req.query[0]]);
        const [img, val] = await connection.execute("Select * FROM img WHERE id = ?", [req.query[0]]);
        ret.image = img[0]
        ret.image.display = ret.image.profile_picture
        await connection.execute(update, [req.query[0]]); 
        await connection.execute(vue, [payloadtoken.user.info.id, req.query[0]]);
        for (let prop in tag[0]) {
            if (tag[0][prop] == 1)
                ret.tag[prop] = `${tag[prop]}`;
        }
        ret.info = info[0];
        return (ret)
        }
        let checkLik = async (id, user) => {
            const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake', socketPath: '/var/mysql/mysql.sock'});
            const i_like = "SELECT id FROM lik WHERE id_likeur = ? AND id_profil = ?" 
            // const he_like = '../../uploads/' + id+'-'+file+'.png'
            const [me, fields] = await connection.execute(i_like, [user,id])
            const [he, field] = await connection.execute(i_like, [id, user])            
            if (he.length != 0 && me.length != 0)
                return ("Le match a commencé")            
            else if (he.length == 0)
                return ("Se profil ne vous a pas like")
            else
                return ("Se profil vous a like")
        }
        let checkConnexion = async (id) => {
            const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake', socketPath: '/var/mysql/mysql.sock'});
            const select = "SELECT enligne FROM users WHERE id = ?"
            const [ligne, field] = await connection.execute(select, [id])
            if (ligne[0].enligne == 1)
                return ("Profil Enligne");
            else{
                const select = "SELECT connexion FROM users WHERE id = ?"                
                const [con, field] = await connection.execute(select, [id])
                let date = con[0].connexion;
                return (date.toDateString())
            }                         
        }
        requete().then((ret) => {
            checkLik(req.query[0], payloadtoken.user.info.id).then((infolik) => {
            ret.like = infolik;
            checkConnexion(req.query[0]).then((date)=>{
                ret.date = date
                res.json(ret)
            })
        })
    });
})

app.post('/login', function(req, res){
	con.query('SELECT * FROM users WHERE username = ?', [req.query.username], (err, user, result) => {
        if (user[0] && (user[0].password) && user[0].validation == 1){
            loc().then((geo) => {
                const insert = "UPDATE users SET lat = ?, lon = ?, enligne = 1 WHERE username = ?";
                con.query(insert, [geo.lat, geo.lng, req.query.username]);
            });
            let ret = {"info": {...user[0]}, "tag": {}, "image": {}}            
            con.query('SELECT * FROM tag WHERE id = ?', [user[0].id], (err, tags, result) => {   
            ret.tag = {...tags[0]}
            })
            con.query('SELECT * FROM img WHERE id = ?', [user[0].id], (err, imgs, result) => {
                ret.image = {...imgs[0]}
                const token = jwt.sign({user: ret}, secret)
                con.query('SELECT * FROM message WHERE id_receveur = ? OR id_envoyeur = ?', [user[0].id, user[0].id], (err, info, result) => {
                    let id_message = [];
                    for(let i = 0; i < info.length; i++){
                        if (info[i].id_receveur == user[0].id && id_message.indexOf(info[i].id_envoyeur) == -1)
                        id_message.push(info[i].id_envoyeur)
                        else if (info[i].id_envoyeur == user[0].id && id_message.indexOf(info[i].id_receveur) == -1)
                        id_message.push(info[i].id_receveur)                        
                    }
                    res.json({token, id_message})
                })
            })
        }
        else{
            res.send("Combinaison incorrect")
        }
    })
});
app.get('/search', function(req, res){
    jwt.verify(req.headers.authorization, secret)
    let info = JSON.parse(req.query.info);
    let token = req.headers.authorization;
    let payloadtoken = jwt.decode(token) 
    if (req.query.tag){
        let tag = (req.query.tag);
        let test =  " select * FROM users JOIN tag ON users.id = tag.id WHERE "
        let size = tag.length
        for(let i = 0; i < size; i++){
            if (i != size - 1)
                test = test + "tag." + tag[i] + " AND ";
            else
                test = test + "tag." + tag[i];                
        }
        test = test + " AND users.AGE >= ? AND users.AGE <= ? AND users.orientation = ? AND users.sexe = ? AND users.pop >= ? AND users.pop <= ?"
        const data = [info.age.split('-')[0], info.age.split('-')[1], info.orientation, info.sexe, info.pop.split('-')[0], info.pop.split('-')[1]];
        let requete = async () => {
            let ret = []
            const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake', socketPath: '/var/mysql/mysql.sock'});
            const [tab, fields] = await connection.execute(test, data);
            for (let i = 0; i < tab.length; i++){
                const [img, field] = await connection.execute("Select profile_picture FROM img WHERE id = ?", [tab[i].id])
                tab[i].image = img[0].profile_picture;            
                let res = jsontransform(tab[i]);
            ret.push(res)
            }
            let d;
            let final = []
            for (let i = 0; i < ret.length; i++){
                d = geolib.getDistance(
                    {latitude: ret[i].info.lat, longitude: ret[i].info.lon},
                    {latitude: payloadtoken.user.info.lat, longitude: payloadtoken.user.info.lon})
                    ret[i].info.distance = Math.round(d / 1000);
                    if ((d / 1000) <= info.distance)
                        final.push(ret[i])                    
                }
            res.send(final)
        }
        requete();
    }
});
app.get('/vue', (req, res) => {
    jwt.verify(req.headers.authorization, secret)
    let token = req.headers.authorization;
    let payloadtoken = jwt.decode(token);
    let requete = async () => {
        let ret = []
        const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake', socketPath: '/var/mysql/mysql.sock'});
        const [tab, fields] = await connection.execute("Select id_visiteur FROM vue WHERE id_profil = ?", [payloadtoken.user.info.id]);
        for (let i = 0; i < tab.length; i++){
            const [user, u] = await connection.execute("Select * FROM users WHERE id = ?", [tab[i].id_visiteur]);
            const [tag, t] = await connection.execute("Select * FROM tag WHERE id = ?", [tab[i].id_visiteur]);
            const [img, im] = await connection.execute("Select profile_picture FROM img WHERE id = ?", [tab[i].id_visiteur]);                                              
            ret.push({"info": user[0], "tag": parseTag(tag[0])})
            ret[i].info.distance = Math.round(geolib.getDistance(
                {latitude: ret[i].info.lat, longitude: ret[i].info.lon},
                {latitude: payloadtoken.user.info.lat, longitude: payloadtoken.user.info.lon}) / 1000)
            ret[i].info.image = img[0].profile_picture;
            }
            return (ret)
        }
    requete().then((ret) => {
        res.send(ret)
    }); 
});
app.get('/like', (req, res) => {
    jwt.verify(req.headers.authorization, secret)
    let token = req.headers.authorization;
    let payloadtoken = jwt.decode(token);
     let requete = async () => {
         let ret = []
         const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake', socketPath: '/var/mysql/mysql.sock'});
        const [tab, fields] = await connection.execute("Select id_likeur FROM lik WHERE id_profil = ?", [payloadtoken.user.info.id]);
         if (tab.length > 0){
            for (let i = 0; i < tab.length; i++){
                const [user, u] = await connection.execute("Select * FROM users WHERE id = ?", [tab[i].id_likeur]);
                const [tag, t] = await connection.execute("Select * FROM tag WHERE id = ?", [tab[i].id_likeur]);
                const [img, im] = await connection.execute("Select profile_picture FROM img WHERE id = ?", [tab[i].id_likeur]);                                              
                ret.push({"info": user[0], "tag": parseTag(tag[0])})
                ret[i].info.distance = Math.round(geolib.getDistance(
                    {latitude: ret[i].info.lat, longitude: ret[i].info.lon},
                    {latitude: payloadtoken.user.info.lat, longitude: payloadtoken.user.info.lon}) / 1000)
                ret[i].info.image = img[0].profile_picture;
           }
                 res.send(ret)
          }
         else
             res.send("NULL")
     }
    requete(); 
});

app.get('/match', (req, res) => {
    jwt.verify(req.headers.authorization, secret)
    let token = req.headers.authorization;
    let payloadtoken = jwt.decode(token);
    let requete = async () => {
        const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake', socketPath: '/var/mysql/mysql.sock'});
        const [tab, fields] = await connection.execute("Select id_profil FROM lik WHERE id_likeur = ?", [payloadtoken.user.info.id]);
        return (tab);
    }

    let resultat = async () => {
        let tab = await requete();
        let final;
        if (tab.length > 0)
            final = await matchbylike(tab, payloadtoken.user)
        else
            final = await matchbyinfo(payloadtoken.user)
        return (final)
    }
    resultat().then((final) => {
        res.json(final)
    })
});

app.get('/likeuser', (req, res) => {
    jwt.verify(req.headers.authorization, secret)
    let token = req.headers.authorization;
    let payloadtoken = jwt.decode(token);
   let info = req.query;
   if (!info.like || info.like == "LIKE"){
    con.query("INSERT INTO lik SET id_likeur = ?, id_profil = ?, date = NOW()", [payloadtoken.user.info.id, info.id])
    res.json({like: "DISLIKE"})
   }
   else if (info.like == "DISLIKE"){
    con.query("DELETE FROM lik WHERE id_likeur = ? AND id_profil = ?", [payloadtoken.user.info.id, info.id])
    res.json({like: "LIKE"})
   }
   popularity(info.id);
});
app.get('/checklike', (req, res) => {
    jwt.verify(req.headers.authorization, secret)
    let token = req.headers.authorization;
    let payloadtoken = jwt.decode(token);
    con.query("Select * from lik WHERE id_likeur = ? AND id_profil = ?", [payloadtoken.user.info.id, req.query.id], (err, lik, result) => {   
        if (lik.length == 0)
             res.json({like: "LIKE"})
        else
             res.json({like: "DISLIKE"})
    })
});
app.put('/info', function(req, res){
    if (jwt.verify(req.headers.authorization, secret)){
        let info = JSON.parse(req.query.info);
        let tag = JSON.parse(req.query.tag);
        let image = JSON.parse(req.query.image);
        let user = {info, tag, image};
        let users = 'UPDATE users SET username=?, nom=?, prenom=?, bio=?, sexe=?, age=?, orientation=? WHERE id=?';
        let tags = 'UPDATE tag SET Sport=?, Music=?, Geek=?, Tatouage=?, Bouffe=?, Etudiant=?, Cinema=?, Voyage=?, Feignant=?, Litterature=?, Shopping=? WHERE id=?';    
        con.query(tags,[tag.Sport, tag.Music, tag.Geek, tag.Tatouage, tag.Bouffe, tag.Etudiant, tag.Cinema, tag.Voyage, tag.Feignant, tag.Litterature, tag.Shopping, tag.id])
        con.query(users,[info.username,info.nom,info.prenom,info.bio,info.sexe,info.age,info.orientation,info.id], (err) => {
            if (err) throw (err);
        })
        const token = jwt.sign({user: user}, secret);
        res.json(token);
    }
})

app.get('/verifemail', (req, res) => {
    if (jwt.verify(req.headers.authorization, secret)){
    let token = req.headers.authorization;
    let payloadtoken = jwt.decode(token) 
    con.query('UPDATE users SET validation=? WHERE username=?', [1, payloadtoken.user.username], (err) => {
        if (err) throw (err);
    })
}
});
app.post('/forgetpass', (req, res) => {
    con.query('SELECT * FROM users WHERE email = ?', [req.query[0]], (err, user, result) =>{
        const info = {email: user[0].email};
        const token = jwt.sign({user: info}, secret)
        mailer(`Veuillez ouvrir le lien suivant afin de modifier votre mot de passe:  http://localhost:8080/modifpass?token=${token}`, user[0].email, "Reinitialisation mot de passe")
    })
});
app.post('/modifpass', (req, res) => {
    if (jwt.verify(req.headers.authorization, secret)){
        let token = req.headers.authorization;
    let payloadtoken = jwt.decode(token)
    let hash = bcrypt.hashSync(req.query[0], 12);  
        con.query('UPDATE users SET password=? WHERE email=?', [hash, payloadtoken.user.email], (err) => {
            if (err) throw (err);
        })
    }
});
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '../client/uploads');
    },
    filename: function(req, file, callback) {
        jwt.verify(req.headers.authorization, secret)
        let token = req.headers.authorization;
        let payloadtoken = jwt.decode(token);
        callback(null,payloadtoken.user.info.id + '-' + file.fieldname + '.png');
    }
  })
  var upload = multer({ storage: storage });

app.post('/upload', upload.any(), (req, res) => {
    jwt.verify(req.headers.authorization, secret)
    let token = req.headers.authorization;
    let payloadtoken = jwt.decode(token);
    uploadImg(payloadtoken.user.info.id, req.files[0].fieldname)
    res.json({ status: 'ok' });
});

