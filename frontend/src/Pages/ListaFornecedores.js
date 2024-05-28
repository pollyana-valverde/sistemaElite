//Lista de fornecedores
import React from "react";
import TabelaFornecedor from "../Components/TabelaFornecedor";

const ListaFornecedores = () => {
  return (
    <>
      <div className="tableSistemaGeral">
        <h2>Lista de Fornecedores</h2>
        <TabelaFornecedor />
      </div>
    </>
  );
};

export default ListaFornecedores;
