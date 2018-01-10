import {AT_IMG} from '../actions/actions-types'
export default function ReducerTag (state=[], action){
    // console.log("action", action.payload)
    switch(action.type){
        case AT_IMG.UPDATE:
            return action.payload; // immutable
        case AT_IMG.INFO:
            return action.payload; // immutable
        case AT_IMG.READ:
            return action.payload; // immutable
    }
    return state
}