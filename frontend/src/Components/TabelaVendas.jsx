import React, { useState, useEffect } from "react";
import axios from "axios";

const TabelaVendas = () => {
  const [vendas, setVenda] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/vendas");
        setVenda(data);
      } catch (error) {
        console.error("Erro ao buscar registro:", error); // Adiciona este log de erro
      }
    };

    fetchData();
  }, []);

  const handleExcluirVendas = async (codigoVenda) => {
    try {
      await axios.delete(`http://localhost:3001/vendas/${codigoVenda}`);
      // Atualiza a lista de cadastros após a exclusão
      const { data } = await axios.get("http://localhost:3001/vendas");
      setVenda(data);
      console.log("Registro da venda excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir registro da venda:", error);
    }
  };

  return (
    <div>
      <table border={2} cellPadding={5} cellSpacing={5}>
        <thead>
          <tr>
          <th>Código da venda</th>
            <th>Data e hora</th>
            <th>Id do Carro</th>
            <th>Id do Cliente</th>
            <th>Id do Funcionario</th>
            <th>Quantidade de Produtos</th>
            <th>Valor da Unidade</th>
            <th>Valor Total</th>
            <th>Metodo de Pagamento</th>
            <th>Endereço</th>
            <th>Status</th>
            {/* Adicione mais colunas, se necessário */}
          </tr>
        </thead>
        <tbody>
          {vendas.map((vendas) => (
            <tr key={vendas.codigoVenda}>
              <td>{vendas.codigoVenda}</td>
              <td >{vendas.dataHora}</td>
              <td>{vendas.numeroIdentCarro}</td>
              <td>{vendas.cliente}</td>
              <td>{vendas.cpfFuncionario}</td>
              <td>{vendas.qtdProdutos}</td>
              <td>{vendas.valorUnidade}</td>
              <td>{vendas.metodoPagamento}</td>
              <td>{vendas.endereco}</td>
              <td>{vendas.status}</td>
              <td>
                <button
                  variant="danger"
                  onClick={() => handleExcluirVendas(vendas.codigoVenda)}
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

export default TabelaVendas;