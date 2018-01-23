import {AT_PROFIL} from '../actions/actions-types'

export default function ReducerProfil (state=[], action){
    switch(action.type){
        case AT_PROFIL.INFO:
            return action.payload; // immutable
        case AT_PROFIL.CHANGE:
            return action.payload; // immutable
    }
    return state
}