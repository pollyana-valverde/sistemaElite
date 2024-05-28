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
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const TabelaContasPagar = () => {
  const [filters, setFilters] = useState(null); //filtro
  const [globalFilterValue, setGlobalFilterValue] = useState(''); //filtro global
  const [loading, setLoading] = useState(false);
  const [contasPagar, setContasPagar] = useState([]);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const [selectedContasPagar, setSelectedContasPagar] = useState(null);

  const [statuses] = useState(['Baixado', 'Pendente']);

  const getStatus = (status) => {
      switch (status) {
          case 'Baixado':
              return 'success';

          case 'Pendente':
              return 'danger';
      }
  };


//paginação
const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
const paginatorRight = <Button type="button" icon="pi pi-download" text />;



//link para pegar os dados
useEffect(() => {
  axios.get("http://localhost:3001/contasPagar")
  .then((res) => setContasPagar(res.data))
  .catch(err => (err))
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

    clasificacao: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

    valorPagar: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

    vencimento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

    empresa: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

    contaBancaria: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    descricao: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },

    valorPago: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

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
      onClick={() => setVisible(true)}
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

//filtro de status
const statusBodyTemplate = (rowData) => {
  return <Tag value={rowData.status} severity={getStatus(rowData.status)} />;
};

const statusFilterTemplate = (options) => {
  return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Selecione um" className="p-column-filter" showClear />;
};

const statusItemTemplate = (option) => {
  return <Tag value={option} severity={getStatus(option)} />;
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

setVisible(false)
toast.current.show({
  severity: 'success',
  summary: 'Ação bem-sucedida!',
  detail: 'Registros deletados',
  life: 3000,});
};

const reject = () => {
  setVisible(false)
  toast.current.show({ severity: 'warn', summary: 'Ação não realizada', detail: 'Os registros selecionados não foram excluídos.', life: 3000 });
  
}

const footerContent = (
  <div>
      <Button label="Não" icon="pi pi-times" onClick={reject} className="p-button-text border-round-lg" />
      <Button label="Sim" icon="pi pi-check" onClick={deleteSelectedProducts} autoFocus  className='border-round-lg '/>
  </div>
);


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

  const formData ={
    ['idcontaPagar']: newData.idcontaPagar,
    ['clasificacao']: newData.clasificacao,
['valorPagar']: newData.valorPagar,
['vencimento']: newData.vencimento,
['empresa']: newData.empresa,
['contaBancaria']: newData.contaBancaria,
['descricao']: newData.descricao,
['status']: newData.status,
['valorPago']: newData.valorPago,

  };

  
  console.log(formData);

  try {
     axios.put(`http://localhost:3001/contasPagar/${newData.idcontaPagar}`, formData);
     toast.current.show({
      severity: 'success',
      summary: 'Ação bem-sucedida!',
      detail: 'Registro atualizado',
      life: 3000,});
      } catch (error) {
    console.error('Erro ao criar cadastro:', error);
    toast.current.show({
      severity: 'danger',
      summary: 'Ação não realizada!',
      detail: 'Registro não atualizado',
      life: 3000,});
  }

  setContasPagar(_products);

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


//editor em select para o status (o template do editor usa o mesmo que o do filtro do status)
const statusEditor = (options) => {
  return (
      <Dropdown
          value={options.value}
          options={statuses}
          onChange={(e) => options.editorCallback(e.value)}
          placeholder="Selecione um status"
          itemTemplate={(option) => {
              return <Tag value={option} severity={getStatus(option)}></Tag>;
          }}
      />
  );
};



//o que, de fato, possibilita a edição (enable)
const allowEdit = (rowData) => {
  return rowData.name !== 'Blue Band';
};



const header = renderHeader();

return (
  <>
 <Toast ref={toast} style={{zIndex: '99999'}} />
  <ConfirmDialog group="declarative"  visible={visible} onHide={() => setVisible(false)} message="Tem certeza que quer excluír esses registros?" 
                header="Confirmação" icon="pi pi-exclamation-triangle"   footer={footerContent}/>
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
      rows={5} 
      rowsPerPageOptions={[5, 10, 25, 50]} //selecionar quantas linhas estão visíveis
      tableStyle={{ minWidth: '140rem' }}
      paginatorLeft={paginatorLeft} 
      paginatorRight={paginatorRight}>
        <Column selectionMode="multiple" exportable={false}></Column>

        <Column field="idcontaPagar" sortable   header="idcontaPagar" style={{ width: 'auto', textAlign: 'center' }}></Column>

        <Column field="clasificacao" filter filterPlaceholder="Filtre pelo classifição" sortable  header="Classifição" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="valorPagar" filter filterPlaceholder="Filtre pelo valor" sortable  header="Valor a pagar" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="vencimento" filter filterPlaceholder="Filtre pelo data de vencimento" sortable  header="Vencimento" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="empresa" filter filterPlaceholder="Filtre pelo nome da impresa" sortable  header="Impresa" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="contaBancaria" filter filterPlaceholder="Filtre pelo nome da impresa" sortable  header="Conta bancaria" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="descricao" filter filterPlaceholder="Filtre pelo descrição" sortable  header="Descrição" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
        
        <Column field="valorPago" filter filterPlaceholder="Filtre pelo valor" sortable  header="Valor pago" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>


        <Column field="status" filter  filterMenuStyle={{ width: '14rem' }} body={statusBodyTemplate} filterElement={statusFilterTemplate}   sortable  header="Status" editor={(options) => statusEditor(options)} style={{ width: 'auto' }}></Column>

        <Column header="Editar" rowEditor={allowEdit} headerStyle={{ Width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>

        <Column header="Excluir" body={actionBodyTemplate} headerStyle={{ Width: '8rem' }} style={{ width: 'auto' }}></Column>

          
      </DataTable>
  </div>

  </>
);
};

export default TabelaContasPagar;