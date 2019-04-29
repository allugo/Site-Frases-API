import React, {Component} from 'react';
import './../css/main.css';
import {Container, Row, Col, Spinner} from 'reactstrap';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
       frase: {},
       tooltipOpen: false,
       tooltipAuthor: false,
       tooltipBook: false,
    };
  }

  render(){
    return (
        <Container fluid className="mainContainer">
            <Row className="phraseContainer">
                <Col xs='12' style={{marginTop: 20}}>
                    <Spinner style={{ width: '3rem', height: '3rem' }} color="warning" />
                </Col>
            </Row>
        </Container>
    );
  }
}

export default Loading;
