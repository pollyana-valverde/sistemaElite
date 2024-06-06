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
import Boletim from "./Pages/Boletim";
import CadastrarPagamento from './Pages/CadastrarPagamento';
import ListaContasAPagar from "./Pages/ListaContasAPagar";
import ListaFornecedores from "./Pages/ListaFornecedores";
import ListaFuncionario from "./Pages/ListaFuncionario";
import ListaFuncionarioTerc from "./Pages/ListaFuncionarioTerc";
import FuncionarioCadastro from "./Pages/FuncionarioCadastro";
import FuncionarioTercCadastro from "./Pages/FuncionarioTercCadastro";
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
          path: "/Boletim",
          element: < Boletim/>
        },{
          path: "/CadastrarPagamento",
          element: < CadastrarPagamento/>
        },{
          path: "/ListaContasAPagar",
          element: < ListaContasAPagar/>
        },{
          path: "/ListaFuncionario",
          element: < ListaFuncionario/>
        },{
          path: "/ListaFuncionarioTerc",
          element: < ListaFuncionarioTerc/>
        },{
          path: "/FuncionarioCadastro",
          element: < FuncionarioCadastro/>
        },{
          path: "/FuncionarioTercCadastro",
          element: <FuncionarioTercCadastro/>
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
