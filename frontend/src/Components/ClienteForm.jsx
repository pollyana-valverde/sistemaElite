// CadastroForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputMask } from 'primereact/inputmask';

const ClienteForm = () => {
    const [formData, setFormData] = useState({
        representanteImpresa: '',
        telefoneRepresentante: '',
        cargoRepresentante: '',
        cpfRepresentante: '',
        nomeImpresa: '',
        email: '',
        cnpj: '',
        endereco: '',
        telefoneImpresa: '',
        siteImpresa: ''
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
            await axios.post('http://localhost:3001/cliente', formData);
            alert('CLiente cadastrado com sucesso!');
            // Limpar o formulário após o envio bem-sucedido
            setFormData({
                representanteImpresa: '',
                telefoneRepresentante: '',
                cargoRepresentante: '',
                cpfRepresentante: '',
                nomeImpresa: '',
                email: '',
                cnpj: '',
                endereco: '',
                telefoneImpresa: '',
                siteImpresa: ''
            });
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            alert('Erro ao cadastrar cliente. Verifique o console para mais detalhes.');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className='formsSistema'>

            <Row className="mb-1">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Representante da empresa</Form.Label>
                    <Form.Control type="text" name="representanteImpresa" placeholder="Representante da impresa" value={formData.representanteImpresa} onChange={handleChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Telefone do representante</Form.Label>
                    <InputMask className='form-control' type="text" name="telefoneRepresentante" mask="(99) 99999-9999" placeholder="(99) 99999-9999" value={formData.telefoneRepresentante} onChange={handleChange} ></InputMask>
                </Form.Group>
            </Row>


            <Row className="mb-1">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Cargo do representante</Form.Label>
                    <Form.Control type="text" name="cargoRepresentante" placeholder="Cargo do representante" value={formData.cargoRepresentante} onChange={handleChange}  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>CPF do representante</Form.Label>
                    <InputMask className='form-control' type="text" name="cpfRepresentante" mask="999.999.999-99" placeholder="999.999.999-99" value={formData.cpfRepresentante} onChange={handleChange} ></InputMask>
                </Form.Group>
            </Row>

            <Row>
                <Col className="mb-1" xs={4}>
                    <Form.Label>Nome da empresa</Form.Label>
                    <Form.Control type="text" name="nomeImpresa" placeholder="Nome da impresa" value={formData.nomeImpresa} onChange={handleChange} />
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
                <Col className="mb-2" xs={7}>
                    <Form.Label>Endereço da empresa</Form.Label>
                    <Form.Control type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} />
                </Col>
                <Col>
                    <Form.Label>Telefone da empresa</Form.Label>
                    <InputMask className='form-control' type="text" name="telefoneImpresa" mask="(99) 99999-9999" placeholder="(99) 99999-9999" value={formData.telefoneImpresa} onChange={handleChange} ></InputMask>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Site da empresa</Form.Label>
                <Form.Control type="url" name="siteImpresa" placeholder="https://" value={formData.siteImpresa} onChange={handleChange} />
            </Form.Group>

            <button className='btnFormSistema' type="submit">Salvar</button>
        </Form>
    );
};

export default ClienteForm;
