const express = require ('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const multer = require('multer');
const pgp = require('pg-promise')();

const upload = multer({
    dest: 'uploads/'
});
const app = express();

const init = async () => {
    const cn
     = {
      host: '95.85.22.142',
      // port: 5432,
      database: 'matcha',
      user: 'matcha',
      password: 'matcha',
    };
  
    try {
      const db = pgp(cn);
      db.connect();
      db.none(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        prenom VARCHAR NOT NULL,
        nom VARCHAR NOT NULL,
        sexe VARCHAR,
        orientation VARCHAR DEFAULT 'bisexual',
        bio TEXT,
        age INTEGER,
        profil_picture VARCHAR DEFAULT '/uploads/null',
        picture_1 VARCHAR DEFAULT '/uploads/null',
        picture_2 VARCHAR DEFAULT '/uploads/null',
        picture_3 VARCHAR DEFAULT '/uploads/null',
        picture_4 VARCHAR DEFAULT '/uploads/null',
        profile_picture VARCHAR DEFAULT '/uploads/null',
        Sport VARCHAR NOT NULL,
        Music VARCHAR NOT NULL,
        Geek VARCHAR NOT NULL,
        Tatouage VARCHAR NOT NULL,
        Bouffe VARCHAR NOT NULL,
        Etudiant VARCHAR NOT NULL,
        Voyage VARCHAR NOT NULL,
        Feignant VARCHAR NOT NULL,
        Litterature VARCHAR NOT NULL,
        Shopping VARCHAR NOT NULL
      )`);
      return(db);
    }
        catch (err) {
            console.log(err);
        }
  };

const db = init();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/users', function(req, res){
    
    // var name = req.body.username;
      console.log("body", req.body);
      let username = req.body.username;
      let sql = `UPDATE users SET username = ${username}`;
      db.none(sql, username, (err, res) => {
          if (err){
              console.log(err);
          }
          console.log(res);
      });
    // User.findOne({"info.username": name}, function(err, users) {
    //     if (err) {
    //         return(res.send('marche pas 1!!!'));
    //     }
    //     if (!users) {
    //         new User({
    //             info: {
    //                 username: req.body.username,
    //                 nom: req.body.nom,
    //                 prenom: req.body.prenom,
    //                 email: req.body.email,
    //                 password: req.body.password,
    //                 bio: "toto",
    //                 sexe: "tata",
    //                 orientation: "titi",
    //                 age: "tutu"
    //             }
    //         }).save();
    //         return(res.send('He registred'));            
    //     }
    //     else {
    //         console.log("Rayan le bosse");
    //         return(res.send('already register'));
    //     }
    // });
});

app.get('/id', function(req, res) {

    // var ID = req.query.id;
    // console.log("je rentre ici");
    // User.findById({_id: ID}, function(err, users) {
    //     if (err){
    //          return(res.send('Error'));
    //     }
    //     if (!users){
    //         console.log('pas trouver');
    //         return(res.send('pas trouver'));
    //     }
    //     else {
    //         console.log('user = ', users);
    //         return(res.send(users));
    //     }
    // })
})

app.post('/login', function(req, res){

    // console.log("req=", req.query.login);
    // var login = req.body.login;
    // User.findOne({"info.username": login}, function(err, users) {
    //     if (err){
    //         console.log('Error');
    //         return(res.send('Error'));
    //     }
    //     if (!users) {
    //         console.log('Je trouve R');
    //         return(res.send('non'))
    //     }
    //     else {
    //         console.log('je les trouver');
    //         console.log('users = ', users);
    //         return(res.send(users));
    //     }
    // })
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