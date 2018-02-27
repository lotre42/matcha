const  mysql = require('mysql2/promise');
const geolib = require('geolib');
const {parseTag} = require('./function');

let Searchmatch = async (info, user) => {
        let res;
        const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake', socketPath: '/var/mysql/mysql.sock'});        
        if (info.sexe === "Tous"){
            const [result, fields] = await connection.execute("SELECT * from users WHERE age >= ? AND age <= ? ", [info.age.split('-')[0], info.age.split('-')[1]]);                        
            res = result;
        }
        else if (info.sexe === "Femme"){
            const [result, fields] = await connection.execute("SELECT * from users WHERE age >= ? AND age <= ? AND sexe = ?", [info.age.split('-')[0], info.age.split('-')[1], "Femme"]);                                    
            res = result;
        }
        else if (info.sexe === "Homme"){
            const [result, fields] = await connection.execute("SELECT * from users WHERE age >= ? AND age <= ? AND sexe = ?", [info.age.split('-')[0], info.age.split('-')[1], "Homme"]);                                    
            res = result;        
        }
        let tab = [];
        let distance;
        for (let i = 0; i < res.length; i++){
            if (((distance = geolib.getDistance(
                {latitude: res[i].lat, longitude: res[i].lon},
                {latitude: user.info.lat, longitude: user.info.lon}) / 1000)) < info.distance)
                {
                    tab.push(res[i]);
                }
        }
        let final = [];
        if (user.info.sexe === "Femme"){
            for (let i = 0; i < tab.length; i++){
                if (tab[i].sexe === "Femme" && tab[i].orientation != "heterosexuel" || tab[i].sexe === "Homme" && tab[i].orientation != "homosexuel")
                    final.push(tab[i]);
            }
        }
        if (user.info.sexe === "Homme"){
            for (let i = 0; i < tab.length; i++){
                if (tab[i].sexe === "Homme" && tab[i].orientation != "heterosexuel"|| tab[i].sexe === "Femme" && tab[i].orientation != "homosexuel")
                    final.push(tab[i]);
            }
        }
        let ret = []
        for (let i = 0; i < final.length; i++){
            const [tag, t] = await connection.execute("Select * FROM tag WHERE id = ?", [final[i].id]);
            const [img, im] = await connection.execute("Select profile_picture FROM img WHERE id = ?", [final[i].id]);                                                          
            ret.push({"info": final[i], "tag": parseTag(tag[0])})
            ret[i].info.image = img[0].profile_picture;            
            ret[i].info.distance = Math.round(geolib.getDistance(
                {latitude: res[i].lat, longitude: res[i].lon},
                {latitude: user.info.lat, longitude: user.info.lon}) / 1000)       
        }
        return (ret)
};

let matchbylike = async (tab, user) => {
    let result = {"age": [], "distance": [], "sexe": ""};
    let requete = async (user) => {
        const connection = await mysql.createConnection({host:'localhost', port: 3306, user: 'root',password:'27092709', database: 'matchafake', socketPath: '/var/mysql/mysql.sock'});        
        for(let i = 0; i < tab.length; i++){
            const [info, fields] = await connection.execute("SELECT * from users WHERE id = ?", [tab[i].id_profil]);            
            result.age.push(info[0].age);
            result.distance.push(Math.round(geolib.getDistance(
                {latitude: info[0].lat, longitude: info[0].lon},
                {latitude: user.info.lat, longitude: user.info.lon}) / 1000));
        }
        let sortage = result.age.sort();
        let maxdistance = 20;
        for (i in result.distance){
            if(result.distance[i]>maxdistance)
                maxdistance=result.distance[i];
        }
        result.age = sortage[0] + '-' + sortage[sortage.length - 1];
        result.distance = maxdistance;
        if (user.info.orientation === "bisexuel")
            result.sexe = "Tous";
        else if (user.info.orientation === "heterosexuel" && user.info.sexe == "Femme")
            result.sexe = "Homme";
        else if (user.info.orientation === "heterosexuel" && user.info.sexe == "Homme")
            result.sexe = "Femme";
        else if (user.info.orientation === "homosexuel" && user.info.sexe == "Homme")
            result.sexe = "Homme";
        else if (user.info.orientation === "homosexuel" && user.info.sexe == "Femme")
            result.sexe = "Femme";
        return (result)
        }
        let ret = async (user) => {
            let resultat = await requete(user);
            let final = await Searchmatch(resultat, user);
            return (final)
        }
        let final = await ret(user)
        return (final)
        // requete(user).then(function (result){
        //         Searchmatch(result, user).then(function (final){
        //                 return (final)
        //         })

    // });
};

let matchbyinfo = async (user) => {
    let result = {"age": [], "distance": 100, "sexe": ""};
    result.age = (user.info.age - 10) + '-' + (user.info.age + 10)
    if (user.info.orientation === "bisexuel")
            result.sexe = "Tous";
    else if (user.info.orientation === "heterosexuel" && user.info.sexe == "Femme")
        result.sexe = "Homme";
    else if (user.info.orientation === "heterosexuel" && user.info.sexe == "Homme")
        result.sexe = "Femme";
    else if (user.info.orientation === "homosexuel" && user.info.sexe == "Homme")
        result.sexe = "Homme";
    else if (user.info.orientation === "homosexuel" && user.info.sexe == "Femme")
        result.sexe = "Femme";
    let final = await Searchmatch(result, user)
    return (final)    
};

module.exports = { matchbylike, matchbyinfo };