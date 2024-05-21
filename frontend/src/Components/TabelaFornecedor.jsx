import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { CustomerService } from './service/CustomerService';

export default function PaginatorTemplateDemo() {
  const [fornecedores, setFornecedores] = useState([]);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    // useEffect(() => {
    //     CustomerService.getCustomersMedium().then((dataSet) => setCustomers(dataSet));
    // }, []);

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

    // const dataSet = axios.get("http://localhost:3001/fornecedor");

    return (
        <div className="card">
            <DataTable value={fornecedores} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>

{fornecedores.map((fornecedores) => (
            <Column key={fornecedores.idFornecedor}>
              <Column field="idFornecedor" header="Name" style={{ width: '25%' }}></Column>
              <Column field="representanteImpresa" header="Name" style={{ width: '25%' }}></Column>
              <Column field="telefoneRepresentante" header="Name" style={{ width: '25%' }}></Column>
              <Column field="cargoRepresentante" header="Name" style={{ width: '25%' }}></Column>
              <Column field="cpfRepresentante" header="Name" style={{ width: '25%' }}></Column>
              <Column field="nomeImpresa" header="Name" style={{ width: '25%' }}></Column>
              <Column field="email" header="Name" style={{ width: '25%' }}></Column>
              <Column field="cnpj" header="Name" style={{ width: '25%' }}></Column>
              <Column field="endereço" header="Name" style={{ width: '25%' }}></Column>
              <Column field="telefoneImpresa" header="Name" style={{ width: '25%' }}></Column>
              <Column field="siteImpresa" header="Name" style={{ width: '25%' }}></Column>
              <Column field="excluir" header="Ação" style={{ width: '25%' }}>
                <button
                  variant="danger"
                  // onClick={() => handleExcluirFornecedor(fornecedores.idFornecedor)}
                >
                  Excluir
                </button>
              </Column>
            </Column>
          ))}
                
            </DataTable>
        </div>
    );
}
        


// import DataTable from 'datatables.net-dt';


// const TabelaFornecedor = () => {
//   const [fornecedores, setFornecedores] = useState([]);
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

//   return (
//     <table id="fornecedorTabela" class="table table-striped compact" style={{ width: "100%" }} >
//       <thead>
//         <tr>
//           <th>ID da impresa</th>
//           <th>Representante da impresa</th>
//           <th>Telefone do representante</th>
//           <th>Cargo do representante</th>
//           <th>CPF do representante</th>
//           <th>Nome da impresa</th>
//           <th>Email</th>
//           <th>CNPJ</th>
//           <th>Endereço</th>
//           <th>Telefone da impresa</th>
//           <th>Site da impresa</th>
//           <th>Ação</th>
//         </tr>
//       </thead>
//       <tbody></tbody>
//     </table>
//   );
// };

// export default TabelaFornecedor;