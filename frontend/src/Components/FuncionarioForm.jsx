// CadastroForm.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputMask } from 'primereact/inputmask';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


const FuncionarioForm = () => {
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('center');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    cargo: '',
    RegimeDeTrabalho: '',
    Salario: '',
    telefone: '',
    endereco: ''
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
      await axios.post('http://localhost:3001/funcionario', formData);
      toast.current.show({
        severity: 'success',
        summary: 'Funcionário cadastrado com sucesso!',
        life: 3000,
      });
      // Limpar o formulário após o envio bem-sucedido
      setFormData({
        nome: '',
        email: '',
        cpf: '',
        cargo: '',
        RegimeDeTrabalho: '',
        Salario: '',
        telefone: '',
        endereco: ''
      });
    } catch (error) {
      console.error('Erro ao criar cadastro:', error);
      toast.current.show({
        severity: 'error', summary: 'Erro ao cadastrar funcionário.',
        detail: 'Não foi possível realizar o cadastro.', life: 3000
      });
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
          </i><h5>Novo funcionário</h5>
        </Button>
      </div>

      <Dialog
        className='modalForm'
        header="Cadastrar funcionário"
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
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>CPF</Form.Label>
                <InputMask className='form-control' type="text" name="cpf" mask="999.999.999-99" placeholder="999.999.999-99" value={formData.cpf} onChange={handleChange} ></InputMask>
              </Form.Group>
            </Row>

            <Row className="mb-1">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Cargo</Form.Label>
                <Form.Control type="text" name="cargo" placeholder="Cargo" value={formData.cargo} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Regime de trabalho</Form.Label>
                <Form.Control as="select" type="text" name="RegimeDeTrabalho" placeholder="período" value={formData.registro} onChange={handleChange} >
                  <option className='selectOpitionForm' value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Integral">Integral</option>
                </Form.Control>
              </Form.Group>
            </Row>

            <Row>
              <Col>
                <Form.Label>Telefone</Form.Label>
                <InputMask className='form-control' type="text" name="telefone" mask="(99) 99999-9999" placeholder="(99) 99999-9999" value={formData.cpf} onChange={handleChange} ></InputMask>
              </Col>
              <Col className="mb-1" xs={8}>
                <Form.Label>Salario</Form.Label>
                <Form.Control type="text" name="Salario" placeholder="Salario" value={formData.Salario} onChange={handleChange} />
              </Col>
            </Row>

            <Row className="mb-1">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>endereco</Form.Label>
                <Form.Control type="text" name="endereco" placeholder="endereco" value={formData.endereco} onChange={handleChange} />
              </Form.Group>
            </Row>

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

export default FuncionarioForm;
