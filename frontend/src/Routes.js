import React, { Children } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";

import Home from "./Pages/Home";
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
import ProdutosCadastro from './Pages/ProdutosCadastro';
import ListaProdutos from "./Pages/ListaProdutos";
import ListaFornecedores from "./Pages/ListaFornecedores";
import ListaFuncionario from "./Pages/ListaFuncionario";
import FuncionarioCadastro from "./Pages/FuncionarioCadastro";
import ListaVendas from "./Pages/ListaVendas";

const Rotas = () => {
  const { token } = useAuth();


  //define rotas públicas acessíveis para todos os usuários

/////ou vai ser usado pra admin ou eu tiro essa parte
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
          path: "/CadastroClientes",
          element: <ClienteCadastro />,
        },{
          path: "/ListaUsuarios",
          element: <TabelaUsuarios />,
        },{
          path: "/FornecedorCadastro",
          element: <FornecerCadastro />,
        },{
          path: "/TabelaFornecedor",
          element: <TabelaFornecedor />,
        },{
          path: "/ListaClientes",
          element: <ListaClientes />,
        },{
          path: "/ListaFornecedores",
          element: <ListaFornecedores />,
        },{
          path: "/ContasReceber",
          element: <ContasReceber />,
        },{
          path: "/ContasPagar",
          element: < ContasPagar/>
        },{
          path: "/ProdutosCadastro",
          element: < ProdutosCadastro/>
        },{
          path: "/listaProdutos",
          element: < ListaProdutos/>
        },{
          path: "/ListaFuncionario",
          element: < ListaFuncionario/>
        },{
          path: "/FuncionarioCadastro",
          element: < FuncionarioCadastro/>
        },{
          path: "/ListaVendas",
          element: < ListaVendas/>
        },{
          path: "/FuncionarioCadastro",
          element: < FuncionarioCadastro/>
        },{
          path: "/Logout",
          element: <Logout />,
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
};

export default Rotas;
