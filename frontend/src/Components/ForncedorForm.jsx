// CadastroForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputMask } from 'primereact/inputmask';

const FornecedorForm = () => {
    const [formData, setFormData] = useState({
        representanteEmpresa: '',
        telefoneRepresentante: '',
        cargoRepresentante: '',
        cpfRepresentante: '',
        nomeEmpresa: '',
        email: '',
        cnpj: '',
        endereco: '',
        telefoneEmpresa: '',
        produtoServico: ''
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
            await axios.post('http://localhost:3001/fornecedor', formData);
            alert('Fornecedor cadastrado com sucesso!');
            // Limpar o formulário após o envio bem-sucedido
            setFormData({
                representanteEmpresa: '',
                telefoneRepresentante: '',
                cargoRepresentante: '',
                cpfRepresentante: '',
                nomeEmpresa: '',
                email: '',
                cnpj: '',
                endereco: '',
                telefoneEmpresa: '',
                produtoServico: ''
            });
        } catch (error) {
            console.error('Erro ao cadastrar fornecedor:', error);
            alert('Erro ao cadastrar fornecedor. Verifique o console para mais detalhes.');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className='formsSistema'>

            <Form.Group className="mb-2 mt-2" controlId="formGridAddress1">
                <Form.Label>Representante da empresa</Form.Label>
                <Form.Control type="text" name="representanteEmpresa" placeholder="Representante da Empresa" value={formData.representanteEmpresa} onChange={handleChange} />
            </Form.Group>


            <Row>
                <Col className="mb-1" xs={4}>
                    <Form.Label>Telefone do representante</Form.Label>
                    <InputMask className='form-control' type="text" name="telefoneRepresentante" mask="(99) 99999-9999" placeholder="(99) 99999-9999" value={formData.telefoneRepresentante} onChange={handleChange} ></InputMask>
                </Col>
                <Col>
                    <Form.Label>Cargo do representante</Form.Label>
                    <Form.Control type="text" name="cargoRepresentante" placeholder="Cargo do representante" value={formData.cargoRepresentante} onChange={handleChange} />
                </Col>
                <Col>
                    <Form.Label>CPF do representante</Form.Label>
                    <InputMask className='form-control' type="text" name="cpfRepresentante" mask="999.999.999-99" placeholder="999.999.999-99" value={formData.cpfRepresentante} onChange={handleChange} ></InputMask>
                </Col>
            </Row>

            <Row>
                <Col className="mb-1" xs={4}>
                    <Form.Label>Nome da empresa</Form.Label>
                    <Form.Control type="text" name="nomeEmpresa" placeholder="Nome da Empresa" value={formData.nomeEmpresa} onChange={handleChange} />
                </Col>
                <Col>
                    <Form.Label>Email da empresa</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                </Col>
                <Col>
                    <Form.Label>CNPJ</Form.Label>
                    <InputMask className='form-control' type="text" name="cnpj" mask="99.999.999/9999-99" placeholder="99.999.999/9999-99" value={formData.cnpj} onChange={handleChange} ></InputMask>
                </Col>
            </Row>

            <Row>
                <Col className="mb-1" xs={7}>
                    <Form.Label>Endereço da empresa</Form.Label>
                    <Form.Control type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} />
                </Col>
                <Col>
                    <Form.Label>Telefone da empresa</Form.Label>
                    <InputMask className='form-control' type="text" name="telefoneEmpresa" mask="(99) 99999-9999" placeholder="(99) 99999-9999" value={formData.telefoneEmpresa} onChange={handleChange} ></InputMask>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Produto/Serviço</Form.Label>
                <Form.Control type="text" name="produtoServico" placeholder="produto ou serviço" value={formData.produtoServico} onChange={handleChange} />
            </Form.Group>

            <button className='btnFormSistema' type="submit">Salvar</button>
        </Form>
    );
};

export default FornecedorForm;
