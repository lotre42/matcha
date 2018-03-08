const con = require('./db');
const casual = require('casual');
let data = require('./fake_user');
let i = 0;

// let insert = "INSERT INTO message SET id_envoyeur = 499, id_receveur = ?, message = ?, date = now()"
// for (let x = 1; x < 10; x++){
//     con.query(insert, [x, "coucou"], function (err, result) {
//                         if (err) throw err;});
// }

// let vue = "INSERT INTO vue SET id_profil = 500, id_visiteur = ?, date = NOW()"
// for (let i = 0; i < 12; i++){
//     con.query(vue, [casual.integer(from = 0, to = 499)], function (err, result) {
//                 if (err) throw err;});
// }
// let like = "INSERT INTO lik SET id_profil = 500, id_likeur = ?, date = NOW()"
// for (let i = 0; i < 12; i++){
//     con.query(like, [casual.integer(from = 0, to = 499)], function (err, result) {
//                 if (err) throw err;});
// }
// let tag = "INSERT INTO tag SET Sport = ?, Music = ?, Geek = ?, Tatouage = ?, Bouffe = ?, Etudiant = ?, Cinema = ?, Voyage = ?, Feignant = ?, Litterature = ?, Shopping = ?"; 
let user = "INSERT INTO users SET username = ?, nom = ?, prenom = ?, email = ?, password = ?, bio = ?, sexe = ?, age = ?, validation = ?, ville = ?, lon = ?, lat = ?, orientation = ?, vue = ?, lik = ?, pop = ?, enligne = ?, connexion = now()";
// // let img = "INSERT INTO img SET profile_picture = ?, picture_1 = ?, picture_2 = ?, picture_3 = ?, picture_4 = ?";  
// // let valueimg = ["../../avatar.png", "../../avatar.png", "../../avatar.png", "../../avatar.png", "../../avatar.png"];
while (i < 500){
    let valueus = [data[i].users.username,data[i].users.nom,data[i].users.prenom,data[i].users.email,data[i].users.password,data[i].users.bio,data[i].users.sexe,data[i].users.age,data[i].users.validation,data[i].users.ville,data[i].users.lon,data[i].users.lat, data[i].users.orientation, data[i].users.vue, data[i].users.lik, data[i].users.pop, data[i].users.enligne];
// //     let valuetag = [data[i].tag.Sport,data[i].tag.Music,data[i].tag.Geek,data[i].tag.Tatouage,data[i].tag.Bouffe,data[i].tag.Etudiant,data[i].tag.Cinema,data[i].tag.Voyage,data[i].tag.Feignant,data[i].tag.Litterature,data[i].tag.Shopping];    
    con.query(user, valueus, function (err, result) {
        if (err) throw err;});
//     con.query(tag, valuetag,function (err, result) {
//         if (err) throw err;});
//     con.query(img, valueimg, function (err, result) {
//         if (err) throw err;});    
    i++;
}
