import React, { useState } from 'react';

import { useAuth } from '../provider/AuthProvider';

import PerfilFoto from '../imagens/logoGeneralMotors.png';
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
      nome: "Home",
    },
    // {
    //   caminho: "/logout",
    //   nome: "Logout",
    // }, 
    {
      caminho: "/listaUsuarios",
      nome: "usuários",
    }, {
      caminho: "/ListaFuncionario",
      nome: "Lista de funcionários",
    }, {
      caminho: "/ListaFuncionarioTerc",
      nome: "Lista de funcionários Terceirizados",
    }, {
      caminho: "/ListaFornecedores",
      nome: "fornecedores",
    }, {
      caminho: "/ListaAlunos",
      nome: "Alunos",
    }, {
      caminho: "/Boletim",
      nome: "Boletim Escolar",

    },{
      titulo: <li className='headerLineNav'><p>Contas</p></li>,
      caminho: "/ContasReceber",
      nome: "Contas a receber",
    }, {
      caminho: "/Boletim",
      nome: "Boletim Escolar",
    }
  ]);



  return (
    <>
      <Container fluid>
        <Row>
          {token ? (
            <>
              <Col lg={2} md={2} sm={1}>
                <header>
                  <nav className='sideBar' >
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
