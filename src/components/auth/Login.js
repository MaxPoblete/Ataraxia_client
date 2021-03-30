import React, { useState, useContext, Fragment, useEffect } from 'react';
import { Col, Form, Button, Card, Alert, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AnimailCard from './AnimalCard';
import Header from '../layout/Header';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const animailImg = 'https://img.huffingtonpost.com/asset/5c8ad782230000d50423cebe.jpeg?ops=scalefit_630_noupscale';

const Login = (props) => {

    const authContext = useContext(AuthContext);
    const { changesNewAccount, authenticated, message } = authContext;

    const alertContext = useContext(AlertContext);
    const { showAlert, alert } = alertContext;

    useEffect(() => {
        if(authenticated) {
             props.history.push('/inicio');
        }
        if(message){
            showAlert(message.msg, 'alert-error');
        }
        // eslint-disable-next-line
    }, [message, authenticated, props.history]);

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
            showAlert('ingrese email', 'alert-error')
            return;
        }
        if(password.trim() === ''){
            showAlert('ingrese password', 'alert-error');
            return;
        }
        console.log('datos correctos ...!');
      
    }

    return(
        <Fragment>
            <Container fluid>
                <Header/>
            </Container>
            <Container>
                <Row>
                    <Col xs={12} md={8} lg={6}>
                        {alert?
                            <Alert variant="danger" className=''>
                                <div className={`alerta ${alert.categoty}`}> {alert.msg} </div>
                            </Alert>
                        :
                            null
                        }
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
                                        <Link to='/newaccount'>Crear Cuenta</Link>
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
                </Row>
            </Container>
        </Fragment>
    )
}
export default Login;





