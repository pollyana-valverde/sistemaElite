// CadastroForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


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
      await axios.post('http://localhost:3001/cadastroNovoUsuario', formData);
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

      // setToken("Token de teste");

      navegacao("/login");
    } catch (error) {
      console.error('Erro ao criar cadastro:', error);
      alert('Erro ao criar cadastro. Verifique o console para mais detalhes.');
    }
  };

  return (
    <Container className="formu" >
      <Row className='rowForms'>
        {/* <h2>Cadastro</h2> */}
        <Col lg={8}>
          <Form onSubmit={handleSubmit} className='formsSistemaCadastro'>
            <h2>Cadastro</h2>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Control type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Control type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} />
              </Form.Group>
            </Row>

            <Row>
              <Col className="mb-2" xs={8}>
                <Form.Control type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} />
              </Col>
              <Col>
                <Form.Control type="number" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} />
              </Col>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Control type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Control type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} />
              </Form.Group>
            </Row>

            <div className='btnCadastroPai'>
              <button className='btnFormSistema btnCadastro' type="submit">Salvar</button>

            </div>
            <br />Já tem uma conta? Faça<Link className="link" to="/login"> Login</Link>


          </Form>
        </Col>
      </Row>
    </Container>

  );
};

export default CadastroForm;
