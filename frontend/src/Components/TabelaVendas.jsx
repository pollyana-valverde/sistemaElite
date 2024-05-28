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


const TabelaVendas = () => {
  const [filters, setFilters] = useState(null); //filtro
  const [globalFilterValue, setGlobalFilterValue] = useState(''); //filtro global
  const [loading, setLoading] = useState(false);
  const [vendas, setVendas] = useState([]);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const [selectedVendas, setSelectedVendas] = useState(null);

  const [metodes] = useState(['Débito', 'Crédito']);
  const [statuses] = useState(['Concluída', 'Pendente']);

  const getStatus = (status) => {
      switch (status) {
          case 'Concluída':
              return 'success';

          case 'Pendente':
              return 'danger';
      }
  };

  const getMetodos = (metods) => {
    switch (metods) {
        case 'Débito':
            return 'info';

        case 'Crédito':
            return null;
    }
};


//paginação
const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
const paginatorRight = <Button type="button" icon="pi pi-download" text />;



//link para pegar os dados
useEffect(() => {
  axios.get("http://localhost:3001/vendas")
  .then((res) => setVendas(res.data))
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

    dataHora: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

    numeroIdentCarro: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

    cliente: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    cpfFuncionario: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

    qtdProdutos: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

    valorUnidade: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

    metodoPagamento:{ operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },

    endereco: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },

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


//filtro de método de pagamento
const metodosBodyTemplate = (rowData) => {
  return <Tag value={rowData.metodoPagamento} severity={getMetodos(rowData.metodoPagamento)} />;
};

const metodosFilterTemplate = (options) => {
  return <Dropdown value={options.value} options={metodes} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={metodosItemTemplate} placeholder="Selecione um" className="p-column-filter" showClear />;
};

const metodosItemTemplate = (option) => {
  return <Tag value={option} severity={getMetodos(option)} />;
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

  const formData ={
    ['idFornecedor']: newData.idFornecedor,
    ['representanteImpresa']: newData.representanteImpresa,
['telefoneRepresentante']: newData.telefoneRepresentante,
['cargoRepresentante']: newData.cargoRepresentante,
['cpfRepresentante']: newData.cpfRepresentante,
['nomeImpresa']: newData.nomeImpresa,
['email']: newData.email,
['telefoneImpresa']: newData.telefoneImpresa,
['cnpj']: newData.cnpj,
['endereco']: newData.endereco,
['siteImpresa']: newData.siteImpresa
  };

  
  console.log(formData);

  try {
     axios.put(`http://localhost:3001/fornecedor/${newData.idFornecedor}`, formData);
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


  setVendas(_products);
 

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


//editor em select para o metodo de pagamento (o template do editor usa o mesmo que o do filtro do status)
const metodsEditor = (options) => {
  return (
      <Dropdown
          value={options.value}
          options={metodes}
          onChange={(e) => options.editorCallback(e.value)}
          placeholder="Selecione um método"
          itemTemplate={(option) => {
              return <Tag value={option} severity={getMetodos(option)}></Tag>;
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
        'metodoPagamento',
        'endereco',
        'status',
      ]} //indicando as células que serão filtradas
      paginator //paginação
      dataKey="codigoVenda" 
      rows={12} 
      rowsPerPageOptions={[5, 10, 25, 50]} //selecionar quantas linhas estão visíveis
      tableStyle={{ minWidth: '160rem' }}
      paginatorLeft={paginatorLeft} 
      paginatorRight={paginatorRight}>
        <Column selectionMode="multiple" exportable={false} style={{ width: '1.5%' }}></Column>

        <Column field="codigoVenda" sortable   header="Código de venda" style={{ width: '4%', textAlign: 'center'  }}></Column>

        <Column field="dataHora" filter filterPlaceholder="Filtre pela data" sortable  header="Data e horário" editor={(options) => textEditor(options)} style={{ width: '4%' }}></Column>

        <Column field="numeroIdentCarro" filter filterPlaceholder="Filtre pelo Número de identificação" sortable  header="Número de identificação" editor={(options) => textEditor(options)} style={{ width: '5%', textAlign: 'center' }}></Column>

        <Column field="cliente" filter filterPlaceholder="Filtre pelo nome" sortable  header="Cliente" editor={(options) => textEditor(options)} style={{ width: '3%' }}></Column>

        <Column field="cpfFuncionario" filter filterPlaceholder="Filtre pelo final do cpf" sortable  header="CPF do funcionário" editor={(options) => textEditor(options)} style={{ width: '3%', textAlign: 'center'  }}></Column>

        <Column field="qtdProdutos" filter filterPlaceholder="Filtre pel quantidade" sortable  header="Quantidade de produtos" editor={(options) => textEditor(options)} style={{ width: '5%', textAlign: 'center'  }}></Column>

        <Column field="valorUnidade" filter filterPlaceholder="Filtre pelo valor" sortable  header="Valor unidade" editor={(options) => textEditor(options)} style={{ width: '2%', textAlign: 'center' }} ></Column>
        
        <Column field="metodoPagamento" filter  filterMenuStyle={{ width: '14rem' }} body={metodosBodyTemplate} filterElement={metodosFilterTemplate} sortable  header="Método de pagamento" editor={(options) => metodsEditor(options)} style={{ width: '4%', textAlign: 'center' }}></Column>

        <Column field="endereco" filter filterPlaceholder="Filtre pelo endereço" sortable  header="Endereço" editor={(options) => textEditor(options)} style={{ width: '4%' }}></Column>

        <Column field="status" filter filterMenuStyle={{ width: '14rem' }} body={statusBodyTemplate} filterElement={statusFilterTemplate}   sortable  header="Status" editor={(options) => statusEditor(options)} style={{ width: '1%' }}></Column>

        <Column header="Editar" rowEditor={allowEdit}  style={{ width: '1%', alignItems: 'center' }} ></Column>

        <Column header="Excluir" body={actionBodyTemplate} style={{ width: '1.5%', alignItems: 'center' }}></Column>

          
      </DataTable>
  </div>

  </>
);
};

export default TabelaVendas;