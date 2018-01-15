import { combineReducers } from 'redux'
import ReducerUsers from './reducers_users'
import ReducerSearch from './reducers_search'
import ReducerResult from './reducers_result'
import {reducer as ReducerForm} from 'redux-form'

const rootReducer = combineReducers({
    users: ReducerUsers,
    form: ReducerForm,
    search: ReducerSearch,
    results: ReducerResult,
})

export default rootReducer 