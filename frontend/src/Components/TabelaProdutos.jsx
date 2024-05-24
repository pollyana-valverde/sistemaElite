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


const TabelaProdutos = () => {
  const [filters, setFilters] = useState(null); //filtro
  const [globalFilterValue, setGlobalFilterValue] = useState(''); //filtro global
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const toast = useRef(null);
  const [selectedProdutos, setSelectedProdutos] = useState(null);


//paginação
const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
const paginatorRight = <Button type="button" icon="pi pi-download" text />;



//link para pegar os dados
useEffect(() => {
  axios.get("http://localhost:3001/produtos").then((res) => setProdutos(res.data))
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

    marca: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    modelo: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    classificacao: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    cor: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    anoFabricacao: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    potencia: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    tipoMotor: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    tipoTransmissao: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    numeroIdentificacao: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    valor: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
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
      disabled={!selectedProdutos || !selectedProdutos.length}
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
const handleExcluirProduto = async (idCarro) => {
  try {
    await axios.delete(`http://localhost:3001/produtos/${idCarro}`);
    // Atualiza a lista de cadastros após a exclusão
    const { data } = await axios.get("http://localhost:3001/produtos");
    setProdutos(data);
    console.log("Usuário excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
  }
  //tipo um modal pequeno que avisa que foi bem sucedido
  toast.current.show({
    severity: 'success',
    summary: 'Ação bem-sucedida!',
    detail: 'Registro deletado',
    life: 3000,});
};

//pega os dados para serem excluídos pela url (geral)
const handleExcluirVariosProduto = async (idCarro) => {
  try {
    await axios.delete(`http://localhost:3001/produtos/${idCarro}`);
    // Atualiza a lista de cadastros após a exclusão
    const { data } = await axios.get("http://localhost:3001/produtos");
    setProdutos(data);
    console.log("Usuário excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
  }
  //tipo um modal pequeno que avisa que foi bem sucedido
};



//deleta os registros que foram selecinados
const deleteSelectedProducts =  () => {

  let _products = produtos.filter((id) => selectedProdutos.includes(id));
    

  setProdutos(_products);
  setSelectedProdutos(null);

  function excluirSelecionados(item, index) {
    handleExcluirVariosProduto(item.idCarro);
    console.log(item.idCarro); 
  }

_products.forEach(excluirSelecionados);


toast.current.show({
  severity: 'success',
  summary: 'Ação bem-sucedida!',
  detail: 'Registros deletados',
  life: 3000,});
};

const actionBodyTemplate = (produtos) => {
  return (
    <React.Fragment>

<Button
icon="pi pi-trash"
rounded
outlined
severity="danger"
className='border-round-lg '
onClick={() => handleExcluirProduto(produtos.idCarro)}
/>
                  
    </React.Fragment>
  );
};


//////////////////////////////////////////// editar e atualizar dados com inputs ////////////////////////////

//função que atualiza o dato e mostra o pop-up
const handleAtualizarProdutos =  (e) => {
  
  let _products = [...produtos];
  let { newData, index } = e;

  _products[index] = newData;
  console.log(newData.idCarro);

  console.log(_products)

  setProdutos(_products);
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
      onRowEditComplete={handleAtualizarProdutos} //executa quando terminar de fazer a edição
      selection={selectedProdutos}
      onSelectionChange={(e) => setSelectedProdutos(e.value)}
      showGridlines //mostrar linhas da tabela
      stripedRows //linhas de cores diferentes
      removableSort //a partir do 3° click na ordenação volta ao estado inicial (sem ordenação)
      loading={loading}
      value={produtos} //dados que serão pegos
      filters={filters} //renderizando o filtro
      header={header} //cabeçalho da tabela com o filtro global e o limpador
      emptyMessage="Nenhum Registro encontrado."
      globalFilterFields={[
        'idCarro', 
        'marca', 
        'modelo', 
        'classificacao', 
        'cor',
        'anoFabricacao',
        'potencia',
        'tipoMotor',
        'tipoTransmissao',
        'numeroIdentificacao',
        'valor',
      ]} //indicando as células que serão filtradas
      paginator //paginação
      dataKey="idCarro" 
      rows={12} 
      rowsPerPageOptions={[5, 10, 25, 50]} //selecionar quantas linhas estão visíveis
      tableStyle={{ minWidth: '200rem' }}
      paginatorLeft={paginatorLeft} 
      paginatorRight={paginatorRight}>
        <Column selectionMode="multiple" exportable={false}></Column>

        <Column field="idCarro" sortable   header="idCarro" style={{ width: 'auto' }}></Column>

        <Column field="marca" filter filterPlaceholder="Filtre pelo nome" sortable  header="marca" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="modelo" filter filterPlaceholder="Filtre pelo final do telefone" sortable  header="modelo" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="classificacao" filter filterPlaceholder="Filtre pelo cargo" sortable  header="classificacao" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="cor" filter filterPlaceholder="Filtre pelo final do cpf" sortable  header="cor" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="anoFabricacao" filter filterPlaceholder="Filtre pelo nome da impresa" sortable  header="anoFabricacao" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="potencia" filter filterPlaceholder="Filtre pelo potencia" sortable  header="potencia" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
        
        <Column field="tipoTransmissao" filter filterPlaceholder="Filtre pelo final do tipoTransmissao" sortable  header="tipoTransmissao" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="numeroIdentificacao" filter filterPlaceholder="Filtre pelo endereço" sortable  header="numeroIdentificacao" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="tipoMotor" filter filterPlaceholder="Filtre pelo telefone da impresa" sortable  header="tipoMotor" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="valor" filter filterPlaceholder="Filtre pelo nome do site" sortable  header="valor" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column header="Editar" rowEditor={allowEdit} headerStyle={{ Width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>

        <Column header="Excluir" body={actionBodyTemplate} headerStyle={{ Width: '8rem' }} style={{ width: 'auto' }}></Column>

          
      </DataTable>
  </div>

  </>
);
};

export default TabelaProdutos;