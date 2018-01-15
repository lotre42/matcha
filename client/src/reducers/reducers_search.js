import {AT_SEARCH} from '../actions/actions-types'

export default function ReducerSearch (state=[], action){
    switch(action.type){
        case AT_SEARCH.INFO:
            return action.payload; // immutable
    }
    return state
}