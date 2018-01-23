import {AT_VIEW} from '../actions/actions-types'

export default function ReducerView (state=[], action){
    switch(action.type){
        case AT_VIEW.WHO:
            return action.payload; // immutable
    }
    return state
}