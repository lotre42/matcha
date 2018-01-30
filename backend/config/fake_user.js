var casual = require('casual')

    const sexe = ["Homme", "Femme"];
    const orientation = ["bisexuel", "homosexuel", "heterosexuel"];
    let fake = [];
    for(let i = 0; i < 500; i++){
    let data =  { 
            "users": {
                "username": casual.username,
                "nom": casual.last_name,
                "prenom": casual.first_name,
                "email": casual.email,
                "password": casual.password,
                "bio": casual.words(n = 7),
                "sexe": sexe[casual.integer(from = 0, to = 1)],
                "orientation": orientation[casual.integer(from = 0, to = 2)],
                "age": casual.integer(from = 18, to = 99),
                "validation": 1,
                "ville": casual.city,
                "lon": casual.longitude,
                "lat": casual.latitude
            }, 
            "tag": {
                "Sport": casual.integer(from = 0, to = 1),
                "Music": casual.integer(from = 0, to = 1),
                "Geek": casual.integer(from = 0, to = 1),
                 "Tatouage": casual.integer(from = 0, to = 1),
                  "Bouffe": casual.integer(from = 0, to = 1),
                   "Etudiant": casual.integer(from = 0, to = 1),
                    "Cinema": casual.integer(from = 0, to = 1),
                     "Voyage": casual.integer(from = 0, to = 1),
                      "Feignant": casual.integer(from = 0, to = 1),
                       "Litterature": casual.integer(from = 0, to = 1),
                        "Shopping": casual.integer(from = 0, to = 1)
            }, 
            "image": {
                "profile_picture": "../../avatar.png",
                "profile_1": "../../avatar.png",
                "profile_2": "../../avatar.png",
                "profile_3": "../../avatar.png",
                "profile_4": "../../avatar.png",
            } 
        }
        fake.push(data);
    }
    // for (let i = 0; i < 25; i++) {
    //   data.users.push({ id: i, username: casual.username, nom: casual.last_name, prenom: casual.first_name, email: casual.email })
    // }
    // data.connexion.push({ login: casual.username, password: casual.password })
    module.exports = fake