import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, CardDeck } from 'react-bootstrap';
import Login from  './Login';
import NewAccount from './NewAccount';

import AuthContext from '../../context/auth/authContext';

const Auth = () => {

    const authContext = useContext(AuthContext);
    const { newAccount } = authContext;

    return(
        <Container fluid>
            <Row>
                <Col>
                    <h1><strong>Ataraxia</strong></h1>
                </Col>
            </Row>
            <Row>
                {newAccount?
                    <NewAccount/>
                :
                    <Login/>
                }
            </Row>
        </Container>
    )
}
export default Auth;
