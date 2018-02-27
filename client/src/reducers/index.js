import { combineReducers } from 'redux'
import ReducerUsers from './reducers_users'
import ReducerSearch from './reducers_search'
import ReducerResult from './reducers_result'
import ReducerView from './reducers_view'
import ReducerMatch from './reducers_match'
import { ReducerLike, ReducerinfoLike } from './reducers_like'
import ReducerProfil from './reducers_profil'
import {reducer as ReducerForm} from 'redux-form'
import { ReducerAllMessage, ReducerLoadMessage, ReducerWhoMessage, ReducerIdMessage } from './reducers_message';

const rootReducer = combineReducers({
    users: ReducerUsers,
    form: ReducerForm,
    search: ReducerSearch,
    results: ReducerResult,
    like: ReducerLike,
    infolike: ReducerinfoLike,
    view: ReducerView,
    match: ReducerMatch,
    profil: ReducerProfil,
    loadmessage: ReducerLoadMessage,
    allmessage: ReducerAllMessage,
    whomessage: ReducerWhoMessage,
    idmessage: ReducerIdMessage
})

export default rootReducer 