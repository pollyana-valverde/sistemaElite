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


export default function TabelaFornecedor() {
  const [filters, setFilters] = useState(null); //filtro
  const [globalFilterValue, setGlobalFilterValue] = useState(''); //filtro global
  const [loading, setLoading] = useState(false);
  const [fornecedores, setFornecedores] = useState([]);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const [selectedFornecedores, setSelectedFornecedores] = useState(null);

    //paginação
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;



    //link para pegar os dados
    useEffect(() => {
      axios.get("http://localhost:3001/fornecedor")
      .then((res) => setFornecedores(res.data))
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

      representanteImpresa: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

      telefoneRepresentante: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

      cargoRepresentante: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

      cpfRepresentante: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

      nomeImpresa: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

      email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

      telefoneImpresa: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

      cnpj: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

      endereco: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

      produtoServico: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
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
        disabled={!selectedFornecedores || !selectedFornecedores.length}
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
    

  setFornecedores(_products);
  setSelectedFornecedores(null);

  function excluirSelecionados(item, index) {
    handleExcluirVariosFornecedor(item.idFornecedor);
    console.log(item.idFornecedor); 
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


//função que atualiza o dato e mostra o pop-up
const handleAtualizarFornecedor =  (e) => {
  
  let _products = [...fornecedores];
  let { newData, index } = e;

  _products[index] = newData;
  console.log(newData.idFornecedor);

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
['produtoServico']: newData.produtoServico
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

  setFornecedores(_products);


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
            emptyMessage="Nenhum Registro encontrado."
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
              'produtoServico',
            ]} //indicando as células que serão filtradas
            paginator //paginação
            dataKey="idFornecedor" 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]} //selecionar quantas linhas estão visíveis
            tableStyle={{ minWidth: '200rem' }}
            paginatorLeft={paginatorLeft} 
            paginatorRight={paginatorRight}>
              <Column selectionMode="multiple" exportable={false}></Column>

              <Column field="idFornecedor" sortable   header="Identificação" style={{ width: 'auto', textAlign:'center' }}></Column>

              <Column field="representanteEmpresa" filter filterPlaceholder="Filtre pelo nome" sortable  header="Representante da Empresa" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="telefoneRepresentante" filter filterPlaceholder="Filtre pelo final do telefone" sortable  header="Telefone do representante" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="cargoRepresentante" filter filterPlaceholder="Filtre pelo cargo" sortable  header="Cargo do representante" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="cpfRepresentante" filter filterPlaceholder="Filtre pelo final do cpf" sortable  header="CPF do representante" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="nomeEmpresa" filter filterPlaceholder="Filtre pelo nome da Empresa" sortable  header="Nome da Empresa" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="email" filter filterPlaceholder="Filtre pelo email" sortable  header="Email" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
              
              <Column field="cnpj" filter filterPlaceholder="Filtre pelo final do cnpj" sortable  header="CNPJ" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="endereco" filter filterPlaceholder="Filtre pelo endereço" sortable  header="Endereço" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="telefoneEmpresa" filter filterPlaceholder="Filtre pelo telefone da Empresa" sortable  header="Telefone da Empresa" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column field="produtoServico" filter filterPlaceholder="Filtre pelo produto ou serviço" sortable  header="produto/Servico" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>

              <Column header="Editar" rowEditor={allowEdit} headerStyle={{ Width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>

              <Column header="Excluir" body={actionBodyTemplate} headerStyle={{ Width: '8rem' }} style={{ width: 'auto' }}></Column>

                
            </DataTable>
        </div>

        </>
    );
};
        




// const handleAtualizarFornecedor =  (e) => {
  //   // e.preventDefault();
  //   // try {
  //   //      axios.put('http://localhost:3001/fornecedor', values).then(res => {
  //   //       setValues({
  //   //         representanteImpresa: res.data.representanteImpresa,
  //   //         telefoneRepresentante: '',
  //   //         cargoRepresentante: '',
  //   //         cpfRepresentante: '',
  //   //         nomeImpresa: '',
  //   //         email: '',
  //   //         cnpj: '',
  //   //         endereco: '',
  //   //         telefoneImpresa: '',
  //   //         siteImpresa: ''
  //   //     });
  //   //     });
        
  //   //     // Limpar o formulário após o envio bem-sucedido
  //   //     alert('Fornecedor cadastrado com sucesso!');
  //   // } catch (error) {
  //   //     console.error('Erro ao cadastrar fornecedor:', error);
  //   //     alert('Erro ao cadastrar fornecedor. Verifique o console para mais detalhes.');
  //   // }
    
  //   let _products = [...fornecedores];
  //   let { newData, index } = e;
  
  //   _products[index] = newData;
  //   console.log(newData.idFornecedor);
  
  //   console.log(_products)
  
  //   setFornecedores(_products);
  //   toast.current.show({
  //         severity: 'success',
  //         summary: 'Ação bem-sucedida!',
  //         detail: 'Registro atualizado',
  //         life: 3000,});
  
  // };