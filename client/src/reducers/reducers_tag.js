import {AT_TAG} from '../actions/actions-types'
export default function ReducerTag (state=[], action){
    // console.log("action", action.payload)
    switch(action.type){
        case AT_TAG.UPDATE:
            return action.payload; // immutable
        case AT_TAG.INFO:
            return action.payload; // immutable
        case AT_TAG.READ:
            return action.payload; // immutable
    }
    return state
}