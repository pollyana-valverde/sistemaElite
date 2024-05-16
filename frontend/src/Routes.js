import React from "react";
import {Routes, Route, RouterProvider} from "react-router-dom";
import Home from "./Pages/Home";
import Contato from "./Pages/Contato";
import Cadastro from "./Pages/Cadastro";
import Login from "./Pages/Login";
import TabelaUsuarios from "./Pages/ListaUsuarios";
import FornecerCadastro from "./Pages/FornecedorCadastro";
import TabelaFornecedor from "./Components/TabelaFornecedor";
import Produtos from "./Pages/Produtos";
import ListaProd from "./Pages/TabelaProdutos";


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
        <Route path="/Produtos" element={<Produtos />} />
        <Route path="/TabelaProdutos" element={<ListaProd />} />
      </Routes>
    </>
  );
};

export default Rotas;
