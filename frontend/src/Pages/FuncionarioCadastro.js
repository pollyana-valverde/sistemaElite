//Cadastro
import React from "react";
import FuncionarioForm from "../Components/FuncionarioForm";
// import '../css/formulario.css';

const FuncionarioCadastro = () => {
  return (
    <>
      <div className="formsSistemaGeral">
        <h2>Cadastrar funcionários</h2>
        <FuncionarioForm />
      </div>
    </>
  );
};

export default FuncionarioCadastro;
