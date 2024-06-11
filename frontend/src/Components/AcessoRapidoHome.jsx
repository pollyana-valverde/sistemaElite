import React, { useState } from 'react';
import axios from 'axios';

import { IconField } from 'primereact/iconfield';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import '../css/acessoRapidoHome.css';

const AcessoRapidoHome = () => {
    const [acessos, setAcessos] = useState([
        {
            caminho: '/ListaAlunos',
            titulo: 'Alunos',
            quant: '280'
        },
        {
            caminho: '/ListaFuncionario',
            titulo: 'Funcionários',
            quant: '1020'
        },
        {
            caminho: '/ListaFornecedores',
            titulo: 'Fornecedores',
            quant: '500'
        },
        {
            caminho: '/ListaFuncionarioTerc',
            titulo: 'Funcionários terceirizados',
            quant: '450'
        },
    ])

    return (
        <Container>
            <Row className='acessoPai'>
                {acessos.map((acesso, index) => (
                    <>
                        <Col >
                            <div className='acesso acesso_tipoB blueLink'>
                                <div className='acessoInfo'>
                                    <p>{acesso.titulo}</p>
                                    <h3>{acesso.quant}</h3>
                                </div>
                                <a className="link" href={acesso.caminho}>
                                    <i className="pi pi-arrow-up-right"></i>
                                </a>
                            </div>
                        </Col>
                    </>
                ))}


            </Row>

        </Container>
    )
};

export default AcessoRapidoHome;