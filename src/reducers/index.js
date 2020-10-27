import { combineReducers } from 'redux'
import userReducer from './userReducer'
import newUserReducer from './newUserReducer'
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    list: userReducer,
    newUser: newUserReducer,
    form: formReducer
})

export default rootReducer;

