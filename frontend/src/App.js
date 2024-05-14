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

const App = () => {
  return (
    <>

      <AuthProvider>
      <Container fluid>
          <Row>
            <Col lg={3}><Navegacao /></Col> 
            <Col lg={8}><Rotas /></Col>
          </Row>
        </Container>
      </AuthProvider>

    </>
  );
};

export default App;
