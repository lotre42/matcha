import {AT_MESSAGE} from '../actions/actions-types'

export function ReducerLoadMessage (state=[], action){
    switch(action.type){
        case AT_MESSAGE.LOAD:
            return action.payload; // immutable
    }
    return state
}

export function ReducerAllMessage (state=[], action){
    switch(action.type){
        case AT_MESSAGE.ALL:
            return action.payload; // immutable
    }
    return state
}

export function ReducerWhoMessage (state=[], action){
    switch(action.type){
        case AT_MESSAGE.WHO:
            return action.payload; // immutable
    }
    return state
}

export function ReducerIdMessage (state=[], action){
    switch(action.type){
        case AT_MESSAGE.ID:
            return action.payload; // immutable
    }
    return state
}