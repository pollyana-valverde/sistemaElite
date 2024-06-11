//Lista de Usuarios
import React from "react";
import TabelaCadastro from "../Components/TabelaCadastro";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const ListaUsuarios = () => {
  return (
    <Container>
      <Row>
        <Col lg={10}>
          <div className="tableSistemaGeral">
            <TabelaCadastro />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ListaUsuarios;
