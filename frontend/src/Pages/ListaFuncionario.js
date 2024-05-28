//Lista de Usuarios
import React from "react";
import TabelaFuncionario from "../Components/TabelaFuncionario";

const ListaFuncionario = () => {
  return (
    <>
      <div className="tableSistemaGeral">
        <h2>Lista de funcionários</h2>
        <TabelaFuncionario />
      </div>
    </>
  );
};

export default ListaFuncionario;
