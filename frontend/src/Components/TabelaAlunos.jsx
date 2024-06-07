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
import { Divider } from 'primereact/divider';
import CadastroAlunoForm from './AlunoForm';

const TabelaAlunos = () => {
  const [filters, setFilters] = useState(null); //filtro
  const [globalFilterValue, setGlobalFilterValue] = useState(''); //filtro global
  const [loading, setLoading] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const [selectedAlunos, setSelectedAlunos] = useState(null);

  //paginação
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  //link para pegar os dados
  useEffect(() => {
    axios.get("http://localhost:3001/alunos")
      .then((res) => setAlunos(res.data))
      .catch(err => (err));
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
      email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      telefone: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },
      cpf: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.ENDS_WITH }] },
      endereco: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      dataNascimento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      matricula: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      anoLetivo: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      periodo: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    setGlobalFilterValue('');
  };

  //componente para limpar o input de texto com o filtro global
  const renderHeader = () => {
    return (
      <div className="align-content-center px-3 mb-3 border-round-lg" style={{ backgroundColor: 'whitesmoke' }}>
        <div className='flex  align-items-center'>
          <i className="pi pi-graduation-cap" style={{ fontSize: '1.3rem' }}></i>
          <h5>Alunos</h5>
        </div>
        <div className="flex  mb-3">
          <div className='flex'>
            <Button
              className='mr-2 border-round-lg'
              label="Excluir"
              icon="pi pi-trash"
              severity="danger"
              onClick={() => setVisible(true)}
              disabled={!selectedAlunos || !selectedAlunos.length}
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
          <i className="pi pi-graduation-cap" style={{ fontSize: '1rem' }}></i>
          <h5>Alunos</h5>
        </div>
        <Divider className='mt-0' />
        <CadastroAlunoForm />
      </div>
    );
  };


  ////////////////////////////////// deletar linha da tabela ////////////////////////////////

  //pega os dados para serem excluídos pela url (específico)
  const handleExcluirAluno = async (idAluno) => {
    try {
      await axios.delete(`http://localhost:3001/alunos/${idAluno}`);
      // Atualiza a lista de alunos após a exclusão
      const { data } = await axios.get("http://localhost:3001/alunos");
      setAlunos(data);
      console.log("Aluno excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
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
  const handleExcluirVariosAlunos = async (idAluno) => {
    try {
      await axios.delete(`http://localhost:3001/alunos/${idAluno}`);
      // Atualiza a lista de alunos após a exclusão
      const { data } = await axios.get("http://localhost:3001/alunos");
      setAlunos(data);
      console.log("Aluno excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    }
    //tipo um modal pequeno que avisa que foi bem sucedido
  };

  //deleta os registros que foram selecinados
  const deleteSelectedProducts = () => {
    let _products = alunos.filter((id) => selectedAlunos.includes(id));

    setAlunos(_products);
    setSelectedAlunos(null);

    function excluirSelecionados(item, index) {
      handleExcluirVariosAlunos(item.idAluno);
      console.log(item.idAluno);
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

  const actionBodyTemplate = (alunos) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          className='border-round-lg '
          onClick={() => handleExcluirAluno(alunos.idAluno)}
        />
      </React.Fragment>
    );
  };

  //////////////////////////////////////////// editar e atualizar dados com inputs ////////////////////////////

  //função que atualiza o dato e mostra o pop-up
  const handleAtualizarAlunos = (e) => {
    let _products = [...alunos];
    let { newData, index } = e;

    _products[index] = newData;
    console.log(newData.idAluno);

    const formData = {
      ['idAluno']: newData.idAluno,
      ['nome']: newData.nome,
      ['email']: newData.email,
      ['telefone']: newData.telefone,
      ['cpf']: newData.cpf,
      ['endereco']: newData.endereco,
      ['dataNascimento']: newData.dataNascimento,
      ['matricula']: newData.matricula,
      ['anoLetivo']: newData.anoLetivo,
      ['periodo']: newData.periodo
    };

    console.log(formData);

    try {
      axios.put(`http://localhost:3001/alunos/${newData.idAluno}`, formData);
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

    setAlunos(_products);
  };

  //input para editar
  const textEditor = (options) => {
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
          onRowEditComplete={handleAtualizarAlunos} //executa quando terminar de fazer a edição
          selection={selectedAlunos}
          onSelectionChange={(e) => setSelectedAlunos(e.value)}
          showGridlines //mostrar linhas da tabela
          stripedRows //linhas de cores diferentes
          removableSort //a partir do 3° click na ordenação volta ao estado inicial (sem ordenação)
          loading={loading}
          value={alunos} //dados que serão pegos
          filters={filters} //renderizando o filtro
          header={header}
          emptyMessage="Nenhum Registro encontrado."
          globalFilterFields={[
            'idAluno',
            'nome',
            'email',
            'telefone',
            'cpf',
            'endereco',
            'dataNascimento',
            'matricula',
            'anoLetivo',
            'periodo',
          ]} //indicando as células que serão filtradas
          paginator //paginação
          dataKey="idAluno"
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]} //selecionar quantas linhas estão visíveis
          tableStyle={{ minWidth: '190rem' }}
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}>
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column field="idAluno" sortable header="ID" style={{ width: 'auto', textAlign: 'center' }}></Column>
          <Column field="nome" filter filterPlaceholder="Filtre pelo nome" sortable header="Nome" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
          <Column field="email" filter filterPlaceholder="Filtre pelo email" sortable header="Email" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
          <Column field="telefone" filter filterPlaceholder="Filtre pelo telefone" sortable header="Telefone" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
          <Column field="cpf" filter filterPlaceholder="Filtre pelo CPF" sortable header="CPF" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
          <Column field="endereco" filter filterPlaceholder="Filtre pelo endereço" sortable header="Endereço" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
          <Column field="dataNascimento" filter filterPlaceholder="Filtre pela data de nascimento" sortable header="Data de Nascimento" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
          <Column field="matricula" filter filterPlaceholder="Filtre pela matrícula" sortable header="Matrícula" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
          <Column field="anoLetivo" filter filterPlaceholder="Filtre pelo ano letivo" sortable header="Ano Letivo" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
          <Column field="periodo" filter filterPlaceholder="Filtre pelo período" sortable header="Período" editor={(options) => textEditor(options)} style={{ width: 'auto' }}></Column>
          <Column header="Editar" rowEditor={allowEdit} headerStyle={{ width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
          <Column header="Excluir" body={actionBodyTemplate} headerStyle={{ width: '8rem' }} style={{ width: 'auto' }}></Column>
        </DataTable>
      </div>
    </>
  );
};

export default TabelaAlunos;
