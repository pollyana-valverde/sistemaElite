import React, { useState } from 'react';

import { useAuth } from '../provider/AuthProvider';

import PerfilFoto from '../imagens/logoGeneralMotors.png';

import '../css/navegacao.css';

import {Container, Row, Col} from 'react-bootstrap'

import Rotas from "../Routes";


const Header = () => {

  const { token } = useAuth();

  const [links, setLink] = useState([
      {
        titulo: <li className='headerLineNav'><p>Main</p></li>,
        caminho: "/",
        nome: "Home",
      },{
        caminho: "/logout",
        nome: "Logout",
      },{
        titulo: <li className='headerLineNav'><p>Cadastrar</p></li>,
        caminho: "/FuncionarioCadastro",
        nome: "Cadastrar funcionários",
      },{
        caminho: "/CadastroClientes",
        nome: "Cadastrar clientes",
      },{
        caminho: "/FornecedorCadastro",
        nome: "Cadastrar fornecedor",
      },{
        caminho: "/ProdutosCadastro",
        nome: "Cadastrar produtos",
      },{
        titulo: <li className='headerLineNav'> <p>Registros</p></li>,
        caminho: "/listaUsuarios",
        nome: "Lista de usuários",
      },{
        caminho: "/ListaFuncionario",
        nome: "Lista de funcionários",
      },{
        caminho: "/ListaFornecedores",
        nome: "Lista de fornecedores",
      },{
        caminho: "/ListaClientes",
        nome: "Lista de clientes",
      },{
        caminho: "/ListaProdutos",
        nome: "Lista de produtos",
      },{

        caminho: "/ListaVendas",
        nome: "Lista de vendas",

      },{
        titulo: <li className='headerLineNav'><p>Contas</p></li>,
        caminho: "/ContasReceber",
        nome: "Contas a receber",
      },{
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
            <Col lg={3} md={3} sm={4}>
              <header>
                <nav className='sideBar'>
                  <ul className='sideNavContent'>
                      <div>
                      <li className='navProfile'>
                      <img src={PerfilFoto} alt='logo da GM' />
                      <div className='navProfileInfo'>
                        <p>Administrador</p>
                        <h5>{token}</h5>
                        {/* <Nome /> */}
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
            </Col>
            <Col lg={8} md={8} sm={8}><Rotas /></Col></>
             ) : (
            <Rotas />
          )}
          
          </Row>
          </Container>
    </>
  );
};

export default Header;
