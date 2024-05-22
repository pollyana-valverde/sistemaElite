import React, { useState, useEffect } from 'react';
import axios from "axios";
// import { classNames } from 'primereact/utils';
// import { Dialog } from 'primereact/dialog';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
// import { Dropdown } from 'primereact/dropdown';
// import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
// import { ProgressBar } from 'primereact/progressbar';
// import { Calendar } from 'primereact/calendar';
// import { MultiSelect } from 'primereact/multiselect';
// import { Slider } from 'primereact/slider';
// import { Tag } from 'primereact/tag';
// import { TriStateCheckbox } from 'primereact/tristatecheckbox'

// import { CustomerService } from './service/CustomerService';

export default function TabelaFornecedor() {
  // const [customers, setCustomers] = useState(null);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [fornecedores, setFornecedores] = useState([]);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;


    useEffect(() => {
      axios.get("http://localhost:3001/fornecedor").then((res) => setFornecedores(res.data))
      setLoading(false);
      initFilters();
    }, []);

    const getCustomers = (data) => {
      return [...(data || [])].map((d) => {
          d.date = new Date(d.date);

          return d;
      });
  };

  const clearFilter = () => {
      initFilters();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
};

const initFilters = () => {
  setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },

      representanteImpresa: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

      telefoneRepresentante: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

      cargoRepresentante: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

      cpfRepresentante: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

      nomeImpresa: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

      email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

      telefoneImpresa: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

      cnpj: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

      endereco: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

      siteImpresa: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  });
  setGlobalFilterValue('');
};

const renderHeader = () => {
  return (
      <div className="flex justify-content-between">
          <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
          <IconField iconPosition="left">
              <InputIcon className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
          </IconField>
      </div>
  );
};

const header = renderHeader();



    return (
        <div className="card">
            <DataTable 
            showGridlines 
            stripedRows 
            removableSort 
            loading={loading}
            value={fornecedores}
            filters={filters} 
            header={header}
            emptyMessage="Nenhum fornecedor encontrado."
            globalFilterFields={[
              'idFornecedor', 
              'representanteImpresa', 
              'telefoneRepresentante', 
              'cargoRepresentante', 
              'cpfRepresentante',
              'nomeImpresa',
              'email',
              'telefoneImpresa',
              'cnpj',
              'endereco',
              'siteImpresa',
            ]}
            paginator 
            dataKey="idFornecedor" 
            rows={8} 
            rowsPerPageOptions={[5, 10, 25, 50]} 
            tableStyle={{ minWidth: '50rem' }}
            paginatorLeft={paginatorLeft} 
            paginatorRight={paginatorRight}>

              <Column field="idFornecedor" sortable  header="idFornecedor" style={{ width: '25%' }}></Column>

              <Column field="representanteImpresa" filter filterPlaceholder="Filtre pelo nome" sortable  header="representanteImpresa" style={{ width: '25%' }}></Column>

              <Column field="telefoneRepresentante" filter filterPlaceholder="Filtre pelo final do telefone" sortable  header="telefoneRepresentante" style={{ width: '25%' }}></Column>

              <Column field="cargoRepresentante" filter filterPlaceholder="Filtre pelo cargo" sortable  header="cargoRepresentante" style={{ width: '25%' }}></Column>

              <Column field="cpfRepresentante" filter filterPlaceholder="Filtre pelo final do cpf" sortable  header="cpfRepresentante" style={{ width: '25%' }}></Column>

              <Column field="nomeImpresa" filter filterPlaceholder="Filtre pelo nome da impresa" sortable  header="nomeImpresa" style={{ width: '25%' }}></Column>

              <Column field="email" filter filterPlaceholder="Filtre pelo email" sortable  header="email" style={{ width: '25%' }}></Column>
              
              <Column field="cnpj" filter filterPlaceholder="Filtre pelo final do cnpj" sortable  header="cnpj" style={{ width: '25%' }}></Column>

              <Column field="endereço" filter filterPlaceholder="Filtre pelo endereço" sortable  header="endereço" style={{ width: '25%' }}></Column>

              <Column field="telefoneImpresa" filter filterPlaceholder="Filtre pelo telefone da impresa" sortable  header="telefoneImpresa" style={{ width: '25%' }}></Column>

              <Column field="siteImpresa" filter filterPlaceholder="Filtre pelo nome do site" sortable  header="siteImpresa" style={{ width: '25%' }}></Column>

              {/* <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column> */}

              {/* <Column field="excluir" header="Ação" style={{ width: '25%' }}>
                <button
                  variant="danger"
                  // onClick={() => handleExcluirFornecedor(fornecedores.idFornecedor)}
                >
                  Excluir
                </button>
              </Column> */}
                
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