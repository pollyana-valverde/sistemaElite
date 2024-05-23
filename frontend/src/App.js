import React from "react";

import {Container, Row, Col} from 'react-bootstrap'

//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

//Importar complementos aqui
import Rotas from "./Routes";

import AuthProvider from "./provider/AuthProvider";
//Importar componentes aqui
import Navegacao from "./Components/Navegacao";

import '../src/css/formulario.css';
import './css/index.css';

const App = () => {
  return (
    <>
      <AuthProvider>
            <Navegacao />
      </AuthProvider>

    </>
  );
};

export default App;
