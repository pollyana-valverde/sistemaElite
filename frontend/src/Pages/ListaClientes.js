//Lista de fornecedores
import React from "react";
import TabelaCliente from "../Components/TabelaClientes";

const ListaClientes = () => {
  return (
    <>
      <div className="tableSistemaGeral">
        <h2>Lista de Clientes</h2>
        <TabelaCliente />
      </div>
    </>
  );
};

export default ListaClientes;
