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
import { Divider } from 'primereact/divider';
import PagamentoForm from "../Components/PagamentoForm";


const TabelaProdutos = () => {
  const [filters, setFilters] = useState(null); //filtro
  const [globalFilterValue, setGlobalFilterValue] = useState(''); //filtro global
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const [selectedProdutos, setSelectedProdutos] = useState(null);

  const [colores] = useState(['Pendente', 'Paga', 'Atrasada', 'Cancelada']);

  const getColors = (colors) => {
    switch (colors) {
      case 'Pendente':
        return 'danger';

        case 'Paga':
          return 'success';
     
      case 'Atrasada':
        return 'info';

      case 'Cancelada':
        return 'secondary';

    }
  };


  //paginação
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;



  //link para pegar os dados
  useEffect(() => {
    axios.get("http://localhost:3001/produtos")
      .then((res) => setProdutos(res.data))
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

      descricao: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

      categoria: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

      nomePagamento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

      dataEmissao: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },

      dataVencimento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

      valor: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

      parcelamento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },

      status: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },
    });
    setGlobalFilterValue('');
  };



  //componente para limpar o input de texto com o filtro global
  const renderHeader = () => {
    return (
      <div className="listaTabelaHeader align-content-center px-3 mb-3 border-round-lg" style={{ backgroundColor: 'whitesmoke' }}>
        <div className='flex  align-items-center'>
          <i className="pi pi-filter" style={{ fontSize: '1.3rem' }}></i>
          <h5>Buscar registros</h5>
        </div>
        <div className="flex  mb-3">
          <div className='flex'>
          <Button
            className='mr-2 border-round-lg'
            label="Excluir"
            icon="pi pi-trash"
            severity="danger"
            onClick={() => setVisible(true)}
            disabled={!selectedProdutos || !selectedProdutos.length}
          />
         <Button className='border-round-lg' type="button" icon="pi pi-filter-slash" label="Limpar" outlined onClick={clearFilter} />
          </div>
          <IconField iconPosition="left" className='ml-2 align-content-center' style={{ width: "100%" }}>
            <InputIcon className="pi pi-search" />
            <InputText className='border-round-lg' style={{ width: "100%" }} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Pesquisar registro..." />
          </IconField>
        </div>
      </div>
    );
  };


  const renderHeaderTable = () => {
    return (
      <div>
        <div className='flex  px-3 mt-1 align-items-center'>
          <i className="pi pi-wallet" style={{ fontSize: '1.5rem' }}></i>
          <h5>Contas a pagar</h5>
        </div>
        <Divider className='mt-0' />
        <PagamentoForm />
      </div>
    );
  };

  //filtro de status
  const colorBodyTemplate = (rowData) => {
    return <Tag value={rowData.cor} severity={getColors(rowData.cor)} />;
  };

  const colorFilterTemplate = (options) => {
    return <Dropdown value={options.value} options={colores} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={colorItemTemplate} placeholder="Selecione uma cor" className="p-column-filter" showClear />;
  };

  const colorItemTemplate = (option) => {
    return <Tag value={option} severity={getColors(option)} />;
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
      life: 3000,
    });
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
  const deleteSelectedProducts = () => {

    let _products = produtos.filter((id) => selectedProdutos.includes(id));


    setProdutos(_products);
    setSelectedProdutos(null);

    function excluirSelecionados(item, index) {
      handleExcluirVariosProduto(item.idCarro);
      console.log(item.idCarro);
    }

    _products.forEach(excluirSelecionados);

    setVisible(false)
    toast.current.show({
      severity: 'success',
      summary: 'Ação bem-sucedida!',
      detail: 'Registros deletados',
      life: 3000,
    });
  };

  const reject = () => {
    setVisible(false)
    toast.current.show({ severity: 'warn', summary: 'Ação não realizada', detail: 'Os registros selecionados não foram excluídos.', life: 3000 });

  }

  const footerContent = (
    <div>
      <Button label="Não" icon="pi pi-times" onClick={reject} className="p-button-text border-round-lg" />
      <Button label="Sim" icon="pi pi-check" onClick={deleteSelectedProducts} autoFocus className='border-round-lg ' />
    </div>
  );

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
  const handleAtualizarProdutos = (e) => {

    let _products = [...produtos];
    let { newData, index } = e;

    _products[index] = newData;
    console.log(newData.idCarro);

    const formData = {
      ['idCarro']: newData.idCarro,
      ['descricao']: newData.descricao,
      ['categoria']: newData.categoria,
      ['nomePagamento']: newData.nomePagamento,
      ['dataEmissao']: newData.dataEmissao,
      ['dataVencimento']: newData.dataVencimento,
      ['valor']: newData.valor,
      ['parcelamento']: newData.parcelamento,
      ['status']: newData.status
    };


    console.log(formData);

    try {
      axios.put(`http://localhost:3001/produtos/${newData.idCarro}`, formData);
      toast.current.show({
        severity: 'success',
        summary: 'Ação bem-sucedida!',
        detail: 'Registro atualizado',
        life: 3000,
      });
    } catch (error) {
      console.error('Erro ao criar cadastro:', error);
      toast.current.show({
        severity: 'danger',
        summary: 'Ação não realizada!',
        detail: 'Registro não atualizado',
        life: 3000,
      });
    }

    setProdutos(_products);

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
  const colorEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={colores}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Selecione uma cor"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getColors(option)}></Tag>;
        }}
      />
    );
  };


  //o que, de fato, possibilita a edição (enable)
  const allowEdit = (rowData) => {
    return rowData.name !== 'Blue Band';
  };

  // Funções que estavam faltando
  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getColors(rowData.status)} />;
  };

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={colores}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Selecione uma cor"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getColors(option)}></Tag>;
        }}
      />
    );
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={colores}
        onChange={(e) => options.filterCallback(e.value)}
        placeholder="Selecione uma cor"
        showClear
      />
    );
  };

  const header = renderHeaderTable();



  return (
    <>
    <div >{renderHeader()}</div>
      <Toast ref={toast} style={{ zIndex: '99999' }} />
      <ConfirmDialog group="declarative" visible={visible} onHide={() => setVisible(false)} message="Tem certeza que quer excluír esses registros?"
        header="Confirmação" icon="pi pi-exclamation-triangle" footer={footerContent} />
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
            'descricao',
            'categoria',
            'nomePagamento',
            'dataEmissao',
            'dataVencimento',
            'valor',
            'parcelamento',
            'status',
          ]} //indicando as células que serão filtradas
          paginator //paginação
          dataKey="idCarro"
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]} //selecionar quantas linhas estão visíveis
          tableStyle={{ minWidth: '130rem' }}
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}>
          <Column selectionMode="multiple" exportable={false}></Column>

          <Column field="descricao" header="Descrição" editor={(options) => textEditor(options)}></Column>

          <Column field="categoria" header="Categoria" editor={(options) => textEditor(options)}></Column>

          <Column field="nomePagamento" header="Nome do Pagamento" editor={(options) => textEditor(options)}></Column>

          <Column field="dataEmissao" header="Data de Emissão" editor={(options) => textEditor(options)}></Column>

          <Column field="dataVencimento" header="Data de Vencimento" editor={(options) => textEditor(options)}></Column>

          <Column field="valor" header="Valor" editor={(options) => textEditor(options)}></Column>

          <Column field="parcelamento" header="Parcelamento" editor={(options) => textEditor(options)}></Column>

          <Column field="status" header="Status" body={statusBodyTemplate} editor={(options) => statusEditor(options)} filter filterElement={statusFilterTemplate}></Column>

          <Column header="Editar" rowEditor={allowEdit} headerStyle={{ Width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>

          <Column header="Excluir" body={actionBodyTemplate} headerStyle={{ Width: '8rem' }} style={{ width: 'auto' }}></Column>
        </DataTable>
      </div>

    </>
  );
};

export default TabelaProdutos;
