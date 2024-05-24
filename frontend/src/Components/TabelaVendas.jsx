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



const TabelaVendas = () => {
  const [filters, setFilters] = useState(null); //filtro
  const [globalFilterValue, setGlobalFilterValue] = useState(''); //filtro global
  const [loading, setLoading] = useState(false);
  const [vendas, setVendas] = useState([]);
  const toast = useRef(null);
  const [selectedVendas, setSelectedVendas] = useState(null);


//paginação
const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
const paginatorRight = <Button type="button" icon="pi pi-download" text />;



//link para pegar os dados
useEffect(() => {
  axios.get("http://localhost:3001/vendas").then((res) => setVendas(res.data))
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

    dataHora: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    numeroIdentCarro: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    cliente: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    cpfFuncionario: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    qtdProdutos: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    valorUnidade: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    valorTotal: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    metodoPagamento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    endereco: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    status: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
});
setGlobalFilterValue('');
};



//componente para limpar o input de texto com o filtro global
const renderHeader = () => {
return (
    <div className="flex justify-content-between ">
      <div className='flex mb-3 px-3 mt-3'>
      <Button
      className='mr-2 border-round-lg'
      label="Excluir"
      icon="pi pi-trash"
      severity="danger"
      onClick={deleteSelectedProducts}
      disabled={!selectedVendas || !selectedVendas.length}
    />
        <Button className='border-round-lg' type="button" icon="pi pi-filter-slash" label="Limpar" outlined onClick={clearFilter} />
      </div>
        <IconField iconPosition="left" className=' align-content-center'>
            <InputIcon className="pi pi-search" />
            <InputText className='border-round-lg' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Pesquisar registro..." />
        </IconField>
    </div>
);
};


///////////////////////////////// deletar linha da tabela ////////////////////////////////

//pega os dados para serem excluídos pela url (específico)
const handleExcluirVendas = async (codigoVenda) => {
  try {
    await axios.delete(`http://localhost:3001/vendas/${codigoVenda}`);
    // Atualiza a lista de fornecedores após a exclusão
    const { data } = await axios.get("http://localhost:3001/vendas");
    setVendas(data);
    console.log("Registro excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir Resgistro:", error);
  }
  //tipo um modal pequeno que avisa que foi bem sucedido
  toast.current.show({
    severity: 'success',
    summary: 'Ação bem-sucedida!',
    detail: 'Registro deletado',
    life: 3000,});
};


//pega os dados para serem excluídos pela url (geral)
const handleExcluirVariosVendas = async (codigoVenda) => {
  try {
    await axios.delete(`http://localhost:3001/vendas/${codigoVenda}`);
    // Atualiza a lista de fornecedores após a exclusão
    const { data } = await axios.get("http://localhost:3001/vendas");
    setVendas(data);
    console.log("Registro excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir Resgistro:", error);
  }
};



//deleta os registros que foram selecinados
const deleteSelectedProducts =  () => {

  let _products = vendas.filter((id) => selectedVendas.includes(id));
    

  setVendas(_products);
  setSelectedVendas(null);

  function excluirSelecionados(item, index) {
    handleExcluirVariosVendas(item.codigoVenda);
    console.log(item.codigoVenda); 
  }

_products.forEach(excluirSelecionados);


toast.current.show({
  severity: 'success',
  summary: 'Ação bem-sucedida!',
  detail: 'Registros deletados',
  life: 3000,});
};

const actionBodyTemplate = (vendas) => {
  return (
    <React.Fragment>

<Button
icon="pi pi-trash"
rounded
outlined
severity="danger"
className='border-round-lg '
onClick={() => handleExcluirVendas(vendas.codigoVenda)}
/>                
    </React.Fragment>
  );
};

//////////////////////////////////////////// editar e atualizar dados com inputs ////////////////////////////

//função que atualiza o dato e mostra o pop-up
const handleAtualizarVendas =  (e) => {
  
  let _products = [...vendas];
  let { newData, index } = e;

  _products[index] = newData;
  console.log(newData.codigoVenda);

  console.log(_products)

  setVendas(_products);
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

      <DataTable 
      size='small'
      editMode="row" //modo de edição, no caso, a row toda
      onRowEditComplete={handleAtualizarVendas} //executa quando terminar de fazer a edição
      selection={selectedVendas}
      onSelectionChange={(e) => setSelectedVendas(e.value)}
      showGridlines //mostrar linhas da tabela
      stripedRows //linhas de cores diferentes
      removableSort //a partir do 3° click na ordenação volta ao estado inicial (sem ordenação)
      loading={loading}
      value={vendas} //dados que serão pegos
      filters={filters} //renderizando o filtro
      header={header} //cabeçalho da tabela com o filtro global e o limpador
      emptyMessage="Nenhum Registro encontrado."
      globalFilterFields={[
        'codigoVenda', 
        'dataHora', 
        'numeroIdentCarro', 
        'cliente', 
        'cpfFuncionario',
        'qtdProdutos',
        'valorUnidade',
        'valorTotal',
        'metodoPagamento',
        'endereco',
        'status',
      ]} //indicando as células que serão filtradas
      paginator //paginação
      dataKey="codigoVenda" 
      rows={12} 
      rowsPerPageOptions={[5, 10, 25, 50]} //selecionar quantas linhas estão visíveis
      tableStyle={{ minWidth: '200rem' }}
      paginatorLeft={paginatorLeft} 
      paginatorRight={paginatorRight}>
        <Column selectionMode="multiple" exportable={false}></Column>

        <Column field="codigoVenda" sortable   header="codigoVenda" style={{ width: 'auto' }}></Column>

        <Column field="dataHora" filter filterPlaceholder="Filtre pelo data" sortable  header="dataHora" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="numeroIdentCarro" filter filterPlaceholder="Filtre pelo final do telefone" sortable  header="numeroIdentCarro" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="cliente" filter filterPlaceholder="Filtre pelo cargo" sortable  header="cliente" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="cpfFuncionario" filter filterPlaceholder="Filtre pelo final do cpf" sortable  header="cpfFuncionario" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="qtdProdutos" filter filterPlaceholder="Filtre pelo nome da impresa" sortable  header="qtdProdutos" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="valorUnidade" filter filterPlaceholder="Filtre pelo valorUnidade" sortable  header="valorUnidade" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
        
        <Column field="metodoPagamento" filter filterPlaceholder="Filtre pelo final do metodoPagamento" sortable  header="metodoPagamento" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="endereco" filter filterPlaceholder="Filtre pelo endereço" sortable  header="endereço" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="valorTotal" filter filterPlaceholder="Filtre pelo telefone da impresa" sortable  header="valorTotal" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="status" filter filterPlaceholder="Filtre pelo nome do site" sortable  header="status" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column header="Editar" rowEditor={allowEdit} headerStyle={{ Width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>

        <Column header="Excluir" body={actionBodyTemplate} headerStyle={{ Width: '8rem' }} style={{ width: 'auto' }}></Column>

          
      </DataTable>
  </div>

  </>
);
};

export default TabelaVendas;