import {AT_SEARCH} from '../actions/actions-types'

export default function ReducerResult (state=[], action){
    console.log("action", action.payload)
    switch(action.type){
        case AT_SEARCH.UPDATE:
            return action.payload; // immutable
    }
    return state
}