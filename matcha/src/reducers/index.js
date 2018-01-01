import { combineReducers } from 'redux'
import ReducerUsers from './reducers_users'
import ReducerTag from './reducers_tag'
import {reducer as ReducerForm} from 'redux-form'

const rootReducer = combineReducers({
    users: ReducerUsers,
    form: ReducerForm,
    tag: ReducerTag,
})

export default rootReducer 