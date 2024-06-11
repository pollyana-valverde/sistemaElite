//Lista de Usuarios
import React from "react";
import TabelaFuncionarioTercerizado from "../Components/TabelaFuncionarioTerc";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const ListaFuncionario = () => {
  return (
    <Container>
      <Row>
        <Col lg={10}>
          <div className="tableSistemaGeral">
            <TabelaFuncionarioTercerizado />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ListaFuncionario;
