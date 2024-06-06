//Cadastro
import React from "react";
import FuncionarioTercForm from "../Components/FuncionarioTercForm";
// import '../css/formulario.css';

const FuncionarioCadastro = () => {
  return (
    <>
      <div className="formsSistemaGeral">
        <h2>Cadastrar funcionários Terceirizados</h2>
        <FuncionarioTercForm />
      </div>
    </>
  );
};

export default FuncionarioCadastro;
