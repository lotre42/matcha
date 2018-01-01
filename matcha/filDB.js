var casual = require('casual')

module.exports = () => {
    const data = { users: [], connexion: [] }
    // for (let i = 0; i < 25; i++) {
    //   data.users.push({ id: i, username: casual.username, nom: casual.last_name, prenom: casual.first_name, email: casual.email })
    // }
    // data.connexion.push({ login: casual.username, password: casual.password })
    return data
  }