import React, { useState } from 'react';

import { useAuth } from '../provider/AuthProvider';

import PerfilFoto from '../imagens/perfilPhoto.jpg';

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
        caminho: "/contato",
        nome: "Contato",
      },{
        caminho: "/logout",
        nome: "Logout",
      },{
        titulo: <li className='headerLineNav'><p>Cadastrar</p></li>,
        caminho: "/FuncionarioCadastro",
        nome: "Cadastrar Funcionários",
      },{
        caminho: "/CadastroClientes",
        nome: "Cadastrar Clientes",
      },{
        caminho: "/FornecedorCadastro",
        nome: "Cadastrar fornecedor",
      },{
        caminho: "/ProdutosCadastro",
        nome: "Cadastrar produtos",
      },{
        titulo: <li className='headerLineNav'> <p>Registros</p></li>,
        caminho: "/listaUsuarios",
        nome: "Lista de Usuários",
      },{
        caminho: "/ListaFuncionario",
        nome: "Lista de Funcionários",
      },{
        caminho: "/ListaFornecedores",
        nome: "Lista de Fornecedores",
      },{
        caminho: "/ListaClientes",
        nome: "Lista de Clientes",
      },{
        caminho: "/ListaProdutos",
        nome: "Lista de produtos",
      },{

        caminho: "/ListaVendas",
        nome: "Lista de Vendas",

      },{
        titulo: <li className='headerLineNav'><p>Contas</p></li>,
        caminho: "/ContasReceber",
        nome: "Contas a receber",
      },{
        caminho: "/ContasPagar",
        nome: "Contas a pagar",
      }
  ]);

  // const [linksNaoAuth, setLinkNaoAuth] = useState([
  //     {
  //       titulo: <li className='headerLineNav'><p>Main</p></li>,
  //       caminho: "/cadastro",
  //       nome: "Cadastro",
  //     },{
  //       caminho: "/login",
  //       nome: "Login",
  //     }
  // ])


  if (!token) {
    
  } else {
    
  }

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
                      <img src={PerfilFoto} alt='' />
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
            <Col lg={9} md={9} sm={9}><Rotas /></Col></>
             ) : (
            <Rotas />
            // <div>
            //   {linksNaoAuth.map((linkNaoAuth, index) => (
            //     <>
            //       {linkNaoAuth.titulo}
            //       <li className='lineNavLink'>
            //         <a href={linkNaoAuth.caminho} className='navProfile' >{linkNaoAuth.nome}</a>
            //       </li>
            //     </>
            //   ))}
            // </div>
          )}
          
          </Row>
          </Container>
    </>
  );
};

export default Header;
