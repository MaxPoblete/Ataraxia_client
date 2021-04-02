import { useReducer } from "react";
import AuthContext from  './authContext';
import AuthReducer from './authReducer';
import clientAxios from '../../config/axios';
import  tokenAuth  from '../../config/token';

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_ERROR,
    GET_USER,
    LOGIN_SUCCESSFUL,
    CODE_ERROR,
    CODE_SUSCCESSFUL
} from '../../types/index'

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: false,
        user: localStorage.getItem('user'),
        message: '',
        validateCode: false
    }

    const[ state, dispatch ] = useReducer(AuthReducer, initialState);

    const createUser = async dataUser => {
        try{
            const response = await clientAxios.post('/api/user', dataUser)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: response.data
            })
            
            //obtener usuario autenticado
            authenticatedUser();
        }catch(error){
          const  alert = {
                msg : error.response.data.msg,
                category: 'alert-error',
        }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alert
            })
        }
    }

    const authenticatedUser = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try{
            const response = await clientAxios.get('/api/auth')
            dispatch({
                type: GET_USER,
                payload: response.data.usuario
            })
        }catch(error){
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    const loginUser = async (datos) => {
        try {
            const respuesta = await clientAxios.post('/api/auth', datos);
            
            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: respuesta.data
            });

            // Obtener el usuario
            authenticatedUser();
        } catch (error) {
            console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    const checkValidateCode = async code => {

        try{
            console.log(code);
            const response = await clientAxios.post('/api/user/check', code)
            console.log(response.data.msg);
            dispatch({
                type: CODE_SUSCCESSFUL
            })
        }catch(error){
            console.log(error.response.data.msg);
            const alert = {
                msg : error.response.data.msg,
                category : 'alerta-error'
            }
            dispatch({
                type: CODE_ERROR,
                payload : alert
            })
        }
    }

    return(
        <AuthContext.Provider
        value={{
            createUser,
            loginUser,
            checkValidateCode,
            authenticatedUser,
            newAccount: state.newAccount,
            authenticated : state.authenticated,
            message : state.message,
            user: state.user,
            validateCode : state.validateCode
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;

