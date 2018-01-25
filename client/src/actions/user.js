import axios from 'axios'
import {AT_USERS, AT_TAG, AT_IMG, AT_SEARCH} from './actions-types'
import {browserHistory} from 'react-router'
const END_POINT = "http://localhost:3000"

export function  checkConnexion(user){
    return function (dispatch){
        axios({
            method: 'post',
            url: `${END_POINT}/login`,
            params: user
    }).then((response) =>{
        let ret = {"info": {}, "tag": {}, "img": {}};
        ret.info = {...response.data}
        console.log("response", ret)
        if(response.data)
        {
            dispatch({type: AT_USERS.CHECK , payload: ret})
            browserHistory.push('/info')
        }
        })
    }
}

export function  createUser(ret){
    let user = {
        "info":{        "username": "Lotre",
                        "nom": "Ahantar",
                        "prenom": "karim",
                        "email": "k.ahantar@yahoo.fr",
                        "bio": "",
                        "sexe": "",
                        "orientation": "",
                        "age": "",
                },
        "tag":{"Sport": false,
        "Music": false,
         "Geek":false,
          "Tatouage":true,
           "Bouffe":false,
            "Etudiant":false,
             "Cinema":false,
              "Voyage":false,
               "Feigant":false,
                "Litterature":false,
                 "Shopping":false},
        "image":{"profile_picture": "../../avatar.png", "picture_1": "../../bogoss.png", "picture_2": "../../avatar.png", "picture_3": "../../avatar.png", "picture_4": "../../avatar.png"}
            }
    return function (dispatch){
        axios({ method: 'post',
        url: `${END_POINT}/users`,
        data: ret
    }).then((response) =>{
      console.log("probleme",response.data)
            })
                dispatch({type: AT_USERS.INFO_USER , payload: user})
                // if (response.data == "ok")
                     browserHistory.push('/info')
    }
}

export function  updateUser(props, event){
    console.log("PROPS", props)
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
    const formData = new FormData();
    formData.append(image, file);
    // axios.post(`${END_POINT}/upload`, formData, {
    // headers: { 'content-type': 'multipart/form-data' }
    // })
    }
}

export function readUser(id){
    console.log("")
     return function (dispatch){
        let ret = {
            "info":{        "username": "Lotre",
                            "nom": "Ahantar",
                            "prenom": "karim",
                            "email": "k.ahantar@yahoo.fr",
                            "bio": "",
                            "sexe": "",
                            "orientation": "",
                            "age": "",
                    },
            "tag":{"Sport": false,
            "Music": false,
             "Geek":false,
              "Tatouage":false,
               "Bouffe":false,
                "Etudiant":false,
                 "Cinema":false,
                  "Voyage":false,
                   "Feigant": false,
                    "Litterature":false,
                     "Shopping":false},
            "image":{"profile_picture": "../../avatar.png", "picture_1": "../../bogoss.png", "picture_2": "../../avatar.png", "picture_3": "../../avatar.png", "picture_4": "../../avatar.png"}
                }
         axios({
    method: 'get',
    url: `${END_POINT}/id`,
    params: {"id": "5a578c0431a7e9498aaa9bda"}
    })
    // .then((response) =>{

    //  }
    dispatch({type: AT_USERS.READ, payload: ret})    
    }
}