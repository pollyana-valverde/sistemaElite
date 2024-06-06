//Lista de Usuarios
import React from "react";
import TabelaProdutos from "../Components/TabelaProdutos";

const ListaProdutos = () => {
  return (
    <>
      <div className="tableSistemaGeral">
        <h2>Contas a pagar</h2>
        <TabelaProdutos />
      </div>
    </>
  );
};

export default ListaProdutos;
