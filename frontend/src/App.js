import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

//Importar complementos aqui
import Rotas from "./Routes";

import AuthProvider from "./provider/AuthProvider";

//Importar componentes aqui
import Navegacao from "./Components/Navegacao";

const App = () => {
  return (
    <>
      <AuthProvider>
        {/* <Navegacao /> */}
        <Rotas />
      </AuthProvider>
    </>
  );
};

export default App;
