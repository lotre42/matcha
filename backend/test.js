const con = require('./config/db');
var mysql = require('mysql');
const geolib = require('geolib');
//mantes,limay, buch, ro, mag,mur,poi, rou, ep, pa
const tab = [
        {"lon":1.7167, "lat": 48.9833},
        {"lon":1.7333, "lat": 48.9833},
       {"lon":1.6667, "lat": 48.9833},
        {"lon":1.63, "lat": 48.999},
        {"lon":1.6833, "lat": 48.9667},
        {"lon":1.9167, "lat": 49},
        {"lon":2.0495200, "lat": 48.9290200},
        {"lon":1.0993, "lat": 49.4431},
        {"lon":1.8223300, "lat": 48.9547600},
        {"lon":2.333333, "lat": 48.866667},
        
]
let d;
for (let i = 1; i <= 9; i++){
    if ((d = (geolib.getDistance(
        {latitude: tab[i].lat, longitude: tab[i].lon},
        {latitude: tab[0].lat, longitude: tab[0].lon}
    ) / 1000)) >= 20){
        console.log("sup", d)
    }
    else{
        console.log("add", d)
    }
//     // ret[i].info.distance = Math.round((geolib.getDistance(
//     //     {latitude: ret[i].info.lat, longitude: ret[i].info.lon},
//     //     {latitude: payloadtoken.user.info.lat, longitude: payloadtoken.user.info.lon}
//     // )) / 1000);
}
