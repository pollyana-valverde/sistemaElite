//Lista de Usuarios
import React from "react";
import TabelaBoletim from "../Components/TabelaBoletim";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const ContasPagar = () => {
  return (
    <Container>
      <Row>
        <Col lg={10}>
          <div className="tableSistemaGeral">
            <TabelaBoletim />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContasPagar;
