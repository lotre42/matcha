const express = require ('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const multer = require('multer');
const randomstring = require("randomstring");
const set = require('./config/setup');
const con = require('./config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const mailer = require('./mailer');
const geolib = require('geolib');
const jsontransform = require('./jsontransform');
// let test = require("./test")
const secret = "7nTx713Jo25A4hrlWQ3hsQPPIAd0yT";
const upload = multer({
    dest: 'uploads/'
});
const app = express();
// let fake = require("./config/fill_fake")
// app.use(expressJwt({secret: secret}).unless({ path: ['/users','/login']}))
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

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

// app.get('/id', function(req, res) {

// })

app.post('/login', function(req, res){
	con.query('SELECT * FROM users WHERE username = ?', [req.query.username], (err, user, result) => {
        if (user[0] && (user[0].password) && user[0].validation == 1){
            let ret = {"info": {...user[0]}, "tag": {}, "image": {}}            
            con.query('SELECT * FROM tag WHERE id = ?', [user[0].id], (err, tags, result) => {   
            ret.tag = {...tags[0]}
            })
            con.query('SELECT * FROM img WHERE id = ?', [user[0].id], (err, imgs, result) => {
                ret.image = {...imgs[0]}
                const token = jwt.sign({user: ret}, secret)
                res.json(token)
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
        test = test + " AND users.AGE >= ? AND users.AGE <= ? AND users.orientation = ? AND users.sexe = ?"
        con.query(test,[info.age.split('-')[0], info.age.split('-')[1], info.orientation, info.sexe], (err, user, result) => {
            let length = user.length;  
            // console.log("tok",payloadtoken.user.info)
            // console.log("len",length)          
            // for (let i = 0; i < length; i++){
            //     if ((geolib.isPointInCircle(
            //         {latitude: user[i].lat, longitude: user[i].lon},
            //         {latitude: payloadtoken.user.info.lat, longitude: payloadtoken.user.info.lon},
            //         info.distance * 1000
            //     )) == false){
            //         user.shift(i);
            //     }
            // }
            let tab = []
            for (let i = 0; i < length; i++){
                let ret = jsontransform(user[i])
                tab.push(ret);
            }
            res.send(tab)
            
            // con.query('SELECT profile_picture FROM img WHERE id = ?', [ret.info.id], (err, rows, result) => {
            //     // ret.info.image = (rows[0].profile_picture);
            //     res.json(ret);
            // })
        });
    }
});
// app.put('/info', function(req, res){
//     if (jwt.verify(req.headers.authorization, secret)){
//         let info = JSON.parse(req.query.info);
//         let tag = JSON.parse(req.query.tag);
//         let image = JSON.parse(req.query.image);
//         let user = {info, tag, image};
//         let users = 'UPDATE users SET username=?, nom=?, prenom=?, bio=?, sexe=?, age=?, orientation=? WHERE id=?';
//         let tags = 'UPDATE tag SET Sport=?, Music=?, Geek=?, Tatouage=?, Bouffe=?, Etudiant=?, Cinema=?, Voyage=?, Feignant=?, Litterature=?, Shopping=? WHERE id=?';    
//         con.query(tags,[tag.Sport, tag.Music, tag.Geek, tag.Tatouage, tag.Bouffe, tag.Etudiant, tag.Cinema, tag.Voyage, tag.Feignant, tag.Litterature, tag.Shopping, tag.id])
//         con.query(users,[info.username,info.nom,info.prenom,info.bio,info.sexe,info.age,info.orientation,info.id], (err) => {
//             if (err) throw (err);
//         })
//         const token = jwt.sign({user: user}, secret);
//         res.json(token);
//     }
// })

// app.get('/verifemail', (req, res) => {
//     if (jwt.verify(req.headers.authorization, secret)){
//     let token = req.headers.authorization;
//     let payloadtoken = jwt.decode(token) 
//     con.query('UPDATE users SET validation=? WHERE username=?', [1, payloadtoken.user.username], (err) => {
//         if (err) throw (err);
//     })
// }
// });
// app.post('/forgetpass', (req, res) => {
//     con.query('SELECT * FROM users WHERE email = ?', [req.query[0]], (err, user, result) =>{
//         const info = {email: user[0].email};
//         const token = jwt.sign({user: info}, secret)
//         mailer(`Veuillez ouvrir le lien suivant afin de modifier votre mot de passe:  http://localhost:8080/modifpass?token=${token}`, user[0].email, "Reinitialisation mot de passe")
//     })
// });
// app.post('/modifpass', (req, res) => {
//     if (jwt.verify(req.headers.authorization, secret)){
//         let token = req.headers.authorization;
//     let payloadtoken = jwt.decode(token)
//     let hash = bcrypt.hashSync(req.query[0], 12);  
//         con.query('UPDATE users SET password=? WHERE email=?', [hash, payloadtoken.user.email], (err) => {
//             if (err) throw (err);
//         })
//     }
  
// });
// app.post('/upload', upload.single('profile_picture'), (req, res) => {
//     new Img({
//         path: req.file.path,
//         fieldname: req.file.fieldname
//     }).save();
//     res.json({ status: 'ok' });
// });

app.listen(3000);
