import React, { useState, useEffect } from "react";
import axios from "axios";

const TabelaTab = () => {
  const [cadastros, setCadastros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/produtos");
        setCadastros(data);
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
      setCadastros(data);
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
            <th>Marca</th>
            <th>Modelo</th>
            <th>Classificação</th>
            <th>Cor</th>
            <th>Ano de Fabricação</th>
            <th>Potência</th>
            <th>Tipo de Motor</th>
            <th>Tipo de Transmissão</th>
            <th>Numero de Indentificação</th>
            <th>Valor do Carro</th>
            {/* Adicione mais colunas, se necessário */}
          </tr>
        </thead>
        <tbody>
          {carros.map((carros) => (
            <tr key={carros.idCarro}>
              <td>{carros.idCarro}</td>
              <td>{carros.marca}</td>
              <td>{carros.modelo}</td>
              <td>{carros.classificacao}</td>
              <td>{carros.cor}</td>
              <td>{carros.anoFabricacao}</td>
              <td>{carros.potencia}</td>
              <td>{carros.tipoMotor}</td>
              <td>{carros.tipoTransmissao}</td>
              <td>{carros.numeroIdentificacao}</td>
              <td>{carros.valor}</td>
              <td>
                <button
                  variant="danger"
                  onClick={() => handleExcluirUsuario(carros.idCarro)}
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

export default TabelaTab;