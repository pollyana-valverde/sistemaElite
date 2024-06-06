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

const TabelaContasReceber = () => {
    const [filters, setFilters] = useState(null); //filtro
    const [globalFilterValue, setGlobalFilterValue] = useState(''); //filtro global
    const [loading, setLoading] = useState(false);
    const [contasReceber, setContasReceber] = useState([]);
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const [selectedContasReceber, setSelectedContasReceber] = useState(null);
  
    
    const [statuses] = useState(['Pago', 'Pendente']);

    const getStatus = (status) => {
        switch (status) {
            case 'Pago':
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
          axios.get("http://localhost:3001/contasReceber")
          .then((res) => setContasReceber(res.data))
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
  
      aluno: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  
      responsavel_financeiro: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  
      telefone: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  
      vencimento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  
      contaBancaria: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  
      descricao: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
  
      valor: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
      
      status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
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
        disabled={!selectedContasReceber || !selectedContasReceber.length}
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
  const handleExcluirContaReceber = async (idcontasReceber) => {
    try {
      await axios.delete(`http://localhost:3001/contasReceber/${idcontasReceber}`);
      // Atualiza a lista de fornecedores após a exclusão
      const { data } = await axios.get("http://localhost:3001/contasReceber");
      setContasReceber(data);
      console.log("Registro excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir Registro:", error);
    }
    //tipo um modal pequeno que avisa que foi bem sucedido
    toast.current.show({
      severity: 'success',
      summary: 'Ação bem-sucedida!',
      detail: 'Registro deletado',
      life: 3000,});
  };
  
  
  //pega os dados para serem excluídos pela url (geral)
  const handleExcluirVariosContasReceber = async (idcontasReceber) => {
    try {
      await axios.delete(`http://localhost:3001/contasReceber/${idcontasReceber}`);
      // Atualiza a lista de fornecedores após a exclusão
      const { data } = await axios.get("http://localhost:3001/contasReceber");
      setContasReceber(data);
      console.log("Registro excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir Registro:", error);
    }
    //tipo um modal pequeno que avisa que foi bem sucedido
  };
  
  
  
  //deleta os registros que foram selecinados
  const deleteSelectedProducts =  () => {
  
    let _products = contasReceber.filter((id) => selectedContasReceber.includes(id));
      
  
    setContasReceber(_products);
    setSelectedContasReceber(null);
  
    function excluirSelecionados(item, index) {
      handleExcluirVariosContasReceber(item.idcontasReceber);
      console.log(item.idcontasReceber); 
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
  
  const actionBodyTemplate = (contasReceber) => {
    return (
      <React.Fragment>
  
  <Button
  icon="pi pi-trash"
  rounded
  outlined
  severity="danger"
  className='border-round-lg '
  onClick={() => handleExcluirContaReceber(contasReceber.idcontasReceber)}
  />
                    
      </React.Fragment>
    );
  };

  //////////////////////////////////////////// editar e atualizar dados com inputs ////////////////////////////

//função que atualiza o dato e mostra o pop-up
const handleAtualizarContasReceber =  (e) => {
  
    let _products = [...contasReceber];
    let { newData, index } = e;
  
    _products[index] = newData;
    console.log(newData.idcontasReceber);
  
    const formData ={
      ['idcontasReceber']: newData.idcontasReceber,
      ['aluno']: newData.aluno,
  ['responsavel_financeiro']: newData.responsavel_financeiro,
  ['telefone']: newData.telefone,
  ['vencimento']: newData.vencimento,
  ['contaBancaria']: newData.contaBancaria,
  ['descricao']: newData.descricao,
  ['valor']: newData.valor,
  ['status']: newData.status,
    };
    
    
    console.log(formData);
  
    try {
       axios.put(`http://localhost:3001/contasReceber/${newData.idcontasReceber}`, formData);
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
  
    setContasReceber(_products);

  
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
        onRowEditComplete={handleAtualizarContasReceber} //executa quando terminar de fazer a edição
        selection={selectedContasReceber}
        onSelectionChange={(e) => setSelectedContasReceber(e.value)}
        showGridlines //mostrar linhas da tabela
        stripedRows //linhas de cores diferentes
        removableSort //a partir do 3° click na ordenação volta ao estado inicial (sem ordenação)
        loading={loading}
        value={contasReceber} //dados que serão pegos
        filters={filters} //renderizando o filtro
        header={header} //cabeçalho da tabela com o filtro global e o limpador
        emptyMessage="Nenhum Registro encontrado."
        globalFilterFields={[
          'idcontasReceber', 
          'aluno', 
          'responsavel_financeiro', 
          'telefone', 
          'vencimento',
          'contaBancaria',
          'descricao',
          'valor',
          'status',
          
        ]} //indicando as células que serão filtradas
        paginator //paginação
        dataKey="idcontasReceber" 
        rows={5} 
        rowsPerPageOptions={[5, 10, 25, 50]} //selecionar quantas linhas estão visíveis
        tableStyle={{ minWidth: '150rem' }}
        paginatorLeft={paginatorLeft} 
        paginatorRight={paginatorRight}>
          <Column selectionMode="multiple" exportable={false}></Column>

          <Column field="idcontasReceber" sortable   header="Identificação" style={{ width: 'auto', textAlign: 'center' }}></Column>

          <Column field="aluno" filter filterPlaceholder="Filtre pelo aluno" sortable  header="aluno" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

          <Column field="responsavel_financeiro" filter filterPlaceholder="Filtre pelo responsavel_financeiro" sortable  header="responsavel_financeiro" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

          <Column field="telefone" filter filterPlaceholder="Filtre pela data de telefone" sortable  header="telefone" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

          <Column field="vencimento" filter filterPlaceholder="Filtre pelo vencimento" sortable  header="vencimento" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

          <Column field="contaBancaria" filter filterPlaceholder="Filtre pelo contaBancaria" sortable  header="Conta bancaria" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

          <Column field="descricao" filter filterPlaceholder="Filtre pelo descricao" sortable  header="descricao" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
          
          <Column field="valor" filter filterPlaceholder="Filtre pelo final do valor" sortable  header="valor " editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

          <Column field="status" filter  filterMenuStyle={{ width: '14rem' }} body={statusBodyTemplate} filterElement={statusFilterTemplate}   sortable  header="Status" editor={(options) => statusEditor(options)} style={{ width: 'auto' }}></Column>

          <Column header="Editar" rowEditor={allowEdit} headerStyle={{ Width: '8rem' }} bodyStyle={{ alignItems: 'center' }}></Column>

          <Column header="Excluir" body={actionBodyTemplate} headerStyle={{ Width: '8rem' }} style={{ width: 'auto' }}></Column>

          
        </DataTable>
    </div>

    </>
);
};

export default TabelaContasReceber;













