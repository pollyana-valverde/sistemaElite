import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contato">Contato</Link>
          </li>
          <li>
            <Link to="/cadastro">Cadastro</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/listaUsuarios">Lista de Usuários</Link>
          </li>
          <li>
            <Link to="/FornecedorCadastro">Cadastrar fornecedor</Link>
          </li>
          <li>
            <Link to="/listaUsuarios">Lista de Fornecedores</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;