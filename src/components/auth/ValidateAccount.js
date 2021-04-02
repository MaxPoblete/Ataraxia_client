import React, { useState, useContext, Fragment, useEffect } from 'react';
import { Col, Form, Button, Card, Alert, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AnimailCard from './AnimalCard';
import Header from '../layout/Header';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { propTypes } from 'react-bootstrap/esm/Image';

const animailImg = 'https://www.eltiempo.com/uploads/2019/03/09/5c83e8f21ed51.jpeg';

const ValidateAccount = (props) => {

    const alertContext = useContext(AlertContext);
    const { showAlert, alert } = alertContext;

    const authContext = useContext(AuthContext);
    const { checkValidateCode, message, validateCode } = authContext;

    const existToken  = localStorage.getItem('token');

    console.log(existToken);

    useEffect(()=> {
        if(!existToken){
            props.history.push('/newaccount');
        }
        if(message){
            showAlert(message.msg, message.categoty)
        }
        if(validateCode){
            props.history.push('/inicio');
        }
    },[validateCode, message, existToken, props.history])

    const[validationCode, setCode] = useState({
        code: ''
    });

    const onChange = e => {
        setCode({
            ...validationCode,
            [e.target.name] : e.target.value
        })
    }

    const { code } = validationCode;

    const submitValidacion = e => {

        e.preventDefault();

        if(code.trim() ===''){
            showAlert('Ingrese Codigo de validacion', 'alert-error')
            return;
        }
        if(code.length !==5 ){
            showAlert('Codigo debe Contener 5 Numeros enteros', 'alert-error')
            return;
        }
        if(isNaN(code) === true){
            showAlert('Ingrese Solo Valores Numericos', 'alert-error')
            return;
        }
        checkValidateCode(validationCode);
    }

    return(
        <Fragment>
            <Container fluid>
                <Header/>
            </Container>
        <Container>
            <Row>
                <Col>
                {alert?
                    <Alert variant="danger" className=''>
                        <div className={`alerta ${alert.categoty}`}> {alert.msg} </div>
                    </Alert>
                :
                     null
                }
                <Card>
                        <Card.Header>Verifique su cuenta ingresando codigo de verificacion enviado a su correo</Card.Header>
                            <Card.Body>
                                <Form
                                    onSubmit={submitValidacion}
                                >
                                    <Form.Group controlId="formBasicEmail">

                                        <Form.Label className="text-muted">
                                            Ingrese Codigo Validacion
                                        </Form.Label>

                                        <Form.Control
                                            maxLength={5} 
                                            type="text"
                                            name="code"
                                            value={code}
                                            onChange={onChange}
                                        />
                                    </Form.Group>

                                    <Button 
                                        variant="primary" 
                                        type="submit">
                                        Validar
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

export default ValidateAccount;

