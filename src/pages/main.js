import React, {Component} from 'react';
import './../css/main.css';
import {Container, Row, Col, Tooltip} from 'reactstrap';
import Loading from './../components/loading';
import CodeModal from './../components/codeExampleModal';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
       frase: {},
       tooltipOpen: false,
       tooltipAuthor: false,
       tooltipBook: false,
       tooltipLogo: false,
       tooltipRandom: false,
       loading: false,
       modalOpen: false,
       codeString: '',
    };

    this.toggle = this.toggle.bind(this);
    this.toggleAuthor = this.toggleAuthor.bind(this);
    this.toggleBook = this.toggleBook.bind(this);
    this.toggleLogo = this.toggleLogo.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleRandom = this.toggleRandom.bind(this);
  }

  toggleLoading(){
    this.setState({loading: !this.state.loading});
  }

  async getFrase(){
    this.toggleLoading();
    
    await fetch("https://allugofrases.herokuapp.com/fraseAleatoria")
    .then((res) => res.json())
    .then((resJson) => this.setState({frase: resJson}))
    .catch((err) => alert("Epa!, Algo deu errado: " + err));

    this.toggleLoading();
  }

  toggleModal(){
    this.setState({modalOpen: !this.state.modalOpen});
  }

  componentDidMount(){
    this.getFrase();
  }

  // Tooltips Toggles.
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

  toggleLogo() {
    this.setState({
        tooltipLogo: !this.state.tooltipLogo
    });
  }

  toggleRandom() {
    this.setState({
        tooltipRandom: !this.state.tooltipRandom
    });
  }

  // Searching phrases.
  search(id, frase){
    this.setState({
      codeString: 
      `// Pelo ID da frase
await fetch("https://allugofrases.herokuapp.com/fraseid?id=` + id + `")
.then((res) => res.json())
.then((resJson) => this.setState({frase: resJson}))
.catch((err) => alert("Epa!, Algo deu errado: " + err));

// Por uma string de busca.
await fetch("https://allugofrases.herokuapp.com/procurarFrase ", {
  method: 'POST',
    headers: {'Content-Type':'application/json; charset=utf-8'},
    // Body da Requisição.
    body: JSON.stringify({
      frase: '`+ frase +`',
    })
})
.then((res) => res.json())
.then((resJson) => this.setState({autor: resJson}))
.catch((err) => alert("Epa!, Algo deu errado: " + err));
`,
      action: 'buscar uma frase',
    });
    
    this.toggleModal();
  }

  // Getting all phrases from an author.
  author(name){
    this.setState({
      codeString: 
`await fetch("https://allugofrases.herokuapp.com/frasesPorAutor", {
  method: 'POST',
  headers: {'Content-Type':'application/json; charset=utf-8'},
  // Body da Requisição.
  body: JSON.stringify({
    autor: '`+ name +`',
  })
})
.then((res) => res.json())
.then((resJson) => this.setState({frasesDoAutor: resJson}))
.catch((err) => alert("Epa!, Algo deu errado: " + err));
`,
      action: 'buscar todas as frases de um autor',
    });
    
    this.toggleModal();
  }

  // Getting all phrases from a book.
  book(title){
    this.setState({
      codeString: 
`await fetch("https://allugofrases.herokuapp.com/frasesPorLivro ", {
  method: 'POST',
    headers: {'Content-Type':'application/json; charset=utf-8'},
    // Body da Requisição.
    body: JSON.stringify({
      livro: '`+ title +`',
    })
})
.then((res) => res.json())
.then((resJson) => this.setState({frasesDoLivro: resJson}))
.catch((err) => alert("Epa!, Algo deu errado: " + err));
`,
      action: 'buscar todas as frases de um determinado livro',
    });
    
    this.toggleModal();
  }

  random(){
    this.setState({
      codeString: 
`await fetch("https://allugofrases.herokuapp.com/fraseAleatoria")
.then((res) => res.json())
.then((resJson) => this.setState({fraseAleatoria: resJson}))
.catch((err) => alert("Epa!, Algo deu errado: " + err));
`,
      action: 'retornar uma frase aleatória',
    });
    
    this.toggleModal();
  }

  render(){
    return (
        <Container fluid className="mainContainer">
          <CodeModal action={this.state.action} codeString={this.state.codeString} open={this.state.modalOpen} toggle={this.toggleModal}/>
            <Row className="header shadow">
                <Col xs='12'>
                    <a id="logo" target="_blank" href="http://instagram.com/allugo_app"><img className="logo" src={require("./../img/logo.png")} /></a>
                    <Tooltip placement="bottom" isOpen={this.state.tooltipLogo} target="logo" toggle={this.toggleLogo}>
                            Dá uma olhada no nosso trabalho!
                    </Tooltip>
                </Col>
            </Row>
            {this.state.loading ? <Loading/> : (
              <Row className="phraseContainer">
                <Col xs='12'>
                    {/* Frase */}
                    <a onClick={() => this.search(this.state.frase.id, this.state.frase.frase)} href="javascript:void(0)" id="frase">"{this.state.frase.frase}"</a>
                    <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="frase" toggle={this.toggle}>
                         Quer saber como buscar essa frase na API? Clica aí!
                    </Tooltip>
                    <Col xs='12' style={{fontSize: 18, padding: 20}} className="authorName">
                        {/* Autor - Livro */}
                        <div className="authorName">
                        - <a onClick={() => this.author(this.state.frase.autor)} id="author" href="javascript:void(0)">{this.state.frase.autor}</a> (<a onClick={() => this.book(this.state.frase.livro)} id="book" href="javascript:void(0)">{this.state.frase.livro}</a>)
                        </div>
                        <Tooltip placement="bottom" isOpen={this.state.tooltipAuthor} target="author" toggle={this.toggleAuthor}>
                         Quer buscar na API pelo autor? Clica!
                        </Tooltip>
                        <Tooltip placement="bottom" isOpen={this.state.tooltipBook} target="book" toggle={this.toggleBook}>
                            Tá afim de buscar na API por livro? Clica que eu te ensino!
                        </Tooltip>
                    </Col>
                </Col>
            </Row>
            )}
            <Row className="aleatorio">
              <Col xs='12'>
                <div className="dica">
                DICA: <b>clique em cima dos textos pra entender como funciona a API :)</b>
                </div>
                <b><a className="blackText" onClick={() => this.random()} id="random" href="javascript:void(0)">(Essa frase foi buscada aleatóriamente na API! Clica aqui pra aprender a fazer isso. Atualize a página para ver outras! :D)</a></b>
                <Tooltip placement="bottom" isOpen={this.state.tooltipRandom} target="random" toggle={this.toggleRandom}>
                    Quer aprender à pegar uma frase aleatória na API? Clica aí!
                </Tooltip>
              </Col>
            </Row>
        </Container>
    );
  }
}

export default Main;
