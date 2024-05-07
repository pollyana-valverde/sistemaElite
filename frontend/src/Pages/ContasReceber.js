//Lista de Usuarios
import React from "react";
import TabelaContasReceber from "../Components/TabelaContasReceber";
import FiltroContasReceber from "../Components/FiltroContasReceber";
// import PesquisaReceber from "../Components/PesquisaReceber";

const ContasReceber = () => {
  return (
    <>
      <div>
        <h2>Contas a receber</h2>
        < FiltroContasReceber/>
        {/* < PesquisaReceber/> */}
        < TabelaContasReceber/>
      </div>
    </>
  );
};

export default ContasReceber;
