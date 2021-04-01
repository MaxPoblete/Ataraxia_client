import React, { useState, useContext, Fragment, useEffect } from 'react';
import { Col, Form, Button, Card, Alert, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AnimailCard from './AnimalCard';
import Header from '../layout/Header';

const animailImg = 'https://www.eltiempo.com/uploads/2019/03/09/5c83e8f21ed51.jpeg';

const ValidateAccount = () => {

    const[code, setCode] = useState({
        validationCode: ''
    });

    const onChange = e => {
        setCode({
            ...code,
            [e.target.name] : e.target.value
        })
    }

    const { validationCode } = code;

    const submitValidacion = e => {

        e.preventDefault();

        if(validationCode.trim() ===''){
            console.log(`Ingrese codigo valido`);
            return;
        }
    }

    return(
        <Fragment>
            <Container fluid>
                <Header/>
            </Container>
        <Container>
            <Row>
                <Col>
                <Card>
                        <Card.Header>Verifique su cuenta ingresando codigo de verificacion enviado a sus correo</Card.Header>
                            <Card.Body>
                                <Form
                                    onSubmit={submitValidacion}
                                >
                                    <Form.Group controlId="formBasicEmail">

                                        <Form.Label className="text-muted">
                                            Ingrese Codigo Validacion
                                        </Form.Label>

                                        <Form.Control 
                                            type="text"
                                            name="validationCode"
                                            value={validationCode}
                                            onChange={onChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicCheckbox">
                                        <Link to='/newaccount'>Crear Cuenta</Link>
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

