import React, { useState, useEffect } from "react";
import axios from "axios";

const TabelaContasReceber = () => {
  const [contasReceber, setContaReceber] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/contasReceber");
        setContaReceber(data);
      } catch (error) {
        console.error("Erro ao buscar registro:", error); // Adiciona este log de erro
      }
    };

    fetchData();
  }, []);

  const handleExcluirContaReceber = async (idcontaReceber) => {
    try {
      await axios.delete(`http://localhost:3001/contasReceber/${idcontaReceber}`);
      // Atualiza a lista de cliente após a exclusão
      const { data } = await axios.get("http://localhost:3001/contasReceber");
      setContaReceber(data);
      console.log("Cliente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  return (
    <div>
      <table border={2} cellPadding={5} cellSpacing={5}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Classsificação</th>
            <th>Valor a receber</th>
            <th>Data de vencimento</th>
            <th>Empresa</th>
            <th>Conta bancária</th>
            <th>Descrição do lançamento</th>
            <th>Status</th>
            <th>Valor recebido</th>
            <th>Ação 1</th>
            {/* <th>Ação 2</th> */}
            {/* Adicione mais colunas, se necessário */}
          </tr>
        </thead>
        <tbody>
          {contasReceber.map((contasReceber) => (
            <tr key={contasReceber.idcontaReceber}>
              <td>{contasReceber.idcontaReceber}</td>
              <td>{contasReceber.clasificacao}</td>
              <td>{contasReceber.valorReceber}</td>
              <td>{contasReceber.vencimento}</td>
              <td>{contasReceber.empresa}</td>
              <td>{contasReceber.contaBancaria}</td>
              <td>{contasReceber.descricao}</td>
              <td>{contasReceber.status}</td>
              <td>{contasReceber.valorRecebido}</td>
              <td>
                <button
                  variant="danger"
                  onClick={() => handleExcluirContaReceber(contasReceber.idcontaReceber)}
                >
                  Excluir
                </button>
                
              </td>
              {/* <td>
                <button
                  variant="danger"
                  onClick={() => handleExcluirContaReceber(contasReceber.idcontaReceber)}
                >
                  Excluir
                </button>
                
              </td> */}
              
              {/* Renderizar outras colunas, se necessário */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaContasReceber;