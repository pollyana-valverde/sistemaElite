import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><p>Main</p></li>
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


          <li><p>Cadastrar</p></li>
          <li>
            <Link to="/CadastroClientes">Cadastrar cliente</Link>
          </li>
          <li>
            <Link to="/FornecedorCadastro">Cadastrar fornecedor</Link>
          </li>
          <li>
            <Link to="/Produtos">Cadastrar produtos</Link>
          </li>

       <li> <p>Registros</p></li>
          <li>
            <Link to="/listaUsuarios">Lista de Usuários</Link>
          </li>
          
          <li>
            <Link to="/ListaFornecedores">Lista de Fornecedores</Link>
          </li>

          <li>
            <Link to="/ListaClientes">Lista de Clientes</Link>
          </li>

          <li>
            <Link to="/ListaProdutos">Lista de produtos</Link>
          </li>


          <li><p>Contas</p></li>
          <li>
            <Link to="/ContasReceber">Contas a receber</Link>
          </li>

          <li>
            <Link to="/ContasPagar">Contas a pagar</Link>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default Header;
