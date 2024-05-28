//Lista de Vendas
import React from "react";
import TabelaVendas from "../Components/TabelaVendas";

const ListaVendas = () => {
  return (
    <>
      <div className="tableSistemaGeral">
        <h2>Registro de vendas realizadas</h2>
        <TabelaVendas />
      </div>
    </>
  );
};

export default ListaVendas;