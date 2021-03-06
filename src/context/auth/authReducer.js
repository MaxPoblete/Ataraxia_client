import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_ERROR,
    GET_USER,
    LOGIN_SUCCESSFUL,
    CODE_SUSCCESSFUL,
    CODE_ERROR
} from '../../types/index'

export default (state, action) => {
    
    switch(action.type){

        case REGISTRO_EXITOSO:
        case LOGIN_SUCCESSFUL:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                authenticated: true,
                message: null,
            }
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                message: action.payload,
                token: null
            }
        case GET_USER:
            return{
                ...state,
                user : action.payload
            }  
        case CODE_SUSCCESSFUL:
            return{
                ...state,
                validateCode : true
            }
        case CODE_ERROR:
            return{
                ...state,
                message : action.payload
            }
    }
}


