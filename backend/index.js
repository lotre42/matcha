const express = require ('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const multer = require('multer');
let set = require('./config/setup');
let con = require('./config/db');
let bcrypt = require('bcrypt');

const upload = multer({
    dest: 'uploads/'
});
const app = express();
// con.connect(function(err) {
    // if (err) throw err;
//   });
// const init = async () => {
//     const cn = {
//       host: '95.85.22.142',
//       // port: 5432,
//       database: 'matcha',
//       user: 'matcha',
//       password: 'matcha',
//     };
  
//     try {
//       const db = pgp(cn);
//       db.connect();
//       db.none(`CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         username VARCHAR NOT NULL,
//         email VARCHAR NOT NULL,
//         password VARCHAR NOT NULL,
//         prenom VARCHAR NOT NULL,
//         nom VARCHAR NOT NULL,
//         sexe VARCHAR,
//         orientation VARCHAR DEFAULT 'bisexual',
//         bio TEXT,
//         age INTEGER,
//         profil_picture VARCHAR DEFAULT '/uploads/null',
//         picture_1 VARCHAR DEFAULT '/uploads/null',
//         picture_2 VARCHAR DEFAULT '/uploads/null',
//         picture_3 VARCHAR DEFAULT '/uploads/null',
//         picture_4 VARCHAR DEFAULT '/uploads/null',
//         profile_picture VARCHAR DEFAULT '/uploads/null',
//         Sport VARCHAR NOT NULL,
//         Music VARCHAR NOT NULL,
//         Geek VARCHAR NOT NULL,
//         Tatouage VARCHAR NOT NULL,
//         Bouffe VARCHAR NOT NULL,
//         Etudiant VARCHAR NOT NULL,
//         Voyage VARCHAR NOT NULL,
//         Feignant VARCHAR NOT NULL,
//         Litterature VARCHAR NOT NULL,
//         Shopping VARCHAR NOT NULL
//       )`);
//     } catch (err) {
//       console.log(err);
//     }
//   };

// init();
// const keys = require('./config/keys');

// require('./models/User');



// mongoose.connect(keys.mongoURI);
// var User = mongoose.model('users');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/users', function(req, res){
    con.query('SELECT * FROM users WHERE email = ? OR username = ?', [req.body.email, req.body.username], (err, rows, result) => {
        if (rows[0] && (rows[0]['email'] || rows[0]['pseudo'])){
            res.json('Username ou email utilisé');
        }
        else
        {
            let tag = "INSERT INTO tag SET Sport = ?, Music = ?, Geek = ?, Tatouage = ?, Bouffe = ?, Etudiant = ?, Cinema = ?, Voyage = ?, Feignant = ?, Litterature = ?, Shopping = ?"; 
           // let values = ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false'] 
            con.query(tag, ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false'], function (err, result) {
                if (err) throw err;
            });  
            let hash = bcrypt.hashSync(req.body.password, 12);  
            let user = "INSERT INTO users SET username = ?, nom = ?, prenom = ?, email = ?, password = ?";  
            con.query(user, [req.body.username, req.body.nom, req.body.prenom, req.body.email, hash], function (err, result) {
                if (err) throw err;
            });
            let img = "INSERT INTO img SET picture_profil = ?, picture_1 = ?, picture_2 = ?, picture_3 = ?, picture_4 = ?";  
            con.query(img, ["../../avatar.png", "../../avatar.png", "../../avatar.png", "../../avatar.png", "../../avatar.png"], function (err, result) {
                if (err) throw err;
            }); 
        }
    })
});

app.get('/id', function(req, res) {

})

app.post('/login', function(req, res){
	con.query('SELECT * FROM users WHERE username = ?', [req.query.username], (err, user, result) => {
        if (user[0] && bcrypt.compareSync(req.query.password, user[0].password)){
            let ret = {"info": {...user[0]}, "tag": {}, "img": {}}            
            con.query('SELECT * FROM tag WHERE id = ?', [user[0].id], (err, tags, result) => {console.log({...tag[0]})
            ret.tag = {...tags[0]}})
            con.query('SELECT * FROM img WHERE id = ?', [user[0].id], (err, imgs, result) => {ret.img = {...img[0]}})
            console.log(ret)
            res.json(ret)
        }
        else{
            res.json("Combinaison incorrect")
        }
    })
});

app.put('/info/:id', function(req, res){
    
        console.log("body = :", req.body);
        // User.findByIdAndUpdate(id, {$set: {

        // }})
        // User.update({myid: id},{$set: {username: 'tamer'}} function(err, users){
            // if (err){
                // console.log("error");
                // return(res.send('Error'));
            // }
                // return(res.send("its ok"));
        // User.update({username: req.query.username}, function(err, data) {
        //         if (err){
        //             console.log("error");
        //             return(res.send('Error'))
        //         }
        //         console.log("data = " + data);
        //         return(res.send(data));
        // })
        // User.update({User: req.query}, function(err, users) {
        //     if (err){
        //         console.log("error");
        //         return(res.send('Error'))
        //     }
        //     console.log("User= ", req.query);
        //     return(res.send("it worked"));
        // })
        // User.findOne({})
        // res.json({ status: 'ok' });    
    })

// app.post('/upload', upload.single('profile_picture'), (req, res) => {
//     console.log(req.file.path);
//     new Img({
//         path: req.file.path,
//         fieldname: req.file.fieldname
//     }).save();
//     res.json({ status: 'ok' });
// });

app.listen(3000);