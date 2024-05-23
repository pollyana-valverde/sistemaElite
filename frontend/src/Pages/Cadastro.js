//Cadastro
import React from "react";
import CadastroForm from "../Components/CadastroForm";
import '../css/cadastroForm.css'

const Cadastro = () => {
  return (
    <>
      <div className="titulocad">
        <h2>Cadastro</h2>
        <CadastroForm />
      </div>
    </>
  );
};

export default Cadastro;
