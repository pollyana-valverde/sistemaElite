import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from 'datatables.net-dt';


const TabelaContasPagar = () => {
  const [contasPagar, setContaPagar] = useState([]);

  let table = new DataTable('#tabelaContasPagar', {
    retrieve: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/contasPagar");
        setContaPagar(data);
      } catch (error) {
        console.error("Erro ao buscar registro:", error); // Adiciona este log de erro
      }
    };

    fetchData();
  }, []);

  const handleExcluirContaReceber = async (idcontaPagar) => {
    try {
      await axios.delete(`http://localhost:3001/contasPagar/${idcontaPagar}`);
      // Atualiza a lista de cliente após a exclusão
      const { data } = await axios.get("http://localhost:3001/contasPagar");
      setContaPagar(data);
      console.log("Cliente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  return (
    <div>
      <table id="tabelaContasPagar" className="display" border={2} cellPadding={5} cellSpacing={5}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Classsificação</th>
            <th>Valor a pagar</th>
            <th>Data de vencimento</th>
            <th>Empresa</th>
            <th>Conta bancária</th>
            <th>Descrição do lançamento</th>
            <th>Status</th>
            <th>Valor pago</th>
            <th>Ação</th>
            {/* Adicione mais colunas, se necessário */}
          </tr>
        </thead>
        <tbody>
          {contasPagar.map((contasPagar) => (
            <tr key={contasPagar.idcontaPagar}>
              <td>{contasPagar.idcontaPagar}</td>
              <td>{contasPagar.clasificacao}</td>
              <td>{contasPagar.valorPagar}</td>
              <td>{contasPagar.vencimento}</td>
              <td>{contasPagar.empresa}</td>
              <td>{contasPagar.contaBancaria}</td>
              <td>{contasPagar.descricao}</td>
              <td>{contasPagar.status}</td>
              <td>{contasPagar.valorPago}</td>
              <td>
                <button
                  variant="danger"idcontaPagar
                  onClick={() => handleExcluirContaReceber(contasPagar.idcontaPagar)}
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

export default TabelaContasPagar;