import React, { useState, useEffect } from "react";
import axios from "axios";

const TabelaProdutos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/produtos");
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error); // Adiciona este log de erro
      }
    };

    fetchData();
  }, []);

  const handleExcluirUsuario = async (idCarro) => {
    try {
      await axios.delete(`http://localhost:3001/produtos/${idCarro}`);
      // Atualiza a lista de cadastros após a exclusão
      const { data } = await axios.get("http://localhost:3001/produtos");
      setProdutos(data);
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
            <th>marca</th>
            <th>modelo</th>
            <th>classificacao</th>
            <th>cor</th>
            <th>anoFabricacao</th>
            <th>potencia</th>
            <th>tipoMotor</th>
            <th>tipoTransmissao</th>
            <th>numeroIdentificacao</th>
            <th>valor</th>
            <th>Ação</th>
            {/* Adicione mais colunas, se necessário */}
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.idCadastro}>
              <td>{produto.idCadastro}</td>
              <td>{produto.marca}</td>
              <td>{produto.modelo}</td>
              <td>{produto.classificacao}</td>
              <td>{produto.cor}</td>
              <td>{produto.anoFabricacao}</td>
              <td>{produto.potencia}</td>
              <td>{produto.tipoMotor}</td>
              <td>{produto.tipoTransmissao}</td>
              <td>{produto.numeroIdentificacao}</td>
              <td>{produto.valor}</td>
              <td>
                <button
                  variant="danger"
                  onClick={() => handleExcluirUsuario(produtos.idCarro)}
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

export default TabelaProdutos;