// CadastroForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const CadastroForm = () => {

  const { setToken } = useAuth();
  const navegacao = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    endereco: '',
    telefone: '',
    senha: ''
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
      await axios.post('http://localhost:3001/cadastros', formData);
      alert('Cadastro criado com sucesso!');
      // Limpar o formulário após o envio bem-sucedido
      setFormData({
        nome: '',
        email: '',
        cpf: '',
        endereco: '',
        telefone: '',
        senha: ''
      });

      setToken("Token de teste");

      navegacao("/", {replace: true});
    } catch (error) {
      console.error('Erro ao criar cadastro:', error);
      alert('Erro ao criar cadastro. Verifique o console para mais detalhes.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='formsSistema'>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>CPF</Form.Label>
        <Form.Control type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} />
      </Form.Group>
    </Row>

    <Row>
      <Col className="mb-3" xs={8}>
        <Form.Label>Endereço</Form.Label>
        <Form.Control type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} />
      </Col>
      <Col>
        <Form.Label>Telefone</Form.Label>
        <Form.Control type="number" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} />
      </Col>
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} />
      </Form.Group>
    </Row>

    <button className='btnFormSistema' type="submit">Salvar</button>
  </Form>
  );
};

export default CadastroForm;
