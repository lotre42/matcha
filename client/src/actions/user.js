import axios from 'axios'
import {AT_USERS, AT_TAG, AT_IMG, AT_SEARCH, AT_MESSAGE} from './actions-types'
import {browserHistory} from 'react-router'
const END_POINT = "http://localhost:3000"

export function  checkConnexion(user){
    return function (dispatch){
        axios({
            method: 'post',
            url: `${END_POINT}/login`,
            params: user
    }).then((response) =>{
        // console.log("response", response.data)
        if(response.data)
        {
            let token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('idmessage', response.data.id_message);
            let payloadtoken = JSON.parse(atob(token.split('.')[1]));
            dispatch({type: AT_MESSAGE.ID , payload: response.data.id_message})               
            dispatch({type: AT_USERS.CHECK , payload: payloadtoken.user})
            browserHistory.push('/info')
        }
        })
    }
}

export function  createUser(ret){
    return function (dispatch){
        axios({ method: 'post',
        url: `${END_POINT}/users`,
        data: ret
    }).then((response) =>{
        if (response.data){
            let token = response.data;
            localStorage.setItem('verif', token);
            browserHistory.push('/connexion')                        
        }        
        })
    }
}
export function  verif(){
    const token = localStorage.getItem('verif');
    return function (dispatch){
        axios({ method: 'get',
        url: `${END_POINT}/verifemail`,
        headers: { 'Authorization': token }
    })
}
}

// export function forget(e, email){
//     e.preventDefault()
//     console.log(email);
    //     const token = localStorage.getItem('verif');
//     return function (dispatch){
//         axios({ method: 'get',
//         url: `${END_POINT}/verifemail`,
//         headers: { 'Authorization': token }
//     })
// }
// }
export function  updateUser(props, event){
    event.preventDefault()
    return function (dispatch){
        let token = localStorage.getItem('token');
        axios({ method: 'put',
        url: `${END_POINT}/info`,
        params: props,
        headers: { 'Authorization': token }
    }).then((response) =>{
        if(response.data)
        {
            let token = response.data;
            if (localStorage.getItem('token'))
                localStorage.removeItem('token')
            localStorage.setItem('token', token);
        }
        dispatch({type: AT_USERS.UPDATE , payload: props})
        })
    }
}

export function infoUser(state, info, value, methode){
    return function (dispatch){
    let ret = {...state};
    // if (info == "username" || info == "nom" || info == "prenom" || info == "orientation" || info == "age" || info == "sexe" | info == "bio")
    ret[methode][info] = value
    dispatch({type: AT_USERS.INFO_USER, payload: ret})
    }
}

export function imgInfo(e, props, image){
    return function (dispatch){
    let reader = new FileReader();
    let file = e.target.files[0];
    let ret = {...props}
    reader.onloadend = () => {
        ret.image[image] = reader.result;
        dispatch({type: AT_USERS.INFO_USER, payload: ret})
    }
    reader.readAsDataURL(file)
    const token = localStorage.getItem('token')
    const formData = new FormData();
    formData.append(image, file);
    axios.post(`${END_POINT}/upload`, formData, {
    headers: { 'content-type': 'multipart/form-data' ,  'Authorization': token }
    })
    }
}

export function readUser(id){
     return function (dispatch){
         let token = localStorage.getItem("token");
         let id_message = localStorage.getItem("idmessage").split(',');
         let ret = JSON.parse(atob(token.split('.')[1]));
         dispatch({type: AT_MESSAGE.ID , payload: id_message})                   
        dispatch({type: AT_USERS.READ, payload: ret.user})    
    }
}

export function resetUser(id){
    return function (dispatch){
        const token = localStorage.getItem('token')        
        axios({ method: 'get',
        url: `${END_POINT}/deconnexion`,
        params: id,
        headers: { 'Authorization': token }})
        browserHistory.push('/')
        localStorage.removeItem("token");
        const ret = []
        dispatch({type: AT_USERS.RESET , payload: ret})                   
   }
}