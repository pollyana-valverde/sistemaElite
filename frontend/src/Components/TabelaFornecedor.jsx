import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';



export default function TabelaFornecedor() {
    const [filters, setFilters] = useState(null); //filtro
    const [globalFilterValue, setGlobalFilterValue] = useState(''); //filtro global
    const [loading, setLoading] = useState(false);
  const [fornecedores, setFornecedores] = useState([]);
  const toast = useRef(null);
  const [selectedFornecedores, setSelectedFornecedores] = useState(null);


//paginação
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;



    //link para pegar os dados
    useEffect(() => {
      axios.get("http://localhost:3001/fornecedor").then((res) => setFornecedores(res.data))
      setLoading(false);
      initFilters(); 
    }, []);



  ////////////////////////////////// filtro //////////////////////////

  //limpar filtro
  const clearFilter = () => {
      initFilters();
  };


  //filtro global (filtra tudo)
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
};


//função com o que será filtrado (filtro específico)
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



//componente para limpar o input de texto com o filtro global
const renderHeader = () => {
  return (
      <div className="flex justify-content-between">
        <div className='flex mb-3 px-3'>
        <Button
        className='mr-2 border-round-lg'
        label="Delete"
        icon="pi pi-trash"
        severity="danger"
        onClick={deleteSelectedProducts}
        disabled={!selectedFornecedores || !selectedFornecedores.length}
      />
          <Button className='border-round-lg' type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
        </div>
          <IconField iconPosition="left" className=' align-content-center'>
              <InputIcon className="pi pi-search" />
              <InputText className='border-round-lg' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
          </IconField>
      </div>
  );
};



///////////////////////////////// deletar linha da tabela ////////////////////////////////

//pega os dados para serem excluídos pela url (específico)
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
  //tipo um modal pequeno que avisa que foi bem sucedido
  toast.current.show({
    severity: 'success',
    summary: 'Ação bem-sucedida!',
    detail: 'Registro deletado',
    life: 3000,});
};


//pega os dados para serem excluídos pela url (geral)
const handleExcluirVariosFornecedor = async (idFornecedor) => {
  try {
    await axios.delete(`http://localhost:3001/fornecedor/${idFornecedor}`);
    // Atualiza a lista de fornecedores após a exclusão
    const { data } = await axios.get("http://localhost:3001/fornecedor");
    setFornecedores(data);
    console.log("Fornecedor excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir Fornecedor:", error);
  }
  //tipo um modal pequeno que avisa que foi bem sucedido
};



//deleta os registros que foram selecinados
const deleteSelectedProducts =  () => {

  let _products = fornecedores.filter((id) => selectedFornecedores.includes(id));
  
  // localStorage.setItem(setFornecedores, "_products");
  

  setFornecedores(_products);
  setSelectedFornecedores(null);

  function printar(item, index) {
    handleExcluirVariosFornecedor(item.idFornecedor);
    console.log(item.idFornecedor); 
  }

_products.forEach(printar);


toast.current.show({
  severity: 'success',
  summary: 'Ação bem-sucedida!',
  detail: 'Registros deletados',
  life: 3000,});
};

const actionBodyTemplate = (fornecedores) => {
  return (
    <React.Fragment>

<Button
icon="pi pi-trash"
rounded
outlined
severity="danger"
className='border-round-lg '
onClick={() => handleExcluirFornecedor(fornecedores.idFornecedor)}
/>
                  
    </React.Fragment>
  );
};

//////////////////////////////////////////// editar e atualizar dados com inputs ////////////////////////////

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setValues({
//       ...values,
//       [name]: value
//   });
// };

//função que atualiza o dato e mostra o pop-up
const handleAtualizarFornecedor =  (e) => {
  // e.preventDefault();
  // try {
  //      axios.put('http://localhost:3001/fornecedor', values).then(res => {
  //       setValues({
  //         representanteImpresa: res.data.representanteImpresa,
  //         telefoneRepresentante: '',
  //         cargoRepresentante: '',
  //         cpfRepresentante: '',
  //         nomeImpresa: '',
  //         email: '',
  //         cnpj: '',
  //         endereco: '',
  //         telefoneImpresa: '',
  //         siteImpresa: ''
  //     });
  //     });
      
  //     // Limpar o formulário após o envio bem-sucedido
  //     alert('Fornecedor cadastrado com sucesso!');
  // } catch (error) {
  //     console.error('Erro ao cadastrar fornecedor:', error);
  //     alert('Erro ao cadastrar fornecedor. Verifique o console para mais detalhes.');
  // }
  
  let _products = [...fornecedores];
  let { newData, index } = e;

  _products[index] = newData;

  setFornecedores(_products);
  toast.current.show({
        severity: 'success',
        summary: 'Ação bem-sucedida!',
        detail: 'Registro atualizado',
        life: 3000,});

};


//input para editar
const textEditor = (options) => {
    // <InputText type="text" value={values.value} onChange={handleChange} />;
  return <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
};


//o que, de fato, possibilita a edição (enable)
const allowEdit = (rowData) => {
  return rowData.name !== 'Blue Band';
};



const header = renderHeader();



    return (
        <>
        <Toast ref={toast} />
        <div className="card">
        {/* <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
        ></Toolbar> */}
        
            <DataTable 
            size='small'
            editMode="row" //modo de edição, no caso, a row toda
            onRowEditComplete={handleAtualizarFornecedor} //executa quando terminar de fazer a edição
            selection={selectedFornecedores}
            onSelectionChange={(e) => setSelectedFornecedores(e.value)}
            showGridlines //mostrar linhas da tabela
            stripedRows //linhas de cores diferentes
            removableSort //a partir do 3° click na ordenação volta ao estado inicial (sem ordenação)
            loading={loading}
            value={fornecedores} //dados que serão pegos
            filters={filters} //renderizando o filtro
            header={header} //cabeçalho da tabela com o filtro global e o limpador
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
            ]} //indicando as células que serão filtradas
            paginator //paginação
            dataKey="idFornecedor" 
            rows={3} 
            rowsPerPageOptions={[5, 10, 25, 50]} //selecionar quantas linhas estão visíveis
            tableStyle={{ minWidth: '200rem' }}
            paginatorLeft={paginatorLeft} 
            paginatorRight={paginatorRight}>
              <Column selectionMode="multiple" exportable={false}></Column>

              <Column field="idFornecedor" sortable   header="idFornecedor" style={{ width: 'auto' }}></Column>

              <Column field="representanteImpresa" filter filterPlaceholder="Filtre pelo nome" sortable  header="representanteImpresa" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="telefoneRepresentante" filter filterPlaceholder="Filtre pelo final do telefone" sortable  header="telefoneRepresentante" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="cargoRepresentante" filter filterPlaceholder="Filtre pelo cargo" sortable  header="cargoRepresentante" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="cpfRepresentante" filter filterPlaceholder="Filtre pelo final do cpf" sortable  header="cpfRepresentante" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="nomeImpresa" filter filterPlaceholder="Filtre pelo nome da impresa" sortable  header="nomeImpresa" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="email" filter filterPlaceholder="Filtre pelo email" sortable  header="email" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
              
              <Column field="cnpj" filter filterPlaceholder="Filtre pelo final do cnpj" sortable  header="cnpj" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="endereco" filter filterPlaceholder="Filtre pelo endereço" sortable  header="endereço" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="telefoneImpresa" filter filterPlaceholder="Filtre pelo telefone da impresa" sortable  header="telefoneImpresa" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="siteImpresa" filter filterPlaceholder="Filtre pelo nome do site" sortable  header="siteImpresa" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column header="Editar" rowEditor={allowEdit} headerStyle={{ Width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>

              <Column header="Excluir" body={actionBodyTemplate} headerStyle={{ Width: '8rem' }} style={{ width: 'auto' }}></Column>

                
            </DataTable>
        </div>

        </>
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