//Lista de fornecedores
import React from "react";
import TabelaCliente from "../Components/TabelaAlunos";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const ListaClientes = () => {
  return (
    <Container>
      <Row>
        <Col lg={10}>
          <div className="tableSistemaGeral">
            <TabelaCliente />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ListaClientes;
