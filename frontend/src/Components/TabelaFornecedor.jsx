import React, { useState, useEffect } from "react";
import axios from "axios";

const TabelaFornecedor = () => {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/fornecedor");
        setFornecedores(data);
      } catch (error) {
        console.error("Erro ao buscar Fornecedor:", error); // Adiciona este log de erro
      }
    };

    fetchData();
  }, []);

  const handleExcluirFornecedor = async (idFornecedor) => {
    try {
      await axios.delete(`http://localhost:3001/fornecedor/${idFornecedor}`);
      // Atualiza a lista de fornecedores após a exclusão
      const { data } = await axios.get("http://localhost:3001/fornecedor");
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
            <th>ID da impresa</th>
            <th>Representante da impresa</th>
            <th>Telefone do representante</th>
            <th>Cargo do representante</th>
            <th>CPF do representante</th>
            <th>Nome da impresa</th>
            <th>Email</th>
            <th>CNPJ</th>
            <th>Endereço</th>
            <th>Telefone da impresa</th>
            <th>Site da impresa</th>
            <th>Ação</th>
            {/* Adicione mais colunas, se necessário */}
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedores) => (
            <tr key={fornecedores.idFornecedor}>
              <td>{fornecedores.idFornecedor}</td>
              <td>{fornecedores.representante}</td>
              <td>{fornecedores.telefoneRepresentante}</td>
              <td>{fornecedores.cargoRepresentante}</td>
              <td>{fornecedores.cpfRepresentante}</td>
              <td>{fornecedores.nomeImpresa}</td>
              <td>{fornecedores.email}</td>
              <td>{fornecedores.cnpj}</td>
              <td>{fornecedores.endereço}</td>
              <td>{fornecedores.telefoneImpresa}</td>
              <td>{fornecedores.siteImpresa}</td>
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