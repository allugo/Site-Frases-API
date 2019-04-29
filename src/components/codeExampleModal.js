import React, {Component} from 'react';
import './../css/codeExampleModal.css';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierHeathDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

class CodeModal extends Component {
  constructor(props) {
    super(props);
  }

  render(){

    return (
        <div style={{backgroundColor: 'blue'}}>
        <Modal backdrop centered size="lg" isOpen={this.props.open} toggle={this.props.toggle} className="modalMain">
          <ModalBody className="modalCode">
          <div className="textModal">
            Esse foi o código que usamos para {this.props.action} (utilizando Javascript/React):
          </div>              
          <br/>
          <SyntaxHighlighter wrapLines showLineNumbers  language='javascript' style={atelierHeathDark}>
            {this.props.codeString}
          </SyntaxHighlighter>
          <div className="textModal">
          O repositório se encontra: <a target="blank_" href="https://github.com/allugo/Frases-Livros-API"><b>aqui!</b></a>
          </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CodeModal;
