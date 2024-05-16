import React, { Children } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";

import Home from "./Pages/Home";
import Contato from "./Pages/Contato";
import Cadastro from "./Pages/Cadastro";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import TabelaUsuarios from "./Pages/ListaUsuarios";
import FornecerCadastro from "./Pages/FornecedorCadastro";
import TabelaFornecedor from "./Components/TabelaFornecedor";

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
      </Routes>
    </>
  );
};

export default Rotas;
