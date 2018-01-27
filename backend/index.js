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

const secret = "7nTx713Jo25A4hrlWQ3hsQPPIAd0yT";
const upload = multer({
    dest: 'uploads/'
});
const app = express();
// app.use(expressJwt({secret: secret}).unless({ path: ['/users','/login']}))
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/users', function(req, res){
    con.query('SELECT * FROM users WHERE email = ? OR username = ?', [req.body.email, req.body.username], (err, rows, result) => {
        // console.log(rows)
        if (rows[0] && (rows[0]['email'] || rows[0]['pseudo'])){
            res.send('Username ou email utilisé');
        }
        else
        {
            const info = {username: req.body.username, email: req.body.email};
            const token = jwt.sign({user: info}, secret)
            mailer(`Veuillez ouvrir le lien suivant afin de valider votre compte:  http://localhost:8080/verifemail?token=${token}`, req.body.email, "Inscription Matcha")
            let tag = "INSERT INTO tag SET Sport = ?, Music = ?, Geek = ?, Tatouage = ?, Bouffe = ?, Etudiant = ?, Cinema = ?, Voyage = ?, Feignant = ?, Litterature = ?, Shopping = ?"; 
            con.query(tag, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], function (err, result) {
                if (err) throw err;
            });  
            let hash = bcrypt.hashSync(req.body.password, 12);  
            let user = "INSERT INTO users SET username = ?, nom = ?, prenom = ?, email = ?, password = ?, validation = ?";  
            con.query(user, [req.body.username, req.body.nom, req.body.prenom, req.body.email, hash, false], function (err, result) {
                if (err) throw err;
            });
            let img = "INSERT INTO img SET profile_picture = ?, picture_1 = ?, picture_2 = ?, picture_3 = ?, picture_4 = ?";  
            con.query(img, ["../../avatar.png", "../../avatar.png", "../../avatar.png", "../../avatar.png", "../../avatar.png"], function (err, result) {
                if (err) throw err;
            });
            res.json(token);             
        }
    })
});

app.get('/id', function(req, res) {

})

app.post('/login', function(req, res){
	con.query('SELECT * FROM users WHERE username = ?', [req.query.username], (err, user, result) => {
        if (user[0] && bcrypt.compareSync(req.query.password, user[0].password) && user[0].validation == 1){
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
    console.log(req)
});

app.post('/upload', upload.single('profile_picture'), (req, res) => {
    new Img({
        path: req.file.path,
        fieldname: req.file.fieldname
    }).save();
    res.json({ status: 'ok' });
});

app.listen(3000);