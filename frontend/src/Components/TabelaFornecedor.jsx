import React, { useState, useEffect } from "react";
import axios from "axios";

const TabelaFornecedor = () => {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/cadastros");
        setFornecedores(data);
      } catch (error) {
        console.error("Erro ao buscar Fornecedor:", error); // Adiciona este log de erro
      }
    };

    fetchData();
  }, []);

  const handleExcluirFornecedor = async (idFornecedor) => {
    try {
      await axios.delete(`http://localhost:3001/cadastros/${idFornecedor}`);
      // Atualiza a lista de cadastros após a exclusão
      const { data } = await axios.get("http://localhost:3001/cadastros");
      setFornecedores(data);
      console.log("Fornecedor excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir Fornecedor:", error);
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
          {fornecedores.map((fornecedores) => (
            <tr key={fornecedores.idFornecedor}>
              <td>{fornecedores.idFornecedor}</td>
              <td>{fornecedores.nome}</td>
              <td>{fornecedores.email}</td>
              <td>{fornecedores.cpf}</td>
              <td>{fornecedores.endereco}</td>
              <td>{fornecedores.telefone}</td>
              <td>{fornecedores.senha}</td>
              <td>
                <button
                  variant="danger"
                  onClick={() => handleExcluirFornecedor(fornecedores.idFornecedor)}
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

export default TabelaFornecedor;