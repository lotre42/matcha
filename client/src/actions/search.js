import axios from 'axios'
import {AT_USERS, AT_TAG, AT_IMG, AT_SEARCH, AT_LIKE, AT_VIEW, AT_MATCH, AT_PROFIL} from './actions-types'
import {browserHistory} from 'react-router'
import {itsort, itsort2} from '../function/function'
const END_POINT = "http://localhost:3000"

export function changeImg(state, value){
    return function (dispatch){
    let ret = {...state};
    ret.image.display = value
    dispatch({type: AT_PROFIL.CHANGE, payload: ret})
    }
}

export function infoProfil(id){
     return function (dispatch){
        let token = localStorage.getItem('token');         
        axios({ method: 'get',
        url: `${END_POINT}/profil`,
        params: id,
        headers: { 'Authorization': token }
    }).then((response) =>{
        if (localStorage.getItem('profil'))
            localStorage.removeItem('profil')
        localStorage.setItem('profil', id);             
        let ret = response.data;
        ret.image.display = ret.image.picture_1;
        dispatch({type: AT_PROFIL.INFO, payload: response.data})
        browserHistory.push('/profil')     
         })
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


export function  sorttab(tab, index){
    console.log("pop", tab, index)    
    if (index != "aucun"){
        if (index != "pop"){
            while (itsort(tab, index) == 0){
                for (let i = 0; i < tab.length; i++){
                    if (index != "pop" && i < tab.length - 1 && tab[i].info[index] > tab[i + 1].info[index])
                    {
                        let t = tab[i];
                        tab[i] = tab[i + 1];
                        tab[i + 1] = t;   
                    }
                }
            }
        }
        else{
            while (itsort2(tab, index) == 0){
                for (let i = 0; i < tab.length; i++){
                    if (i < tab.length - 1 && tab[i].info[index] < tab[i + 1].info[index])
                    {
                        let t = tab[i];
                        tab[i] = tab[i + 1];
                        tab[i + 1] = t;   
                    }
                }
            }
        }
    }
    return function (dispatch){
        dispatch({type: AT_SEARCH.UPDATE , payload: tab})
        browserHistory.push('/search')
    }
}
export function  updateSearch(props, event){
    event.preventDefault()
    let token = localStorage.getItem('token');
    return function (dispatch){
        axios({ method: 'get',
        url: `${END_POINT}/search`,
        params: props,
        headers: { 'Authorization': token }
    }).then((response) =>{
            dispatch({type: AT_SEARCH.UPDATE , payload: response.data})
        })
    }
}
