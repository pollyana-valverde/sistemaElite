import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Contato from "./Pages/Contato";
import Cadastro from "./Pages/Cadastro";

import Login from "./Pages/Login";
import TabelaUsuarios from "./Pages/ListaUsuarios";

import FornecerCadastro from "./Pages/FornecedorCadastro";
import TabelaFornecedor from "./Pages/ListaFornecedores";

import ClienteCadastro from "./Pages/CadastroClientes";
import ListaClientes from "./Pages/ListaClientes";

import ContasReceber from "./Pages/ContasReceber";
import ContasPagar from "./Pages/ContasPagar";

import Produtos from './Pages/Produtos';
import ListaProdutos from "./Pages/ListaProdutos";

const Rotas = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/FornecedorCadastro" element={<FornecerCadastro />} />
        <Route path="/listaUsuarios" element={<TabelaUsuarios />} />
        <Route path="/ListaFornecedores" element={<TabelaFornecedor />} />
        <Route path="/CadastroClientes" element={<ClienteCadastro />} />
        <Route path="/ListaClientes" element={<ListaClientes />} />
        <Route path="/ContasReceber" element={<ContasReceber />} />
        <Route path="/ContasPagar" element={<ContasPagar />} />
        <Route path="/Produtos" element={<Produtos />} />
        <Route path="/ListaProdutos" element={<ListaProdutos />} />
      </Routes>
    </>
  );
};

export default Rotas;
