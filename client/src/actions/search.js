import axios from 'axios'
import {AT_USERS, AT_TAG, AT_IMG, AT_SEARCH, AT_LIKE, AT_VIEW, AT_MATCH, AT_PROFIL} from './actions-types'
import {browserHistory} from 'react-router'
const END_POINT = "http://localhost:3000"

export function changeImg(state, value){
    return function (dispatch){
    let ret = {...state};
    ret.image.display = value
    console.log("test",ret)    
    dispatch({type: AT_PROFIL.CHANGE, payload: ret})
    }
}

export function infoProfil(){
    let user = {
        "info":{        "username": "Lotre",
                        "nom": "Ahantar",
                        "prenom": "karim",
                        "bio": "coucou sava",
                        "sexe": "Masculin",
                        "orientation": "Heterosexuel",
                        "age": "22",
                },
        "tag":{"Sport": true,
        "Music": false,
         "Geek":false,
          "Tatouage":true,
           "Bouffe":false,
            "Etudiant":false,
             "Cinema":false,
              "Voyage":false,
               "Feigant":true,
                "Litterature":false,
                 "Shopping":false},
        "image":{"display": "", "profile_picture": "../../avatar.png", "picture_1": "../../bogoss.png", "picture_2": "../../avatar.png", "picture_3": "../../avatar.png", "picture_4": "../../avatar.png"}
            }
        user.image.display = user.image.picture_1
     return function (dispatch){
             dispatch({type: AT_PROFIL.INFO, payload: user})
         }
 }

export function createSearch(){
    let search = {"info":
                    {"age": "18-25", "orientation": "homosexuel", "sexe": "Femme", "distance": "20"},
                    "tag": []
}
     return function (dispatch){
             dispatch({type: AT_SEARCH.INFO, payload: search})
         }
 }

 export function infoSearch(state, info, value, prop){
    return function (dispatch){
    let ret = {...state}
    // if (info == "username" || info == "nom" || info == "prenom" || info == "orientation" || info == "age" || info == "sexe" | info == "bio")
    if (prop == "tag")
        ret[prop].push(info+"=1")
    else
        ret[prop][info] = value
    dispatch({type: AT_SEARCH.INFO, payload: ret})
    }
}
export function  searchView(){
    // let user = props.users;
    // let tag = props.tags;
    return function (dispatch){
    //     axios({ method: 'get',
    //     url: `${END_POINT}/search`,
    //     params: props
    // }).then((response) =>{
        let ret = {"1":{
                        "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                        "tag": {"Sport": "checked", "Music": "checked"}
                        },
                    "2":{
                        "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                        "tag": {"Sport": "checked", "Music": "checked"}
                        },
                        "5":{
                            "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                            "tag": {"Sport": "checked", "Music": "checked"}
                            },
                            "3":{
                                "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                                "tag": {"Sport": "checked", "Music": "checked"}
                                },
                                "4":{
                                    "info": {"nom": "luc", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                                    "tag": {"Sport": "checked", "Music": "checked"}
                                    },
                  }
        // console.log("retour", response.data)
            dispatch({type: AT_VIEW.WHO , payload: ret})
        // })
    }
}
export function  searchMatch(){
    // let user = props.users;
    // let tag = props.tags;
    return function (dispatch){
    //     axios({ method: 'get',
    //     url: `${END_POINT}/search`,
    //     params: props
    // }).then((response) =>{
        let ret = {"1":{
                        "info": {"nom": "HABASS", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                        "tag": {"Sport": "checked", "Music": "checked"}
                        },
                    "2":{
                        "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                        "tag": {"Sport": "checked", "Music": "checked"}
                        },
                        "5":{
                            "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                            "tag": {"Sport": "checked", "Music": "checked"}
                            },
                            "3":{
                                "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                                "tag": {"Sport": "checked", "Music": "checked"}
                                },
                                "4":{
                                    "info": {"nom": "luc", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                                    "tag": {"Sport": "checked", "Music": "checked"}
                                    },
                  }
        // console.log("retour", response.data)
            dispatch({type: AT_MATCH.WHO , payload: ret})
        // })
    }
}
export function  searchLike(){
    // let user = props.users;
    // let tag = props.tags;
    return function (dispatch){
    //     axios({ method: 'get',
    //     url: `${END_POINT}/search`,
    //     params: props
    // }).then((response) =>{
        let ret = {"1":{
                        "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                        "tag": {"Sport": "checked", "Music": "checked"}
                        },
                    "2":{
                        "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                        "tag": {"Sport": "checked", "Music": "checked"}
                        },
                        "5":{
                            "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                            "tag": {"Sport": "checked", "Music": "checked"}
                            },
                            "3":{
                                "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                                "tag": {"Sport": "checked", "Music": "checked"}
                                },
                                "4":{
                                    "info": {"nom": "luc", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                                    "tag": {"Sport": "checked", "Music": "checked"}
                                    },
                  }
        // console.log("retour", response.data)
            dispatch({type: AT_LIKE.WHO , payload: ret})
        // })
    }
}

export function  updateSearch(props, event){
    // let user = props.users;
    // let tag = props.tags;
    console.log("sss", props)
    event.preventDefault()
    let token = localStorage.getItem('token');
    return function (dispatch){
        axios({ method: 'get',
        url: `${END_POINT}/search`,
        params: props,
        headers: { 'Authorization': token }
    }).then((response) =>{
        let ret = {"1":{
                        "info": {"nom": "John", "prenom": "Cafe", "age": "55", "Ville": "Mantes", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                        "tag": {"Sport": "checked", "Music": "checked"}
                        },
                    "2":{
                        "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                        "tag": {"Sport": "checked", "Music": "checked"}
                        },
                        "5":{
                            "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                            "tag": {"Sport": "checked", "Music": "checked"}
                            },
                            "3":{
                                "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                                "tag": {"Sport": "checked", "Music": "checked"}
                                },
                                "4":{
                                    "info": {"nom": "luc", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                                    "tag": {"Sport": "checked", "Music": "checked"}
                                    },
                                    "6":{
                                        "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                                        "tag": {"Sport": "checked", "Music": "checked"}
                                        },
                                        "8":{
                                            "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                                            "tag": {"Sport": "checked", "Music": "checked"}
                                            },
                                            "9":{
                                                "info": {"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
                                                "tag": {"Sport": "checked", "Music": "checked"}
                                                }
                  }
        console.log("retour", response.data)
            dispatch({type: AT_SEARCH.UPDATE , payload: ret})
        })
    }
}
