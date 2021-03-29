import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    CHANGES_NEW_ACCOUNT
} from '../../types/index'

export default (state, action) => {
    
    switch(action.type){

        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token)
            return{
                ...state,
                authenticated: true,
                mensaje: null,
            }
        case CHANGES_NEW_ACCOUNT:
            return{
                ...state,
                newAccount : state.newAccount === true? false : true
            }
    }

}