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


const TabelaContasPagar = () => {
  const [filters, setFilters] = useState(null); //filtro
  const [globalFilterValue, setGlobalFilterValue] = useState(''); //filtro global
  const [loading, setLoading] = useState(false);
  const [contasPagar, setContasPagar] = useState([]);
  const toast = useRef(null);
  const [selectedContasPagar, setSelectedContasPagar] = useState(null);



//paginação
const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
const paginatorRight = <Button type="button" icon="pi pi-download" text />;



//link para pegar os dados
useEffect(() => {
  axios.get("http://localhost:3001/contasPagar").then((res) => setContasPagar(res.data))
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

    clasificacao: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    valorPagar: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    vencimento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    empresa: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    contaBancaria: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    descricao: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    status: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    valorPago: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

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
      disabled={!selectedContasPagar || !selectedContasPagar.length}
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
const handleExcluirContaPagar = async (idcontaPagar) => {
  try {
    await axios.delete(`http://localhost:3001/contasPagar/${idcontaPagar}`);
    // Atualiza a lista de cliente após a exclusão
    const { data } = await axios.get("http://localhost:3001/contasPagar");
    setContasPagar(data);
    console.log("Cliente excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
  }
  //tipo um modal pequeno que avisa que foi bem sucedido
  toast.current.show({
    severity: 'success',
    summary: 'Ação bem-sucedida!',
    detail: 'Registro deletado',
    life: 3000,});
};


//pega os dados para serem excluídos pela url (geral)
const handleExcluirVariosContasPagar = async (idcontaPagar) => {
  try {
    await axios.delete(`http://localhost:3001/contasPagar/${idcontaPagar}`);
    // Atualiza a lista de cliente após a exclusão
    const { data } = await axios.get("http://localhost:3001/contasPagar");
    setContasPagar(data);
    console.log("Cliente excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
  }
  //tipo um modal pequeno que avisa que foi bem sucedido
};



//deleta os registros que foram selecinados
const deleteSelectedProducts =  () => {

  let _products = contasPagar.filter((id) => selectedContasPagar.includes(id));
    

  setContasPagar(_products);
  setSelectedContasPagar(null);

  function excluirSelecionados(item, index) {
    handleExcluirVariosContasPagar(item.idcontaPagar);
    console.log(item.idcontaPagar); 
  }

_products.forEach(excluirSelecionados);


toast.current.show({
  severity: 'success',
  summary: 'Ação bem-sucedida!',
  detail: 'Registros deletados',
  life: 3000,});
};

const actionBodyTemplate = (contasPagar) => {
  return (
    <React.Fragment>

<Button
icon="pi pi-trash"
rounded
outlined
severity="danger"
className='border-round-lg '
onClick={() => handleExcluirContaPagar(contasPagar.idcontaPagar)}
/>
                  
    </React.Fragment>
  );
};

//////////////////////////////////////////// editar e atualizar dados com inputs ////////////////////////////

//função que atualiza o dato e mostra o pop-up
const handleAtualizarContasPagar =  (e) => {
  
  let _products = [...contasPagar];
  let { newData, index } = e;

  _products[index] = newData;
  console.log(newData.idcontaPagar);

  console.log(_products)

  setContasPagar(_products);
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
      onRowEditComplete={handleAtualizarContasPagar} //executa quando terminar de fazer a edição
      selection={selectedContasPagar}
      onSelectionChange={(e) => setSelectedContasPagar(e.value)}
      showGridlines //mostrar linhas da tabela
      stripedRows //linhas de cores diferentes
      removableSort //a partir do 3° click na ordenação volta ao estado inicial (sem ordenação)
      loading={loading}
      value={contasPagar} //dados que serão pegos
      filters={filters} //renderizando o filtro
      header={header} //cabeçalho da tabela com o filtro global e o limpador
      emptyMessage="Nenhum Registro encontrado."
      globalFilterFields={[
        'idcontaPagar', 
        'clasificacao', 
        'valorPagar', 
        'vencimento', 
        'empresa',
        'contaBancaria',
        'descricao',
        'status',
        'valorPago',
      ]} //indicando as células que serão filtradas
      paginator //paginação
      dataKey="idcontaPagar" 
      rows={12} 
      rowsPerPageOptions={[5, 10, 25, 50]} //selecionar quantas linhas estão visíveis
      tableStyle={{ minWidth: '200rem' }}
      paginatorLeft={paginatorLeft} 
      paginatorRight={paginatorRight}>
        <Column selectionMode="multiple" exportable={false}></Column>

        <Column field="idcontaPagar" sortable   header="idcontaPagar" style={{ width: 'auto' }}></Column>

        <Column field="clasificacao" filter filterPlaceholder="Filtre pelo nome" sortable  header="clasificacao" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="valorPagar" filter filterPlaceholder="Filtre pelo final do telefone" sortable  header="valorPagar" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="vencimento" filter filterPlaceholder="Filtre pelo cargo" sortable  header="vencimento" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="empresa" filter filterPlaceholder="Filtre pelo final do cpf" sortable  header="empresa" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="contaBancaria" filter filterPlaceholder="Filtre pelo nome da impresa" sortable  header="contaBancaria" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="descricao" filter filterPlaceholder="Filtre pelo descricao" sortable  header="descricao" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
        
        <Column field="valorPago" filter filterPlaceholder="Filtre pelo final do valorPago" sortable  header="valorPago" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>


        <Column field="status" filter filterPlaceholder="Filtre pelo telefone da impresa" sortable  header="status" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column header="Editar" rowEditor={allowEdit} headerStyle={{ Width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>

        <Column header="Excluir" body={actionBodyTemplate} headerStyle={{ Width: '8rem' }} style={{ width: 'auto' }}></Column>

          
      </DataTable>
  </div>

  </>
);
};

export default TabelaContasPagar;