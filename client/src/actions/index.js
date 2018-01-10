import axios from 'axios'
import {AT_USERS, AT_TAG, AT_IMG} from './actions-types'
import {browserHistory} from 'react-router'
const END_POINT = "http://localhost:3000"

// export function readTag(id){
//     return function (dispatch){
//         axios.get(`${END_POINT}/users/${id}`).then((response) =>{
//             // console.log(response.data)
//             dispatch({type: AT_TAG.READ, payload: response.data.tag})
//         })
//     }
// }
// export function readTag(id){
//     return function (dispatch){
//         axios({
//    method: 'get',
//    url: `${END_POINT}/user`,
//    params: {id}
//    })
//    .then((response) =>{
//        let tag = []
//             dispatch({type: AT_TAG.READ, payload: tag})
//         })
//     }
// }

 export function readUser(id){
    console.log("coucou")
     return function (dispatch){
         axios({
    method: 'get',
    url: `${END_POINT}/user`,
    params: {id}
    })
    .then((response) =>{
             dispatch({type: AT_USERS.READ, payload: response.data})
         })
     }
 }


    
export function readImg(id){
    return function (dispatch){
        axios.get(`${END_POINT}/users/${id}`).then((response) =>{
            dispatch({type: AT_IMG.READ, payload: response.data.user})
        })
    }
}
export function infoTag(props, index, value){
    // let tag = {...props.tags}
    let user = {...props}
    console.log("props-->", user)
    if (value == true)
        user[index] = "checked"
    else
        user[index] = 0
        console.log("props-->", user)
    return function (dispatch){
        axios({ method: 'put',
        url: `${END_POINT}/info`,
        params: user
    }).then((response) =>{
            dispatch({type: AT_USERS.INFO_TAG , payload: response.data})
        })
    }
}
/*
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
*/
export function imgUser(e, props, image){
    return function (dispatch){
    let reader = new FileReader();
    let file = e.target.files[0];
    let ret = {...props}
    reader.onloadend = () => {
        ret[image] = reader.result;
        dispatch({type: AT_USERS.INFO_USER, payload: ret})
    }
    reader.readAsDataURL(file)
    
   
}
}
/*
// export function  createUser(ret){
//     let user = ret
//     let tag = []
//     user.orientation = '';
//     user.sexe = '';
//     user.age = ''
//     return function (dispatch){
//         axios.post(`${END_POINT}/users`,
//         {
//            user, tag
//         }
//     ).then((response) =>{
//         if (response.data == '1')
//              browserHistory.push('/info')
//         })
//     }
// }*/
export const createUser = (ret) => axios({
    method: 'get',
    url: `${END_POINT}/users`,
    params: ret
    }).then((response) =>{
    // if (response.data == 'ok')
    // browserHistory.push('/info')
    })

export function  updateUser(props, event){
    // console.log(props)
    let user = props.users;
    // let tag = props.tags;
    event.preventDefault()
    return function (dispatch){
        axios({ method: 'put',
        url: `${END_POINT}/info`,
        params: user
    }).then((response) =>{
        // console.log("retour", response.data)
            dispatch({type: AT_USERS.UPDATE , payload: response.data})
        })
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