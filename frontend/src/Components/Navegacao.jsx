import React, { useState } from 'react';

import { useAuth } from '../provider/AuthProvider';

import PerfilFoto from '../imagens/Branco e Quadrado Preto Imobiliária Logotipo.png';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';

import '../css/navegacao.css';

import { Container, Row, Col } from 'react-bootstrap'

import Rotas from "../Routes";

// function navAct = 

const Header = () => {
  const [visible, setVisible] = useState(false);

  const { token } = useAuth();
  const [links, setLink] = useState([
    {
      titulo: <li className='headerLineNav'> <p></p></li>,
      caminho: "/",
      nome: "Dashboard",
    },
    {
      caminho: "/listaUsuarios",
      nome: "Usuários",
    }, {
      caminho: "/ListaFuncionario",
      nome: "Funcionários",
    }, {
      caminho: "/ListaFuncionarioTerc",
      nome: "Funcionários Terceirizados",
    }, {
      caminho: "/ListaFornecedores",
      nome: "Fornecedores",
    }, {
      caminho: "/ListaAlunos",
      nome: "Alunos",
    }, {
      caminho: "/Boletim",
      nome: "Boletim Escolar",

    }, {
      titulo: <li className='headerLineNav'><p>Contas</p></li>,
      caminho: "/ContasReceber",
      nome: "Contas a receber",
    }, {
      caminho: "/ListaContasAPagar",
      nome: "Contas a pagar",
    }
  ]);

  return (
    <>
      <Container fluid>
        <Row>
          {token ? (
            <>
              <Col lg={2} md={1} sm={1}>
                <header>
                  <nav className='sideBar' >
                    <ul className='sideNavContent'>
                      <div>
                        <li className='navProfile'>
                          <img src={PerfilFoto} alt='logo da GM' />
                          <div className='navProfileInfo'>
                            <h4>Elite School</h4>
                          </div>
                        </li>
                        {links.map((link, index) => (
                          <>
                            {link.titulo}
                            <li className='lineNavLink'>
                              <a href={link.caminho} className='navProfile' >{link.nome}</a>
                            </li>
                          </>
                        ))}
                      </div>
                    </ul>
                  </nav>
                </header>

                <div className="card flex justify-content-center sideBarResponsivo">
                  <Sidebar visible={visible} onHide={() => setVisible(false)}>
                    <header>

                      <ul className='sideNavContent'>
                        <div>
                          <li className='navProfile'>
                            <img src={PerfilFoto} alt='logo da GM' />
                            <div className='navProfileInfo'>
                              <p>Administrador</p>
                              <h5>{token}</h5>
                            </div>
                          </li>
                          {links.map((link, index) => (
                            <>
                              {link.titulo}
                              <li className='lineNavLink'>
                                <a href={link.caminho} className='navProfile' >{link.nome}</a>
                              </li>
                            </>
                          ))}
                        </div>
                      </ul>

                    </header>

                  </Sidebar>
                  <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
                </div>
              </Col>
              <Col lg={8} md={8} sm={12}><Rotas /></Col>

            </>
          ) : (
            <Rotas />
          )}
        </Row>
      </Container>
    </>
  );
};

export default Header;
