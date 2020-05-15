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
        <Container fluid className="mainContainer" style={{ flex: 2.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner style={{ width: '3rem', height: '3rem'}} color="warning" />
        </Container>
    );
  }
}

export default Loading;
