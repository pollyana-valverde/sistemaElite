import React, { useState } from 'react';

import { useAuth } from '../provider/AuthProvider';

import PerfilFoto from '../imagens/logoGeneralMotors.png';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

import '../css/navegacao.css';

import { Container, Row, Col } from 'react-bootstrap'

import Rotas from "../Routes";

// function navAct = 

const Header = () => {
  const [visible, setVisible] = useState(false);

  const { token } = useAuth();

  const [links, setLink] = useState([
    {
      titulo: <li className='headerLineNav'><p>Main</p></li>,
      caminho: "/",
      nome: "Home",
    }, {
      caminho: "/logout",
      nome: "Logout",
    }, {
      titulo: <li className='headerLineNav'><p>Cadastrar</p></li>,
      caminho: "/FuncionarioCadastro",
      nome: "Cadastrar funcionários",
    }, {
      caminho: "/FuncionarioTercCadastro",
      nome: "Cadastrar funcionários Terceirizados",
    }, {
      caminho: "/CadastroClientes",
      nome: "Cadastrar clientes",
    }, {
      caminho: "/FornecedorCadastro",
      nome: "Cadastrar fornecedor",
    }, {
      caminho: "/ProdutosCadastro",
      nome: "Cadastrar produtos",
    }, {
      titulo: <li className='headerLineNav'> <p>Registros</p></li>,
      caminho: "/listaUsuarios",
      nome: "Lista de usuários",
    }, {
      caminho: "/ListaFuncionario",
      nome: "Lista de funcionários",
    },{
      caminho: "/ListaFuncionarioTerc",
      nome: "Lista de funcionários Terceirizados",
    }, {
      caminho: "/ListaFornecedores",
      nome: "Lista de fornecedores",
    }, {
      caminho: "/ListaClientes",
      nome: "Lista de clientes",
    }, {
      caminho: "/ListaProdutos",
      nome: "Lista de produtos",
    }, {

      caminho: "/ListaVendas",
      nome: "Lista de vendas",

    }, {
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
              <Col lg={3} md={3} sm={1}>
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
                  <Sidebar   visible={visible} onHide={() => setVisible(false)}>
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
