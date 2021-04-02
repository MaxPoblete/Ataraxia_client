import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext'

const Inicio = (props) => {

    const authContext = useContext(AuthContext);
    const { authenticatedUser } = authContext;

    const token = localStorage.getItem('token')
    useEffect(()=>{
        authenticatedUser();
        if(!token){
            props.history.push('/')
        }
        
    },[token])

    return(
        <Fragment>
            desde inicio
        </Fragment>
    )
}

export default Inicio;

