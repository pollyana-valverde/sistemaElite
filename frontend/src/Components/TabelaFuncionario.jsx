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
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const  TabelaFuncionario= () => {
  const [filters, setFilters] = useState(null); //filtro
  const [globalFilterValue, setGlobalFilterValue] = useState(''); //filtro global
  const [loading, setLoading] = useState(false);
  const [funcionario, setFuncionario] = useState([]);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);


   
//paginação
const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
const paginatorRight = <Button type="button" icon="pi pi-download" text />;



//link para pegar os dados
useEffect(() => {
  axios.get("http://localhost:3001/funcionario")
  .then((res) => setFuncionario(res.data))
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

    nome: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH  }] },

    telefone: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    cpf: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    cargo: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    registro: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    endereco: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH  }] },

    senha: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

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
      disabled={!selectedFuncionario || !selectedFuncionario.length}
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

const handleExcluirFuncionario = async (idFuncionario) => {
  try {
    await axios.delete(`http://localhost:3001/funcionario/${idFuncionario}`);
    // Atualiza a lista de fornecedores após a exclusão
    const { data } = await axios.get("http://localhost:3001/funcionario");
    setFuncionario(data);
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
const handleExcluirVariosFuncionario = async (idFuncionario) => {
  try {
    await axios.delete(`http://localhost:3001/funcionario/${idFuncionario}`);
    // Atualiza a lista de cadastros após a exclusão
    const { data } = await axios.get("http://localhost:3001/funcionario");
    setFuncionario(data);
    console.log("Usuário excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
  }
  //tipo um modal pequeno que avisa que foi bem sucedido
};



//deleta os registros que foram selecinados
const deleteSelectedProducts =  () => {

  let _products = funcionario.filter((id) => selectedFuncionario.includes(id));
    

  setFuncionario(_products);
  setSelectedFuncionario(null);

  function excluirSelecionados(item, index) {
    handleExcluirVariosFuncionario(item.idFuncionario);
    console.log(item.idFuncionario); 
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

const actionBodyTemplate = (funcionario) => {
  return (
    <React.Fragment>

<Button
icon="pi pi-trash"
rounded
outlined
severity="danger"
className='border-round-lg '
onClick={() => handleExcluirFuncionario(funcionario.idFuncionario)}
/>
                  
    </React.Fragment>
  );
};

//////////////////////////////////////////// editar e atualizar dados com inputs ////////////////////////////

//função que atualiza o dato e mostra o pop-up
const handleAtualizarFuncionario =  (e) => {
  
  let _products = [...funcionario];
  let { newData, index } = e;

  _products[index] = newData;
  console.log(newData.idFuncionario);

  console.log(_products)

  setFuncionario(_products);
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
  <Toast ref={toast} style={{zIndex: '99999'}} />
  <ConfirmDialog group="declarative"  visible={visible} onHide={() => setVisible(false)} message="Tem certeza que quer excluír esses registros?" 
                header="Confirmação" icon="pi pi-exclamation-triangle"   footer={footerContent}/>
  <div className="card">

      <DataTable 
      size='small'
      editMode="row" //modo de edição, no caso, a row toda
      onRowEditComplete={handleAtualizarFuncionario} //executa quando terminar de fazer a edição
      selection={selectedFuncionario}
      onSelectionChange={(e) => setSelectedFuncionario(e.value)}
      showGridlines //mostrar linhas da tabela
      stripedRows //linhas de cores diferentes
      removableSort //a partir do 3° click na ordenação volta ao estado inicial (sem ordenação)
      loading={loading}
      value={funcionario} //dados que serão pegos
      filters={filters} //renderizando o filtro
      header={header} //cabeçalho da tabela com o filtro global e o limpador
      emptyMessage="Nenhum Registro encontrado."
      globalFilterFields={[
        'idFuncionario', 
        'nome', 
        'email', 
        'telefone', 
        'cpf',
        'cargo',
        'registro',
        'endereco',
        'senha',
      ]} //indicando as células que serão filtradas
      paginator //paginação
      dataKey="idFuncionario" 
      rows={12} 
      rowsPerPageOptions={[5, 10, 25, 50]} //selecionar quantas linhas estão visíveis
      tableStyle={{ minWidth: '150rem' }}
      paginatorLeft={paginatorLeft} 
      paginatorRight={paginatorRight}>
        <Column selectionMode="multiple" exportable={false}></Column>

        <Column field="idFuncionario" sortable   header="Identificação" style={{ width: 'auto', textAlign:'center' }}></Column>

        <Column field="nome" filter filterPlaceholder="Filtre pelo nome" sortable  header="Nome" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="email" filter filterPlaceholder="Filtre pelo email" sortable  header="Email" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="telefone" filter filterPlaceholder="Filtre pelo telefone" sortable  header="Telefone" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="cpf" filter filterPlaceholder="Filtre pelo final do cpf" sortable  header="CPF" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="cargo" filter filterPlaceholder="Filtre pelo cargo" sortable  header="Cargo" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="registro" filter filterPlaceholder="Filtre pelo registro" sortable  header="Registro" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="endereco" filter filterPlaceholder="Filtre pelo endereço" sortable  header="Endereço" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="senha" filter filterPlaceholder="Filtre pela senha" sortable  header="Senha" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column header="Editar" rowEditor={allowEdit} headerStyle={{ Width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>

        <Column header="Excluir" body={actionBodyTemplate} headerStyle={{ Width: '8rem' }} style={{ width: 'auto' }}></Column>

          
      </DataTable>
  </div>

  </>
);
};

export default TabelaFuncionario;