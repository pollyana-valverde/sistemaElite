import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Importar complementos aqui
import Rotas from "./Routes";

import AuthProvider from "./provider/AuthProvider";

//Importar componentes aqui
import Navegacao from "./Components/Navegacao";

import '../src/css/formulario.css';

import './css/index.css';

const App = () => {
  return (
    <>

      <AuthProvider>
      <Container fluid>
          <Row>
            <Col lg={3} md={3} sm={4}><Navegacao /></Col> 
            <Col lg={8} md={8} sm={8}><Rotas /></Col>
          </Row>
        </Container>
      </AuthProvider>

    </>
  );
};

export default App;
