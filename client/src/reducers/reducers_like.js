import {AT_INFOLIKE, AT_WHOLIKE} from '../actions/actions-types'

export function ReducerLike (state=[], action){
    switch(action.type){
        case AT_WHOLIKE.WHO:
            return action.payload; // immutable
    }
    return state
}

export function ReducerinfoLike (state=[], action){
    switch(action.type){
        case AT_INFOLIKE.INFO:
            return action.payload; // immutable
    }
    return state
}