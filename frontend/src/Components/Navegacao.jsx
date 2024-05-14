import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link to="/">Home</Link>
          </li>
          <li className='lineNavLink'>
            <Link to="/contato">Contato</Link>
          </li>
          <li className='lineNavLink'>
            <Link to="/cadastro">Cadastro</Link>
          </li>
          <li className='lineNavLink'>
            <Link to="/login">Login</Link>
          </li>


          <li className='headerLineNav'><p>Cadastrar</p></li>

          <li className='lineNavLink'>
            <Link to="/CadastroClientes">Cadastrar cliente</Link>
          </li>
          <li className='lineNavLink'>
            <Link to="/FornecedorCadastro">Cadastrar fornecedor</Link>
          </li>
          <li className='lineNavLink'>
            <Link to="/Produtos">Cadastrar produtos</Link>
          </li>

          <li className='headerLineNav'> <p>Registros</p></li>

          <li className='lineNavLink'>
            <Link to="/listaUsuarios">Lista de Usuários</Link>
          </li>
          
        
          <li className='lineNavLink'>
            <Link to="/ListaFornecedores">Lista de Fornecedores</Link>
          </li>

          <li className='lineNavLink'>
            <Link to="/ListaClientes">Lista de Clientes</Link>
          </li>

          <li className='lineNavLink'>
            <Link to="/ListaProdutos">Lista de produtos</Link>
          </li>


          <li className='headerLineNav'><p>Contas</p></li>

          <li className='lineNavLink'>
            <Link to="/ContasReceber">Contas a receber</Link>
          </li>

          <li className='lineNavLink'>
            <Link to="/ContasPagar">Contas a pagar</Link>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default Header;
