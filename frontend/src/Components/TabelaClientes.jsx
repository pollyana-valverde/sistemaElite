import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from 'datatables.net-dt';


const TabelaCliente = () => {
  const [clientes, setClientes] = useState([]);

  let table = new DataTable('#tabelaClientes', {
    retrieve: true
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/cliente");
        setClientes(data);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error); // Adiciona este log de erro
      }
    };

    fetchData();
  }, []);

  const handleExcluirCliente = async (idCliente) => {
    try {
      await axios.delete(`http://localhost:3001/cliente/${idCliente}`);
      // Atualiza a lista de cliente após a exclusão
      const { data } = await axios.get("http://localhost:3001/cliente");
      setClientes(data);
      console.log("Cliente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  return (
    <div>
      <table id="tabelaClientes" className="display" border={2} cellPadding={5} cellSpacing={5}>
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
          {clientes.map((clientes) => (
            <tr key={clientes.idCliente}>
              <td>{clientes.idCliente}</td>
              <td>{clientes.representanteImpresa}</td>
              <td>{clientes.telefoneRepresentante}</td>
              <td>{clientes.cargoRepresentante}</td>
              <td>{clientes.cpfRepresentante}</td>
              <td>{clientes.nomeImpresa}</td>
              <td>{clientes.email}</td>
              <td>{clientes.cnpj}</td>
              <td>{clientes.endereço}</td>
              <td>{clientes.telefoneImpresa}</td>
              <td>{clientes.siteImpresa}</td>
              <td>
                <button
                  variant="danger"
                  onClick={() => handleExcluirCliente(clientes.idCliente)}
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

export default TabelaCliente;