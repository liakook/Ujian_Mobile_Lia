// karena reducers bisa lebih dari satu maka hrs ditampung di index.js

import AuthReducer from './authReducer'
import { combineReducers } from 'redux'


export default combineReducers({
    auth : AuthReducer
})