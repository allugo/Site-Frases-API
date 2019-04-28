import React, {Component} from 'react';
import './../css/main.css';
import {Container, Row, Col, Tooltip} from 'reactstrap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
       frase: 'Pode se encontrar a felicidade mesmo nas horas mais sombrias, se a pessoa se lembrar de acender a luz.',
       tooltipOpen: false,
       tooltipAuthor: false,
       tooltipBook: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleAuthor = this.toggleAuthor.bind(this);
    this.toggleBook = this.toggleBook.bind(this);
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  toggleAuthor() {
    this.setState({
        tooltipAuthor: !this.state.tooltipAuthor
    });
  }

  toggleBook() {
    this.setState({
        tooltipBook: !this.state.tooltipBook
    });
  }

  render(){
    return (
        <Container fluid className="mainContainer">
            <Row className="header shadow">
                <Col xs='3'>
                    LOGO
                </Col>
                <Col xs='8'>
                    repo
                </Col>
            </Row>
            <Row className="phraseContainer">
                <Col xs='12'>
                    <a href="javascript:void(0)" id="frase">"{this.state.frase}"</a>
                    <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="frase" toggle={this.toggle}>
                         Quer saber como buscar essa frase na API? Clica aí!
                    </Tooltip>
                    <Col xs='12' style={{fontSize: 18, padding: 20}} className="authorName">
                        - <a id="author" href="javascript:void(0)">JK Rowling</a> (<a id="book" href="javascript:void(0)">Harry Potter e o Prisioneiro de Azkaban</a>)
                        <Tooltip placement="bottom" isOpen={this.state.tooltipAuthor} target="author" toggle={this.toggleAuthor}>
                         Quer buscar na API pelo autor? Clica!
                        </Tooltip>
                        <Tooltip placement="bottom" isOpen={this.state.tooltipBook} target="book" toggle={this.toggleBook}>
                            Tá afim de buscar na API por livro? Clica que eu te ensino!
                        </Tooltip>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
  }
}

export default Main;
