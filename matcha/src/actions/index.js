import axios from 'axios'
import {AT_USERS, AT_TAG, AT_IMG} from './actions-types'
import {browserHistory} from 'react-router'
const END_POINT = "http://localhost:3000"

export function readTag(id){
    return function (dispatch){
        axios.get(`${END_POINT}/users/${id}`).then((response) =>{
            // console.log(response.data)
            dispatch({type: AT_TAG.READ, payload: response.data.tag})
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
// export function readImg(id){
//     return function (dispatch){
//         axios.get(`${END_POINT}/users/${id}`).then((response) =>{
//             dispatch({type: AT_IMG.READ, payload: response.data.user})
//         })
//     }
// }
export function infoTag(props, index, value){
    let tag = {...props.tags}
    let user = {...props.users}
    if (value == true)
        tag[index] = "checked"
    else
            ret[index] = 0
    return function (dispatch){
        axios.put(`${END_POINT}/users/1`,
        {
         tag,
         user   
            
        }
    ).then((response) =>{
            dispatch({type: AT_TAG.INFO, payload: tag})
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
        if (info == "username" || info == "nom" || info == "prenom" || info == "orientation" || info == "age" || info == "sexe" | info == "bio")
            ret[info] = value
        dispatch({type: AT_USERS.INFO, payload: ret})
        }
}

export function  createUser(ret){
    let user = ret
    let tag = []
    user.orientation = '';
    user.sexe = '';
    user.age = ''
    return function (dispatch){
        axios.post(`${END_POINT}/users`,
        {
           user, tag
        }
    ).then((response) =>{
        if (response.data == '1')
             browserHistory.push('/info')
        })
    }
}

export function  updateUser(props, event){
    console.log(props)
    let user = props.users;
    let tag = props.tags;
    event.preventDefault()
    return function (dispatch){
        axios.put(`${END_POINT}/users/1`,
        {
            user, tag
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