import React, { useState, useEffect } from "react";
import axios from "axios";

const  TabelaFuncionario= () => {
  const [funcionario, setFuncionario] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/funcionario");
        setFuncionario(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error); // Adiciona este log de erro
      }
    };

    fetchData();
  }, []);

  const handleExcluirUsuario = async (idFuncionario) => {
    try {
      await axios.delete(`http://localhost:3001/funcionario/${idFuncionario}`);
      // Atualiza a lista de cadastros após a exclusão
      const { data } = await axios.get("http://localhost:3001/funcionario");
      setFuncionario(data);
      console.log("Usuário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  return (
    <div>
      <table border={2} cellPadding={5} cellSpacing={5}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Senha</th>
            <th>Ação</th>
            {/* Adicione mais colunas, se necessário */}
          </tr>
        </thead>
        <tbody>
          {funcionario.map((funcionarios) => (
            <tr key={funcionarios.idFuncionario}>
              <td>{funcionarios.idFuncionario}</td>
              <td>{funcionarios.nome}</td>
              <td>{funcionarios.email}</td>
              <td>{funcionarios.cpf}</td>
              <td>{funcionarios.endereco}</td>
              <td>{funcionarios.telefone}</td>
              <td>{funcionarios.senha}</td>
              <td>
                <button
                  variant="danger"
                  onClick={() => handleExcluirUsuario(funcionarios.idFuncionario)}
                >
                  Excluir
                </button>
              </td>
              {/* Renderizar outras colunas, se necessário */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaFuncionario;