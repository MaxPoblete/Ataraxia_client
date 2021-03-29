import React, { useState, useContext, Fragment } from 'react';
import { Container, Row, Col, Form, Button, Card, CardDeck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AnimailCard from './AnimalCard';

import AuthContext from '../../context/auth/authContext';

const animailImg = 'https://img.huffingtonpost.com/asset/5c8ad782230000d50423cebe.jpeg?ops=scalefit_630_noupscale';

const Login = () => {


    const authContext = useContext(AuthContext);
    const { changesNewAccount } = authContext;

    const[login, setLogin] = useState({
        email:'',
        password:''
    });

    const onChange  = (e) => {
        setLogin({
            ...login,
            [e.target.name] : e.target.value
        })
    }

    const{ email, password } = login;

    const submitLogin = e => {

        e.preventDefault();
        if(email.trim() === ''){
            console.log('ingrese email')
            return;
        }
        if(password.trim() === ''){
            console.log('ingrese Password');
            return;
        }
        console.log('datos correctos ...!');
      
    }

    return(
             <Fragment>
                <Col xs={12} md={8} lg={6}>
                    <Card>
                        <Card.Header>Formulario Login</Card.Header>
                        <Card.Body>
                            <Form
                                onSubmit={submitLogin}
                            >
                                <Form.Group controlId="formBasicEmail">

                                    <Form.Label className="text-muted">
                                        Ingrese Email
                                    </Form.Label>

                                    <Form.Control 
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label className="text-muted">
                                        Ingrese password
                                    </Form.Label>

                                    <Form.Control 
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicCheckbox">
                                <a href='#' onClick={()=>changesNewAccount()}>Crear Cuenta</a>
                                </Form.Group>

                                <Button 
                                    variant="primary" 
                                    type="submit">
                                    Ingresar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4} lg={6} >
                    <AnimailCard animal={animailImg}/>
                </Col>
            </Fragment>
    )
}
export default Login;





