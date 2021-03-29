import React, { useEffect } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';

const Header = ({alert}) => {

    return(
        <Row>
            <Col xs={12} md={8} lg={6}>
                <h1><strong>Ataraxia</strong></h1>
            </Col>
            {alert?
                <Col xs={12} md={8} lg={6}>
                    <Alert variant="danger" className='m-2'>
                        <Alert.Heading>{ alert }</Alert.Heading>
                    </Alert>
                </Col>
            :
                null
            }
        </Row>
    )
}

export default Header;









