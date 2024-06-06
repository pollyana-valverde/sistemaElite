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

  const [linksCadastros, setLinkCadastros] = useState([
    // {
    //   caminho: "/logout",
    //   nome: "Logout",
    // }, 
    {
      caminho: "/FuncionarioCadastro",
      nome: " funcionários",
    }, {
      caminho: "/CadastroClientes",
      nome: " clientes",
    }, {
      caminho: "/FornecedorCadastro",
      nome: " fornecedor",
    }, {
      caminho: "/ProdutosCadastro",
      nome: "produtos",
    }
  ]);

  const [linksRegistros, setLinkRegistros] = useState([
    {
      caminho: "/listaUsuarios",
      nome: "usuários",
    }, {
      caminho: "/ListaFuncionario",
      nome: "funcionários",
    }, {
      caminho: "/ListaFornecedores",
      nome: "fornecedores",
    }, {
      caminho: "/ListaClientes",
      nome: "clientes",
    }, {
      caminho: "/ListaProdutos",
      nome: "produtos",
    }, {

      caminho: "/ListaVendas",
      nome: "Lista de vendas",

    }
  ]);

  const [linksContas, setLinkContas] = useState([
    {
      caminho: "/ContasReceber",
      nome: "Contas a receber",
    }, {
      caminho: "/ContasPagar",
      nome: "Contas a pagar",
    }
  ]);


  //links pro responsivo
  const [links, setLink] = useState([
    {
      caminho: "/logout",
      nome: "Logout",
    }, {
      titulo: <li className='headerLineNav'><p>Cadastrar</p></li>,
      caminho: "/FuncionarioCadastro",
      nome: " funcionários",
    }, {
      caminho: "/CadastroClientes",
      nome: " clientes",
    }, {
      caminho: "/FornecedorCadastro",
      nome: " fornecedor",
    }, {
      caminho: "/ProdutosCadastro",
      nome: "produtos",
    }, {
      titulo: <li className='headerLineNav'> <p>Registros</p></li>,
      caminho: "/listaUsuarios",
      nome: "usuários",
    }, {
      caminho: "/ListaFuncionario",
      nome: "funcionários",
    }, {
      caminho: "/ListaFornecedores",
      nome: "fornecedores",
    }, {
      caminho: "/ListaClientes",
      nome: "clientes",
    }, {
      caminho: "/ListaProdutos",
      nome: "produtos",
    }, {

      caminho: "/ListaVendas",
      nome: "Lista de vendas",

    }, {
      titulo: <li className='headerLineNav'><p>Contas</p></li>,
      caminho: "/ContasReceber",
      nome: "Contas a receber",
    }, {
      caminho: "/ContasPagar",
      nome: "Contas a pagar",
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
                        <li className='lineNavLink'><a href="/">Home</a></li>
                        <div className="bodyNavLinks">
                          <li>
                            <Accordion multiple >
                              <AccordionTab header="Cadastrar">
                                {linksCadastros.map((linkCadastro, index) => (
                                  <>
                                    <p className="m-0">

                                      <div className='lineNavLink'>
                                        <a href={linkCadastro.caminho} className='navProfile' >{linkCadastro.nome}</a>
                                      </div>
                                    </p>
                                  </>
                                ))}
                              </AccordionTab>

                              <AccordionTab header="Registros">
                                {linksRegistros.map((linkRegistro, index) => (
                                  <>
                                    <p className="m-0">

                                      <div className='lineNavLink'>
                                        <a href={linkRegistro.caminho} className='navProfile' >{linkRegistro.nome}</a>
                                      </div>
                                    </p>
                                  </>
                                ))}
                              </AccordionTab>

                              <AccordionTab header="Contas">
                                {linksContas.map((linkConta, index) => (
                                  <>
                                    <p className="m-0">
                                      <div className='lineNavLink'>
                                        <a href={linkConta.caminho} className='navProfile' >{linkConta.nome}</a>
                                      </div>
                                    </p>
                                  </>
                                ))}
                              </AccordionTab>

                            </Accordion>

                          </li>
                        </div>
                        {/* {links.map((link, index) => (
                          <>
                            {link.titulo}
                            <li className='lineNavLink'>
                              <a href={link.caminho} className='navProfile' >{link.nome}</a>
                            </li>
                          </>
                        ))} */}
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
