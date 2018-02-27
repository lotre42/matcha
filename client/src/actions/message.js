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
        let token = localStorage.getItem('token'); 
        axios({ method: 'get',
        url: `${END_POINT}/updatemessage`,
        params: value,
        headers: { 'Authorization': token }
        }).then((response) =>{
            console.log("res", response.data)
            dispatch({type: AT_MESSAGE.ALL, payload: response.data})
        })
    }
}

export let updateMessage = (message, e, receveur) => {
    e.preventDefault()
    let token = localStorage.getItem('token');
    let send = {token, receveur, message}
    const socket = socketIOClient(END_POINT)
    socket.emit('message', send)
    return function (dispatch){
        dispatch({type: AT_MESSAGE.ALL, payload: message})
    }
}