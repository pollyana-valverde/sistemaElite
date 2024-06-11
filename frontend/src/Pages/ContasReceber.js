//Lista de Usuarios
import React from "react";
import TabelaContasReceber from "../Components/TabelaContasReceber";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const ContasReceber = () => {
  return (
    <Container>
      <Row>
        <Col lg={10}>
          <div className="tableSistemaGeral">
            < TabelaContasReceber />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContasReceber;
