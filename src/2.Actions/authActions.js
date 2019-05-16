import { LOGIN_SUCCESS } from './../support/constant/type'


export const onLoginSuccess = (email,uid) => {
    return{
        // id dari reducer
        type : LOGIN_SUCCESS ,
        payload : {
            email : email,
            id : uid
        }
    }
}