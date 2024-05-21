import React, { useState } from 'react';

import { useAuth } from '../provider/AuthProvider';

import PerfilFoto from '../imagens/perfilPhoto.jpg';

import '../css/navegacao.css';




const Header = ({ data }) => {

  console.log("Valor de data no Header:", data);

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

  const [linksNaoAuth, setLinkNaoAuth] = useState([
      {
        titulo: <li className='headerLineNav'><p>Main</p></li>,
        caminho: "/cadastro",
        nome: "Cadastro",
      },{
        caminho: "/login",
        nome: "Login",
      }
  ])


  if (!token) {
    
  } else {
    
  }

  return (
    <header>
      <nav className='sideBar'>
        <ul className='sideNavContent'>

          {token ? (
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
             ) : (
            <div>
              {linksNaoAuth.map((linkNaoAuth, index) => (
                <>
                  {linkNaoAuth.titulo}
                  <li className='lineNavLink'>
                    <a href={linkNaoAuth.caminho} className='navProfile' >{linkNaoAuth.nome}</a>
                  </li>
                </>
              ))}
            </div>
          )}
          
{/* 
          <li className='lineNavLink'><a href="/">Home</a></li>
          <li className='lineNavLink'><a href="/contato">Contato</a></li>
          <li className='lineNavLink'><a href="/cadastro">Cadastro</a></li>
          <li className='lineNavLink'><a href="/login">Login</a></li>
          <li className='lineNavLink'><a href="/Logout">Logout</a></li> */}
{/* 
          <li className='lineNavLink'><a href="/CadastroClientes">Cadastrar cliente</a></li>
          <li className='lineNavLink'><a href="/FornecedorCadastro">Cadastrar fornecedor</a></li>
          <li className='lineNavLink'><a href="/Produtos">Cadastrar produtos</a></li> */}
{/* 
          <li className='lineNavLink'><a href="/listaUsuarios">Lista de Usuários</a></li>
          <li className='lineNavLink'><a href="/ListaFornecedores">Lista de Fornecedores</a></li>
          <li className='lineNavLink'><a href="/ListaClientes">Lista de Clientes</a></li>
          <li className='lineNavLink'><a href="/ListaProdutos">Lista de produtos</a></li> */}
{/* 
          <li className='lineNavLink'><a href="/ContasReceber">Contas a receber</a></li>
          <li className='lineNavLink'><a href="/ContasPagar">Contas a pagar</a></li> */}

        </ul>
      </nav>
    </header>
  );
};

export default Header;
