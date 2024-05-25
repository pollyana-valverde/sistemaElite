//Cadastro dos clientes
import React from "react";
import ClienteForm from "../Components/ClienteForm";

const ClienteCadastro = () => {
  return (
    <>
      <div className="formsSistemaGeral">
        <h2>Cadastrar cliente</h2>
        <ClienteForm />
        {/* Conteúdo da página Contato */}
      </div>
    </>
  );
};

export default ClienteCadastro;
