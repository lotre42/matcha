import {AT_USERS} from '../actions/actions-types'

export default function ReducerUsers (state=[], action){
    console.log("ac-->",action)
    switch(action.type){
        case AT_USERS.UPDATE :
            return action.payload
        case AT_USERS.CHECK :
            return action.payload
        case AT_USERS.INFO_USER:
            return action.payload;
        case AT_USERS.INFO_TAG:
            return action.payload;
        case AT_USERS.READ:
            return action.payload;
        case AT_USERS.RESET:
            return action.payload
    }
    return state
}
