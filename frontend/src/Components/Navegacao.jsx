import React from 'react';

import PerfilFoto from '../imagens/perfilPhoto.jpg';

import '../css/navegacao.css';

const Header = () => {
  return (
    <header>
      <nav className='sideBar'>
        <ul className='sideNavContent'>
          <li className='navProfile'>
            <img src={PerfilFoto} alt='' />
            <div className='navProfileInfo'>
              <p>Administrador</p>
              <h5>Pollyana Valverde</h5>
            </div>
          </li>

          <li className='headerLineNav'><p>Main</p></li>

          <li className='lineNavLink'>
            <a href="/">Home</a>
          </li>
          <li className='lineNavLink'>
            <a href="/ListaClientes">Lista de Clientes</a>
          </li>
          <li className='lineNavLink'>
            <a href="/contato">Contato</a>
          </li>
          <li className='lineNavLink'>
            <a href="/cadastro">Cadastro</a>
          </li>
          <li className='lineNavLink'>
            <a href="/login">Login</a>
          </li>


          <li className='headerLineNav'><p>Cadastrar</p></li>
          <li className='lineNavLink'>
            <a href="/cadastro">Cadastrar funcionário</a>
          </li>

          <li className='lineNavLink'>
            <a href="/CadastroClientes">Cadastrar cliente</a>
          </li>
          <li className='lineNavLink'>
            <a href="/FornecedorCadastro">Cadastrar fornecedor</a>
          </li>
          <li className='lineNavLink'>
            <a href="/Produtos">Cadastrar produtos</a>
          </li>

          <li className='headerLineNav'> <p>Registros</p></li>

          <li className='lineNavLink'>
            <a href="/listaUsuarios">Lista de Usuários</a>
          </li>
          <li className='lineNavLink'>
            <a href="/listaFuncionarios">Lista de funcionários</a>
          </li>
        
          <li className='lineNavLink'>
            <a href="/ListaFornecedores">Lista de Fornecedores</a>
          </li>

          <li className='lineNavLink'>
            <a href="/ListaClientes">Lista de Clientes</a>
          </li>

          <li className='lineNavLink'>
            <a href="/ListaProdutos">Lista de produtos</a>
          </li>


          <li className='headerLineNav'><p>Contas</p></li>

          <li className='lineNavLink'>
            <a href="/ContasReceber">Contas a receber</a>
          </li>

          <li className='lineNavLink'>
            <a href="/ContasPagar">Contas a pagar</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
