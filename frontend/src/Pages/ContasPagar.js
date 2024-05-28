//Lista de Usuarios
import React from "react";
import TabelaContasPagar from "../Components/TabelaContasPagar";

const ContasPagar = () => {
  return (
    <>
      <div className="tableSistemaGeral">
        <h2>Contas a pagar</h2>
        <TabelaContasPagar />
      </div>
    </>
  );
};

export default ContasPagar;
