import axios from 'axios'
import {AT_USERS, AT_TAG, AT_IMG, AT_SEARCH} from './actions-types'
import {browserHistory} from 'react-router'
const END_POINT = "http://localhost:3000"


export function createSearch(){
    console.log("")
    let search = {"age": "18-25", "orientation": "Heterosexuel", "sexe": "Feminin", "distance": "10"}
     return function (dispatch){
             dispatch({type: AT_SEARCH.INFO, payload: search})
         }
 }
 export function createResult(){
    console.log("")
    let search = {"info":{},"tag":{}}
     return function (dispatch){
             dispatch({type: AT_SEARCH.UPDATE, payload: search})
         }
 }
 export function readUser(id){
    console.log("")
     return function (dispatch){
         axios({
    method: 'get',
    url: `${END_POINT}/id`,
    params: {"id": "5a578c0431a7e9498aaa9bda"}
    })
    .then((response) =>{
        console.log("id", response.data)
             dispatch({type: AT_USERS.READ, payload: response.data})
         })
     }
 }

   
export function imgCreate(id){
    let image = {"profile_picture": "../../avatar.png", "picture_1": "../../avatar.png", "picture_2": "../../avatar.png", "picture_3": "../../avatar.png", "picture_4": "../../avatar.png"}
    return function (dispatch){
//         axios({
//    method: 'get',
//    url: `${END_POINT}/user`,
//    params: {id}
//    })
//    .then((response) =>{
            dispatch({type: AT_IMG.INFO, payload: image})
        // })
    }
}


export function infoUser(state, info, value){
    return function (dispatch){
    let ret = {...state}
    // if (info == "username" || info == "nom" || info == "prenom" || info == "orientation" || info == "age" || info == "sexe" | info == "bio")
    ret[info] = value
    dispatch({type: AT_USERS.INFO_USER, payload: ret})
    }
    }

    export function infoSearch(state, info, value){
        return function (dispatch){
        let ret = {...state}
        console.log("ret",ret)
        // if (info == "username" || info == "nom" || info == "prenom" || info == "orientation" || info == "age" || info == "sexe" | info == "bio")
        ret[info] = value
        dispatch({type: AT_SEARCH.INFO, payload: ret})
        }
        }

export function imgInfo(e, props, image){
    return function (dispatch){
    let reader = new FileReader();
    let file = e.target.files[0];
    let ret = {...props}
    reader.onloadend = () => {
        ret[image] = reader.result;
        dispatch({type: AT_IMG.INFO, payload: ret})
    }
    reader.readAsDataURL(file)
    const formData = new FormData();
    formData.append(image, file);
    axios.post(`${END_POINT}/upload`, formData, {
    headers: { 'content-type': 'multipart/form-data' }
    })
    }
}

export const createUser = (ret) => axios({
    method: 'get',
    url: `${END_POINT}/users`,
    params: ret
    }).then((response) =>{
    // if (response.data == 'ok')
    // browserHistory.push('/info')
    })

export function  updateUser(props, event){
    console.log("props", props)
    // let user = props.users;
    // let tag = props.tags;
    event.preventDefault()
    return function (dispatch){
        axios({ method: 'put',
        url: `${END_POINT}/info`,
        params: props
    }).then((response) =>{
        // console.log("retour", response.data)
            dispatch({type: AT_USERS.UPDATE , payload: props})
        })
    }
}

export function  updateSearch(props, event){
    console.log("props", props)
    // let user = props.users;
    // let tag = props.tags;
    event.preventDefault()
    return function (dispatch){
    //     axios({ method: 'get',
    //     url: `${END_POINT}/search`,
    //     params: props
    // }).then((response) =>{
        let ret = {"info":{"nom": "John", "prenom": "Cafe", "age": "55", "distance": "3,5mm", "sexe": "Masculin", "image": "../../avatar.png", "orientation": "Heterosexuel"},
        "tag":{"Sport": "checked", "Music": "checked"}}
        // console.log("retour", response.data)
            dispatch({type: AT_SEARCH.UPDATE , payload: ret})
        // })
    }
}

export function  checkConnexion(user){
    return function (dispatch){
        axios({
            method: 'post',
            url: `${END_POINT}/login`,
            params: user
    }).then((response) =>{
        if(response.data)
        {
            dispatch({type: AT_USERS.CHECK , payload: response.data})
            browserHistory.push('/info')
        }
        })
    }
}