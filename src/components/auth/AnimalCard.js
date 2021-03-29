import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';

const AnimailCard = ({animal}) => { 
    
    return(
            <Card>
                <Card.Img 
                    className="w-auto"
                    src={animal} 
                />
                <Card.Body>
                    <Card.Title>
                        Card title
                    </Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                </Card.Body>

                <Card.Footer>
                    <small 
                        className="text-muted">
                        siguiente anima 
                    </small>
                </Card.Footer>

            </Card>
    )
}

export default AnimailCard;