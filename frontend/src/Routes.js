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
import TabelaFornecedor from "./Pages/ListaFornecedores";
import ClienteCadastro from "./Pages/CadastroClientes";
import ListaClientes from "./Pages/ListaClientes";
import ContasReceber from "./Pages/ContasReceber";
import ContasPagar from "./Pages/ContasPagar";

import Produtos from './Pages/Produtos';
import ListaProdutos from "./Pages/ListaProdutos";

const Rotas = () => {
  const { token } = useAuth();


  //define rotas públicas acessíveis para todos os usuários
  const rotasPublicas = [
    {
      path: "/cadastro",
      element: <Cadastro />
    }
  ];

  //define rotas somente acessíveis para usuários logados
  const rotasSomenteAutenticados = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },{
          path: "/ListaClientes",
          element: <ClienteCadastro />,
        },{
          path: "/listaUsuarios",
          element: <TabelaUsuarios />,
        },{
          path: "/logout",
          element: <Logout />
        }
      ],
    },
  ];

  //define rotas somente acessíveis para usuários sem login
  const rotasNaoAutenticados = [
    {
      path: "/cadastro",
      element: <Cadastro />,
    },{
      path: "/login",
      element: <Login />
    },
  ];

  const router = createBrowserRouter([
    ...rotasPublicas,
    ...(!token ? rotasNaoAutenticados : []),
    ...rotasSomenteAutenticados,
  ]);


  return <RouterProvider router={router} />;
  // (
  //   <>
  //     <Routes>
        
  //       <Route path="/" exact element={<Home />} />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/contato" element={<Contato />} />
  //       <Route path="/cadastro" element={<Cadastro />} />
  //       <Route path="/FornecedorCadastro" element={<FornecerCadastro />} />
  //       <Route path="/listaUsuarios" element={<TabelaUsuarios />} />
  //       <Route path="/ListaFornecedores" element={<TabelaFornecedor />} />
  //       <Route path="/CadastroClientes" element={<ClienteCadastro />} />
  //       <Route path="/ListaClientes" element={<ListaClientes />} />
  //       <Route path="/ContasReceber" element={<ContasReceber />} />
  //     </Routes>
  //   </>
  // );
};

export default Rotas;
