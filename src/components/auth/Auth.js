import React, { useState, useContext, Fragment, useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Login from  './Login';
import NewAccount from './NewAccount';
import Header from '../layout/Header';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Auth = () => {

    const authContext = useContext(AuthContext);
    const { newAccount } = authContext;

    const alertContext = useContext(AlertContext);
    const { alert} = alertContext;

    return(
        <Fragment>
            <Container fluid>
                <Header alert={alert}/>
            </Container>
            <hr/>
            <Container>
                <Row>
                    {newAccount?
                        <NewAccount/>
                    :
                        <Login/>
                    }
                </Row>
            </Container>
        </Fragment>
    )
}
export default Auth;


