import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Col, Form, Button, Card, CardDeck } from 'react-bootstrap';
import AnimailCard from './AnimalCard';
import { Redirect } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const animailImg = 'https://www.institutoorl-iom.com/wp-content/uploads/2016/06/buho-1024x768-1024x520@2x.jpg';

const NewAccount = () => {

    const authContext = useContext(AuthContext);
    const { createUser, changesNewAccount, authenticated, message } = authContext;

    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const[RedirigirInicio, setRedirigirInicio] = useState(false);

    useEffect(() => {
        if(authenticated) {
            setRedirigirInicio(true);
        }
        if(message){
            showAlert(message.msg, 'alert-error');
        }
        // eslint-disable-next-line
    }, [ message, authenticated]);

    const[newAccount, setNewAccount] = useState({
        name:'',
        email:'',
        password:''
    });

    const onChange  = (e) => {
        setNewAccount({
            ...newAccount,
            [e.target.name] : e.target.value
        })
    }

    const{ name, email, password } = newAccount;

    const rest = () => {
        setNewAccount({
            name:'',
            email:'',
            password:''
        })
    }

    const submitNewAccount = e => {

        e.preventDefault();

        if(name.trim() === ''){
            showAlert('ingrese nombre','alert-Error')
            return;
        }
        if(email.trim() === ''){
            showAlert('ingrese email','alert-error')
            return;
        }
        if(password.trim() === ''){
            showAlert('ingrese Password','alert-error');
            return;
        }
        createUser(newAccount);
        rest();
    }

    if(RedirigirInicio) return <Redirect to='/inicio'/>
    
    return(
        <Fragment>
            <Col xs={12} md={8} lg={6}>
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
                                <a href='#' onClick={()=>changesNewAccount()}>Login</a>
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
        </Fragment>
    );
}

export default NewAccount;