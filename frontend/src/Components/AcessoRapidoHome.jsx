import React, { useState } from 'react';
import axios from 'axios';

import { IconField } from 'primereact/iconfield';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {Link } from 'react-router-dom';

import '../css/acessoRapidoHome.css';

const AcessoRapidoHome = () => {

    return (
        <Container>
            <Row className='acessoPai'>
                <Col >
                    <a className="link" href="/FuncionarioCadastro">
                        <div className='acesso_tipoA blueLink'>
                            <Col><i className="pi pi-address-book border-round-lg"></i></Col>
                            <h3>Cadastrar novo funcionário</h3>
                        </div>
                    </a>


                    <a className="link" href="/ProdutosCadastro">
                        <div className='acesso_tipoB blueLink'>
                            <Col><i className="pi pi-barcode border-round-lg"></i></Col>
                            <h3>Cadastrar novo produto</h3>
                        </div>
                    </a>

                </Col>

                <Col >
                    <a className="link" href="/CadastroClientes">
                        <div className='acesso_tipoB greyLink'>
                            <Col><i className="pi pi-user border-round-lg"></i></Col>
                            <h3>Cadastrar novo cliente</h3>
                        </div>
                    </a>

                    <a className="link" href="/FornecedorCadastro">
                        <div className='acesso_tipoA greyLink'>
                            <Col><i className="pi pi-id-card border-round-lg"></i></Col>
                            <h3>Cadastrar novo fornecedor</h3>
                        </div>
                    </a>

                </Col>
            </Row>

        </Container>
    )
};

export default AcessoRapidoHome;