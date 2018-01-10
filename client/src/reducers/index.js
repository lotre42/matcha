import { combineReducers } from 'redux'
import ReducerUsers from './reducers_users'
import ReducerTag from './reducers_tag'
import ReducerImg from './reducers_img'
import {reducer as ReducerForm} from 'redux-form'

const rootReducer = combineReducers({
    users: ReducerUsers,
    form: ReducerForm,
    // tags: ReducerTag,
    // img: ReducerImg,
})

export default rootReducer 