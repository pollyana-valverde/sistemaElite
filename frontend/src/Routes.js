import React, { Children } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";

import Home from "./Pages/Home";
import Cadastro from "./Pages/Cadastro";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import TabelaUsuarios from "./Pages/ListaUsuarios";
import TabelaFornecedor from "./Pages/ListaFornecedores";
import ListaAlunos from "./Pages/ListaAlunos";
import ContasReceber from "./Pages/ContasReceber";
import Boletim from "./Pages/Boletim";
import ListaContasAPagar from "./Pages/ListaContasAPagar";
import ListaFornecedores from "./Pages/ListaFornecedores";
import ListaFuncionario from "./Pages/ListaFuncionario";
import ListaFuncionarioTerc from "./Pages/ListaFuncionarioTerc";

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
        }, {
          path: "/ListaUsuarios",
          element: <TabelaUsuarios />,
        }, {
          path: "/TabelaFornecedor",
          element: <TabelaFornecedor />,
        }, {
          path: "/ListaAlunos",
          element: <ListaAlunos />,
        }, {
          path: "/ListaFornecedores",
          element: <ListaFornecedores />,
        }, {
          path: "/ContasReceber",
          element: <ContasReceber />,
        }, {
          path: "/Boletim",
          element: < Boletim />
        },{
          path: "/ListaContasAPagar",
          element: < ListaContasAPagar />
        }, {
          path: "/ListaFuncionario",
          element: < ListaFuncionario />
        }, {
          path: "/ListaFuncionarioTerc",
          element: < ListaFuncionarioTerc />
        }, {
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
    }, {
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
