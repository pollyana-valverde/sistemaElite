//Lista de Usuarios
import React from "react";
import TabelaProdutos from "../Components/TabelaContasAPagar";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const ListaProdutos = () => {
  return (
    <Container>
      <Row>
        <Col lg={10}>
          <div className="tableSistemaGeral">
            <TabelaProdutos />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ListaProdutos;
