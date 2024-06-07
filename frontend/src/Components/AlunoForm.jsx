// CadastroAlunoForm.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputMask } from 'primereact/inputmask';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';


const CadastroAlunoForm = () => {
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: '',
    dataNascimento: '',
    matricula: '',
    anoLetivo: '',
    periodo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/alunos', formData);
      // alert('Aluno cadastrado com sucesso!');
      toast.current.show({
        severity: 'success',
        summary: 'Aluno cadastrado com sucesso!',
        life: 3000,
      });
      // Limpar o formulário após o envio bem-sucedido
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        endereco: '',
        dataNascimento: '',
        matricula: '',
        anoLetivo: '',
        periodo: ''
      });
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
      toast.current.show({ severity: 'error', summary: 'Erro ao cadastrar aluno.', detail: 'Não foi possível realizar o cadastro.', life: 3000 });
      // alert(' Verifique o console para mais detalhes.');
    }
  };


  const show = (position) => {
    setPosition(position);
    setVisible(true);
  };

  return (
    <div >
      <Toast ref={toast} style={{ zIndex: '99999' }} />
      <div className="flex justify-content-center ">
        <Button
          onClick={() => show('top')}
          className="p-button btnModal align-content-center p-0"
          style={{ minWidth: '10rem' }}
        >
          <i className="pi pi-plus-circle">
          </i><h5>Novo Aluno</h5>
        </Button>
      </div>

      <Dialog
      className='modalForm'
        header="Cadastrar aluno"
        visible={visible}
        position={position}
        style={{ width: '70vw', margin: '40px' }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        draggable={false}
        resizable={false}
      >
        <p className="mx-2">
          <Form onSubmit={handleSubmit} className='formsSistema'>
            <Row className="mb-1">
              <Form.Group as={Col} controlId="formGridNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              </Form.Group>
            </Row>

            <Row className="mb-1">
              <Form.Group as={Col} controlId="formGridTelefone">
                <Form.Label>Telefone</Form.Label>
                <InputMask className='form-control' type="text" name="telefone" mask="(99) 99999-9999" placeholder="(99) 99999-9999" value={formData.telefone} onChange={handleChange} ></InputMask>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCpf">
                <Form.Label>CPF</Form.Label>
                <InputMask className='form-control' type="text" name="cpf" mask="999.999.999-99" placeholder="999.999.999-99" value={formData.cpf} onChange={handleChange} ></InputMask>
              </Form.Group>
            </Row>

            <Row className="mb-1">
              <Form.Group as={Col} controlId="formGridEndereco">
                <Form.Label>Endereço</Form.Label>
                <Form.Control type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDataNascimento">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control type="date" name="dataNascimento" placeholder="Data de Nascimento" value={formData.dataNascimento} onChange={handleChange} />
              </Form.Group>
            </Row>

            <Row className="mb-1">
              <Form.Group as={Col} controlId="formGridMatricula">
                <Form.Label>Matrícula</Form.Label>
                <Form.Control type="text" name="matricula" placeholder="Matrícula" value={formData.matricula} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAnoLetivo">
                <Form.Label>Ano Letivo</Form.Label>
                <Form.Control type="text" name="anoLetivo" placeholder="Ano Letivo" value={formData.anoLetivo} onChange={handleChange} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridPeriodo">
              <Form.Label>Período</Form.Label>
              <Form.Control type="text" name="periodo" placeholder="Período" value={formData.periodo} onChange={handleChange} />
            </Form.Group>
            <Divider className='mt-5 mb-0' />
            <div className='btnFormSistema mt-3'>
              <button onClick={() => setVisible(false)} type="submit">Salvar</button>
            </div>
          </Form>
        </p>
      </Dialog>
    </div>
  );
};

export default CadastroAlunoForm;
