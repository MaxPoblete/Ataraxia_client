import { useReducer } from "react";
import AuthContext from  './authContext';
import AuthReducer from './authReducer';
import clientAxios from '../../config/axios';
import  tokenAuth  from '../../config/token';

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_ERROR,
    GET_USER
} from '../../types/index'

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: false,
        user: '',
        message: '',
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
        console.log(token);
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

    return(
        <AuthContext.Provider
        value={{
            createUser,
            newAccount: state.newAccount,
            authenticated : state.authenticated,
            message : state.message
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;

