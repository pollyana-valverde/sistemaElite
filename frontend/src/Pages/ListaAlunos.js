//Lista de fornecedores
import React from "react";
import TabelaCliente from "../Components/TabelaAlunos";

const ListaClientes = () => {
  return (
    <>
      <div className="tableSistemaGeral">
        <h2>Lista de alunos</h2>
        <TabelaCliente />
      </div>
    </>
  );
};

export default ListaClientes;
