const INITAL_STATE = {id : '',email : '', pass : ''}
import { LOGIN_SUCCESS } from './../support/constant/type'

const authReducer = (state,action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
            return {...INITAL_STATE , email : action.payload.email, id: action.payload.id}
        default : 
            return INITAL_STATE  
    }
}

export default authReducer

