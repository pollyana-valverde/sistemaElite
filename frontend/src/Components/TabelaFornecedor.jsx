import React, { useState, useEffect } from "react";
import axios from "axios";
// import DataTable from 'datatables.net-dt';


const TabelaFornecedor = () => {
  const [fornecedores, setFornecedores] = useState([]);
  // const [dataTable, setDataTable] = useState([])

  //   function format(d) {
  //     // `d` is the original data object for the row
  //     return (
  //         '<dl>' +
  //         '<dt>Full name:</dt>' +
  //         '<dd>' +
  //         d.name +
  //         '</dd>' +
  //         '<dt>Extension number:</dt>' +
  //         '<dd>' +
  //         d.extn +
  //         '</dd>' +
  //         '<dt>Extra info:</dt>' +
  //         '<dd>And any further details here (images etc)...</dd>' +
  //         '</dl>'
  //     );
  // }



  // const dataSet = "http://localhost:3001/fornecedor";


//   const dataSet = "http://localhost:3001/fornecedor";

//   useEffect(() => {
 
//   const fetchData = async () => {
//     console.log('fetchData: ');
//     try {
//       const { data } = await axios.get(dataSet);
//       const modifiedData = data.map(r => ({
//         ...r
//       }));

//       console.log('asdfasdfpppp: ', modifiedData)

//       if (modifiedData.length === 0) {
//         console.error('Erro: Nenhum dado retornado.');
//         return;
//       }

//       const targetElement = document.querySelector('#fornecedorTabela');
//       if (!targetElement) {
//         console.error('Erro: Elemento de destino não encontrado.');
//         return;
//       }

//       console.log('Initializing DataTable...');
//       new setDataTable(targetElement, {
       
//         columns: [
//           { data: 'idFornecedor' },
//           { data: 'representanteImpresa' },
//           { data: 'telefoneRepresentante' },
//           { data: 'cargoRepresentante' },
//           { data: 'cpfRepresentante' },
//           { data: 'nomeImpresa' },
//           { data: 'email' },
//           { data: 'telefoneImpresa' },
//           { data: 'cnpj' },
//           { data: 'endereco' },
//           { data: 'siteImpresa' },
//         ],
//         dataTable: modifiedData,
//          destroy: true,
//       });
//       setFornecedores(modifiedData);
      
      
//     } catch (error) {
//       console.error("Erro ao buscar Fornecedor:", error);
//     }
//   };

//   fetchData();
// }, []);



  // const handleExcluirFornecedor = async (idFornecedor) => {
  //   try {
  //     await axios.delete(`http://localhost:3001/fornecedor/${idFornecedor}`);
  //     // Atualiza a lista de fornecedores após a exclusão
  //     const { data } = await axios.get("http://localhost:3001/fornecedor");
  //     // setFornecedores(data);
  //     console.log("Fornecedor excluído com sucesso!");
  //   } catch (error) {
  //     console.error("Erro ao excluir Fornecedor:", error);
  //   }
  // };

  return (
    <table id="fornecedorTabela" class="table table-striped compact" style={{ width: "100%" }} >
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
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default TabelaFornecedor;