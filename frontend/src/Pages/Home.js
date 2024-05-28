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

import '../css/home.css';


function Home() {
  return (
    <Container className="homeConteiner">
<h1>Bem-vindo ...!</h1>
      <Row>
        <Col >
          <AcessoRapidoHome />
          <ChartClienteHome />
        </Col>
        <Col >
          <ChartVendasHome />
          <Col className="d-flex">
            <ContaPagarHome />
            <ContaReceberHome />
          </Col>
        </Col>
      </Row>

    </Container>
  );
};

export default Home;
