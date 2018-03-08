import axios from 'axios'
import {AT_MESSAGE} from './actions-types'
import {browserHistory} from 'react-router'
import socketIOClient from 'socket.io-client'
const END_POINT = "http://localhost:3000"


export let loadMessage = (value) => {
    return function (dispatch){
        dispatch({type: AT_MESSAGE.LOAD, payload: value})
    }
}

export let updateReceveur = (value) => {
    return function (dispatch){
        localStorage.setItem('who', value);
        let token = localStorage.getItem('token'); 
        axios({ method: 'get',
        url: `${END_POINT}/updatemessage`,
        params: value,
        headers: { 'Authorization': token }
    }).then((response) =>{
        dispatch({type: AT_MESSAGE.ALL, payload: response.data})
        dispatch({type: AT_MESSAGE.WHO, payload: value})
        dispatch({type: AT_MESSAGE.VIA, payload: 1})                  
    })
}
}

export let updateMessage = (allmessage, message, e, receveur, id_envoyeur) => {
    e.preventDefault()
    console.log("coucou les avan")
    allmessage.push({message, id_envoyeur})
    let token = localStorage.getItem('token');
    let send = {token, receveur, message}
    const socket = socketIOClient(END_POINT)
    socket.emit('messages', send) 
    return function (dispatch){
        dispatch({type: AT_MESSAGE.ALL, payload: allmessage})        
        dispatch({type: AT_MESSAGE.WHO, payload: receveur})
    }
}

export let updateSocketMessage = (allmessage, message, receveur, id_envoyeur) => {
    allmessage.push({message, id_envoyeur})
    return function (dispatch){
        dispatch({type: AT_MESSAGE.ALL, payload: allmessage})
        // dispatch({type: AT_MESSAGE.WHO, payload: envoyeur})
    }
}

export let profilMessage = (id, idmessage) => {
    return function (dispatch){
        if (idmessage.indexOf(id) == -1){
            idmessage.push(id)
            localStorage.setItem('idmessage', idmessage);            
        }
        dispatch({type: AT_MESSAGE.ID, payload: idmessage})
        dispatch({type: AT_MESSAGE.VIA, payload: 1})
        setTimeout(() => {
            browserHistory.push('/messages')  
        }, 200);       
        // dispatch({type: AT_MESSAGE.WHO, payload: envoyeur})
    }
}

export let viaMenu = () => {
    console.log("mahaza")
    return function (dispatch){
        dispatch({type: AT_MESSAGE.VIA, payload: 0})
        browserHistory.push('/messages')    
    }
}