const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');

const upload = multer({
    dest: 'uploads/'
});

const keys = require('./config/keys');

require('./models/User');


const app = express();

mongoose.connect(keys.mongoURI);
var User = mongoose.model('users');
var Img = mongoose.model('imgs');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/users', function(req, res){

    // var name = req.query.username;
    // User.findOne({username: name}, function(err, users) {
    //     if (err) {
    //         return(res.send('marche pas 1!!!'));
    //     }
    //     if (!users) {
    //         console.log('its in');
    //         new User({
    //             username: req.query.username,
    //             nom: req.query.nom,
    //             prenom: req.query.prenom,
    //             email: req.query.email,
    //             password: req.query.password,
    //             confirm: req.query.confirm
    //         }).save();
    //         return(res.send('He registred'));            
    //     }
    //     else {
    //         return(res.send('already register'));
    //     }
    //     console.log('users = ' + users);
    // });
 
});

app.get('/id', function(req, res) {

    var ID = req.query.id;
    console.log(ID)
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
    // res.send()
})


app.post('/login', function(req, res){

    // console.log("req=", req.query.login);
    var login = req.query.login;
    User.findOne({username: login}, function(err, users) {
        if (err){
            console.log('Error');
            return(res.send('Error'));
        }
        if (!users) {
            console.log('Je trouve R');
            return(res.send('non'))
        }
        else {
            console.log('je les trouver');
            console.log('users = ', users);
            return(res.send(users));
        }
    })
});

app.put('/info', function(req, res){
    console.log("req:", req.query);
    res.json({ status: 'ok' });    
})

app.post('/upload', upload.single('profile_picture'), (req, res) => {
    console.log(req.file.path);
    new Img({
        path: req.file.path,
        fieldname: req.file.fieldname
    }).save();
    res.json({ status: 'ok' });
});

app.listen(3000);