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

const TabelaBoletim = () => {
  const [filters, setFilters] = useState(null); //filtro
  const [globalFilterValue, setGlobalFilterValue] = useState(''); //filtro global
  const [loading, setLoading] = useState(false);
  const [Boletim, setBoletim] = useState([]);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const [selectedBoletim, setSelectedBoletim] = useState(null);

  const [statuses] = useState(['aprovado', 'reprovado']);

  const getStatus = (situacao) => {
      switch (situacao) {
          case 'aprovado':
              return 'success';

          case 'reprovado':
              return 'danger';
      }
  };


//paginação
const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
const paginatorRight = <Button type="button" icon="pi pi-download" text />;



//link para pegar os dados
useEffect(() => {
  axios.get("http://localhost:3001/Boletim")
  .then((res) => setBoletim(res.data))
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

    nomeAluno: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

    semestre: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

    materia: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

    nota1: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

    nota2: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    nota3: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

    notaFinal: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },

    situacao: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

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
      disabled={!selectedBoletim || !selectedBoletim.length}
    />
        <Button className='border-round-lg' type="button" icon="pi pi-filter-slash" label="Limpar" outlined onClick={clearFilter} />
      </div>
        <IconField iconPosition="left" className=' align-content-center'>
            <InputIcon className="pi pi-search" />
            <InputText className='border-round-lg' style={{width:"100%"}} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Pesquisar registro..." />
        </IconField>
    </div>
);
};

//filtro de status
const statusBodyTemplate = (rowData) => {
  return <Tag value={rowData.situacao} severity={getStatus(rowData.situacao)} />;
};

const statusFilterTemplate = (options) => {
  return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Selecione um" className="p-column-filter" showClear />;
};

const statusItemTemplate = (option) => {
  return <Tag value={option} severity={getStatus(option)} />;
};

///////////////////////////////// deletar linha da tabela ////////////////////////////////

//pega os dados para serem excluídos pela url (específico)
const handleExcluirContaPagar = async (idBoletim) => {
  try {
    await axios.delete(`http://localhost:3001/Boletim/${idBoletim}`);
    // Atualiza a lista de cliente após a exclusão
    const { data } = await axios.get("http://localhost:3001/Boletim");
    setBoletim(data);
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
const handleExcluirVariosBoletim = async (idBoletim) => {
  try {
    await axios.delete(`http://localhost:3001/Boletim/${idBoletim}`);
    // Atualiza a lista de cliente após a exclusão
    const { data } = await axios.get("http://localhost:3001/Boletim");
    setBoletim(data);
    console.log("Cliente excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
  }
  //tipo um modal pequeno que avisa que foi bem sucedido
};



//deleta os registros que foram selecinados
const deleteSelectedProducts =  () => {

  let _products = Boletim.filter((id) => selectedBoletim.includes(id));
    

  setBoletim(_products);
  setSelectedBoletim(null);

  function excluirSelecionados(item, index) {
    handleExcluirVariosBoletim(item.idBoletim);
    console.log(item.idBoletim); 
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


const actionBodyTemplate = (Boletim) => {
  return (
    <React.Fragment>

<Button
icon="pi pi-trash"
rounded
outlined
severity="danger"
className='border-round-lg '
onClick={() => handleExcluirContaPagar(Boletim.idBoletim)}
/>
                  
    </React.Fragment>
  );
};

//////////////////////////////////////////// editar e atualizar dados com inputs ////////////////////////////

//função que atualiza o dato e mostra o pop-up
const handleAtualizarBoletim =  (e) => {
  
  let _products = [...Boletim];
  let { newData, index } = e;

  _products[index] = newData;
  console.log(newData.idBoletim);

  const formData ={
    ['idBoletim']: newData.idBoletim,
    ['nomeAluno']: newData.clasificacao,
['semestre']: newData.valorPagar,
['materia']: newData.vencimento,
['nota1']: newData.empresa,
['nota2']: newData.contaBancaria,
['nota3']: newData.descricao,
['notaFinal']: newData.status,
['situacao']: newData.valorPago,

  };

  
  console.log(formData);

  try {
     axios.put(`http://localhost:3001/Boletim/${newData.idBoletim}`, formData);
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

  setBoletim(_products);

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
      onRowEditComplete={handleAtualizarBoletim} //executa quando terminar de fazer a edição
      selection={selectedBoletim}
      onSelectionChange={(e) => setSelectedBoletim(e.value)}
      showGridlines //mostrar linhas da tabela
      stripedRows //linhas de cores diferentes
      removableSort //a partir do 3° click na ordenação volta ao estado inicial (sem ordenação)
      loading={loading}
      value={Boletim} //dados que serão pegos
      filters={filters} //renderizando o filtro
      header={header} //cabeçalho da tabela com o filtro global e o limpador
      emptyMessage="Nenhum Registro encontrado."
      globalFilterFields={[
        'idBoletim', 
        'nomeAluno',
        'semestre', 
        'materia', 
        'nota1', 
        'nota2',
        'nota3',
        'notaFinal',
        'situacao',
       
      ]} //indicando as células que serão filtradas
      paginator //paginação
      dataKey="idBoletim" 
      rows={5} 
      rowsPerPageOptions={[5, 10, 25, 50]} //selecionar quantas linhas estão visíveis
      tableStyle={{ minWidth: '140rem' }}
      paginatorLeft={paginatorLeft} 
      paginatorRight={paginatorRight}>
        <Column selectionMode="multiple" exportable={false}></Column>

        <Column field="idBoletim" sortable   header="Identificação" style={{ width: 'auto', textAlign: 'center' }}></Column>

        <Column field="nomeAluno" filter filterPlaceholder="Filtre pelo nome" sortable  header="nome do Aluno" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="semestre" filter filterPlaceholder="Filtre pelo semestre" sortable  header="Semestre" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="materia" filter filterPlaceholder="Filtre pela matéria" sortable  header="Matéria" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="nota1" filter filterPlaceholder="Filtre pela nota 1" sortable  header="Nota 1" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="nota2" filter filterPlaceholder="Filtre pela nota 2" sortable  header="Nota 2" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

        <Column field="nota3" filter filterPlaceholder="Filtre pela nota 3" sortable  header="Nota 3" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
        
        <Column field="notaFinal" filter filterPlaceholder="Filtre pela nota Final" sortable  header="Nota Final" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>


        <Column field="situacao" filter  filterMenuStyle={{ width: '14rem' }} body={statusBodyTemplate} filterElement={statusFilterTemplate}   sortable  header="Situação" editor={(options) => statusEditor(options)} style={{ width: 'auto' }}></Column>

        <Column header="Editar" rowEditor={allowEdit} headerStyle={{ Width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>

        <Column header="Excluir" body={actionBodyTemplate} headerStyle={{ Width: '8rem' }} style={{ width: 'auto' }}></Column>

          
      </DataTable>
  </div>

  </>
);
};

export default TabelaBoletim;