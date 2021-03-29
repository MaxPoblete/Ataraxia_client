import { useReducer } from "react";
import AuthContext from  './authContext';
import AuthReducer from './authReducer';
import clientAxios from '../../config/axios';

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    CHANGES_NEW_ACCOUNT
} from '../../types/index'

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: false,
        user: '',
        message: '',
        newAccount: false
    }

    const[ state, dispatch ] = useReducer(AuthReducer, initialState);

    const changesNewAccount = () => {

        dispatch({
            type:CHANGES_NEW_ACCOUNT
        })
    }

    const createUser = async dataUser => {
        try{
            const response = await clientAxios.post('/api/user', dataUser)
           
            console.log(response.data);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: response.data
            })
            
        }catch(error){
            console.log(error.response.data.msg)
          const  alert = {
                msg : error.response.data.msg,
                category: 'alert-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alert
            })
        }
    }

    const loginAccount = () => {
        try{

        }catch(error){

        }
    }

    return(
        <AuthContext.Provider
        value={{
            createUser,
            changesNewAccount,
            newAccount: state.newAccount,
            authenticated : state.authenticated,
            message : state.message
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;

