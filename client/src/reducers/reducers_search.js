import {AT_SEARCH} from '../actions/actions-types'

export default function ReducerSearch (state=[], action){
    console.log("action", action.payload)
    switch(action.type){
        case AT_SEARCH.INFO:
            return action.payload; // immutable
    }
    return state
}