//Lista de fornecedores
import React from "react";
import TabelaFornecedor from "../Components/TabelaFornecedor";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const ListaFornecedores = () => {
  return (
    <Container>
      <Row>
        <Col lg={10}>
          <div className="tableSistemaGeral">
            <TabelaFornecedor />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ListaFornecedores;
