import {AT_MATCH} from '../actions/actions-types'

export default function ReducerMatch (state=[], action){
    switch(action.type){
        case AT_MATCH.WHO:
            return action.payload; // immutable
    }
    return state
}