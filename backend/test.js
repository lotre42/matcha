const con = require('./config/db');
var mysql = require('mysql');


// let info = geolib.isPointInCircle(
//     {latitude: -21.8044, longitude: 6.6986},
//     {latitude: 61.5132, longitude: 9.9248},
//     50000000
// );
// let info = geolib.getDistance(
//     {latitude: -21.8044, longitude: 6.6986},
//     {latitude: -21.8, longitude: 9.9248},
// );
// console.log(info / 1000)

// let test = "Select * from users WHERE age >= ? AND age <= ? AND sexe = ? AND orientation = ?";
// con.query(test, ["18", "25", "Femme", "heterosexuel"] , (err, user, result) => {
//     let val = [];
//     let length = user.length;
//     for (let i = 0; i < length; i++){
//         val.push(user[i].id)
//     }
//     let tag = "Select * from tag WHERE id IN ?";
//     con.query(tag, val , (err, user, result) => {
//         // console.log(user)

//     })
// })
let tag = ["Sport", "Music"]

let test = "SELECT * FROM tag WHERE " + tag[0] + "=1";
// console.log(test)
con.query(test , (err, user, result) => {
    // let val = [];
    // let length = user.length;
    // for (let i = 0; i < length; i++){
        // val.push(user[i].id)
        // console.log(user)
    })
    // let tag = "Select * from tag WHERE id IN ?";
    // con.query(tag, val , (err, user, result) => {
        // console.log(user)

    // })
// })
