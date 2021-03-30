import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Col, Form, Button, Card, Alert, Row, Container } from 'react-bootstrap';
import AnimailCard from './AnimalCard';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';

import  passwordValidator from 'password-validator';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const animailImg = 'https://www.institutoorl-iom.com/wp-content/uploads/2016/06/buho-1024x768-1024x520@2x.jpg';

const NewAccount = (props) => {

    const authContext = useContext(AuthContext);
    const { createUser, authenticated, message } = authContext;

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
    }, [ message, authenticated, props.history]);

    const[newAccount, setNewAccount] = useState({
        name:'',
        email:'',
        password:'',
        checkPassword:''
    });

    const onChange  = (e) => {
        setNewAccount({
            ...newAccount,
            [e.target.name] : e.target.value
        })
    }

    const{ name, email, password, checkPassword } = newAccount;

    const rest = () => {
        setNewAccount({
            name:'',
            email:'',
            password:'',
            checkPassword:''
        })
    }

    const submitNewAccount = e => {

        e.preventDefault();

        if(name.trim() === '' ){
            showAlert('Campo Nombre Es Obligatorio','alert-Error')
            return;
        }
        if(email.trim() === '' ){
            showAlert('Campo Email es Obligatorio','alert-Error')
            return;
        }
        if(password.trim() === '' ){
            showAlert('Campo Password Es Obligatorio','alert-Error')
            return;
        }

        const ValidatePassword = new passwordValidator();
        
        ValidatePassword
            .is().min(6)                                    
            .is().max(20)                                  
            .has().uppercase()                              
            .has().lowercase()                              
            .has().digits(1)                                
            .has().not().spaces()                           
            .is().not().oneOf(['Passw0rd', 'Password123']);

        const listError = ValidatePassword.validate(password, { list: true });
            
        if(listError.length > 0){
            showAlert(`El Password "${password}" es Inseguro, sige estos Ejemplos : Passw0rd , Password123`,`alert-error`);
            return;
        }

        if(checkPassword.trim() === '' ){
            showAlert('Campo Confirmar Es Obligatorio','alert-Error')
            return;
        }

        if(checkPassword !== password){
            showAlert('Password no Coinciden','alert-Error')
            return;
        }

        createUser(newAccount);
 
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
                                    className='m-2'
                                    onSubmit={submitNewAccount}
                                >
                                    <Form.Group controlId="formBasicEmail">
                                    <Form.Label className="text-muted">
                                        Ingrese Nombre
                                    </Form.Label>

                                    <Form.Control 
                                        type="name"
                                        name="name"
                                        value={name}
                                        onChange={onChange}
                                    />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">

                                        <Form.Label className="text-muted">
                                            Ingrese Email
                                        </Form.Label>

                                        <Form.Control 
                                            maxLength={20}
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={onChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label className="text-muted">
                                            Ingrese Password
                                        </Form.Label>

                                        <Form.Control 
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={onChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label className="text-muted">
                                            Confirmar Password
                                        </Form.Label>

                                        <Form.Control 
                                            type="checkPassword"
                                            name="checkPassword"
                                            value={checkPassword}
                                            onChange={onChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicCheckbox">
                                        <Link to='/'>Ir Login</Link>
                                    </Form.Group>

                                    <Button 
                                        variant="primary" 
                                        type="submit">
                                        Crear Cuenta
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
    );
}

export default NewAccount;


