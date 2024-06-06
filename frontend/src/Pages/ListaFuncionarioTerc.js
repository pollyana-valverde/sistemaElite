//Lista de Usuarios
import React from "react";
import TabelaFuncionarioTercerizado from "../Components/TabelaFuncionarioTerc";

const ListaFuncionario = () => {
  return (
    <>
      <div className="tableSistemaGeral">
        <h2>Lista de funcionários Terceirizados</h2>
        <TabelaFuncionarioTercerizado />
      </div>
    </>
  );
};

export default ListaFuncionario;
