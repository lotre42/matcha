import {AT_SEARCH, AT_LIKE} from '../actions/actions-types'

export default function ReducerLike (state=[], action){
    switch(action.type){
        case AT_LIKE.WHO:
            return action.payload; // immutable
    }
    return state
}