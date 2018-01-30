const con = require('./db');
let data = require('./fake_user');
let i = 0;

let tag = "INSERT INTO tag SET Sport = ?, Music = ?, Geek = ?, Tatouage = ?, Bouffe = ?, Etudiant = ?, Cinema = ?, Voyage = ?, Feignant = ?, Litterature = ?, Shopping = ?"; 
let user = "INSERT INTO users SET username = ?, nom = ?, prenom = ?, email = ?, password = ?, bio = ?, sexe = ?, age = ?, validation = ?, ville = ?, lon = ?, lat = ?, orientation = ?";
let img = "INSERT INTO img SET profile_picture = ?, picture_1 = ?, picture_2 = ?, picture_3 = ?, picture_4 = ?";  
let valueimg = ["../../avatar.png", "../../avatar.png", "../../avatar.png", "../../avatar.png", "../../avatar.png"];
while (i < 500){
    let valueus = [data[i].users.username,data[i].users.nom,data[i].users.prenom,data[i].users.email,data[i].users.password,data[i].users.bio,data[i].users.sexe,data[i].users.age,data[i].users.validation,data[i].users.ville,data[i].users.lon,data[i].users.lat, data[i].users.orientation];
    let valuetag = [data[i].tag.Sport,data[i].tag.Music,data[i].tag.Geek,data[i].tag.Tatouage,data[i].tag.Bouffe,data[i].tag.Etudiant,data[i].tag.Cinema,data[i].tag.Voyage,data[i].tag.Feignant,data[i].tag.Litterature,data[i].tag.Shopping];    
    con.query(user, valueus);
    con.query(tag, valuetag);
    con.query(img, valueimg);    
    i++;
}
