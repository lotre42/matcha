import axios from 'axios'
import {AT_USERS, AT_TAG} from './actions-types'
import {browserHistory} from 'react-router'
const END_POINT = "http://localhost:3000"

export function readTag(id){
    return function (dispatch){
        axios.get(`${END_POINT}/users/${id}`).then((response) =>{
            dispatch({type: AT_TAG.READ, payload: response.data})
        })
    }
}

export function readUser(id){
    return function (dispatch){
        axios.get(`${END_POINT}/users/${id}`).then((response) =>{
            dispatch({type: AT_USERS.READ, payload: response.data.user})
        })
    }
}

export function infoTag(tags, index, value){
    console.log("tag-->", tags)
    // if (!tags)
    // {
    //     tags = { "Sport": 0, "Music": 0,"Geek": 0,"Tatouage": 0,"Bouffe": 0,"Etudiant": 0, "Cinema": 0,"Voyage": 0, "Feignant": 0,"Litterature": 0, "Shopping": 0,
    //     }
    // }
    if (value == true)
        tags[index] = "checked"
    else
            tags[index] = 0
    return function (dispatch){
        axios.put(`${END_POINT}/users/1`,
        {
         ...tags   
            
        }
    ).then((response) =>{
            dispatch({type: AT_TAG.INFO, payload: {...tags}})
        })
    }
}
// export function  updateTag(tags, event){
//     event.preventDefault()
//     return function (dispatch){
//         axios.post(`${END_POINT}/users`,
//         {
//          ...tags   
            
//         }
//     ).then((response) =>{
//             dispatch({type: AT_TAG.UPDATE , payload: tags})
//         })
//         console.log("tagst",tags)
//     }
// }
export function infoUser(state, info, value){
    return function (dispatch){
        let ret = {...state}
        if (info == "username" || info == "nom" || info == "prenom" || info == "orientation" || info == "age" || info == "sexe")
            ret[info] = value
        dispatch({type: AT_USERS.INFO, payload: ret})
        }
}

export function  createUser(ret){
    let user = ret
    user.orientation = '';
    user.sexe = '';
    user.age = ''
    return function (dispatch){
        axios.post(`${END_POINT}/users`,
        {
           user
        }
    ).then((response) =>{
        if (response.data == '1')
             browserHistory.push('/info')
        })
    }
}

export function  updateUser(user, event){
    event.preventDefault()
    return function (dispatch){
        axios.put(`${END_POINT}/users/1`,
        {
            user
        }
    ).then((response) =>{
            dispatch({type: AT_USERS.UPDATE , payload: user})
        })
    }
}

export function  checkConnexion(user){
    return function (dispatch){
        axios.post(`${END_POINT}/users`,
        {
            login: user.login,
            password: user.password
        }
    ).then((response) =>{
        let res = {
            username: "Lotre",
            nom: "Ahantar",
            prenom: "Karim",
            email: "k.ahantar@yahoo.fr",
            orientation: "Bisexuel"
        }
        if(response.data)
        {
            dispatch({type: AT_USERS.CHECK , payload: res})
            browserHistory.push('/info')
        }
        })
    }
}