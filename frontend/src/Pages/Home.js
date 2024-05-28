// Home
import React from "react";

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import AcessoRapidoHome from "../Components/AcessoRapidoHome";
import ChartClienteHome from "../Components/ChartClienteHome";
import ChartVendasHome from "../Components/ChartVendasHome";
import ContaPagarHome from "../Components/ContaPagarHome";
import ContaReceberHome from "../Components/ContaReceberHome";

import { useAuth } from '../provider/AuthProvider';

import '../css/home.css';


function Home() {
  const { token } = useAuth();

  return (
    <Container className="homeConteiner">
<h1>Bem-vindo(a) {token}!</h1>
      <Row>
        <Col >
          <AcessoRapidoHome />
          <ChartClienteHome />
        </Col>
        <Col >
          <ChartVendasHome />
          <Col lg={12} className="d-flex wrapTablesHome">
            <ContaPagarHome />
            <ContaReceberHome />
          </Col>
        </Col>
      </Row>

    </Container>
  );
};

export default Home;
