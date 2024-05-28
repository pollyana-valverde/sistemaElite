// CadastroForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';

const ProdutosForm = () => {
    const [formData, setFormData] = useState({
        marca: '',
        modelo: '',
        classificacao: '',
        cor: '',
        anoFabricacao: '',
        potencia: '',
        tipoMotor: '',
        tipoTransmissao: '',
        numeroIdentificacao: '',
        valor: '',
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
            await axios.post('http://localhost:3001/produtos', formData);
            alert('Cadastro criado com sucesso!');
            // Limpar o formulário após o envio bem-sucedido
            setFormData({
                marca: '',
                modelo: '',
                classificacao: '',
                cor: '',
                anoFabricacao: '',
                potencia: '',
                tipoMotor: '',
                tipoTransmissao: '',
                numeroIdentificacao: '',
                valor: ''
            });
        } catch (error) {
            console.error('Erro ao criar cadastro:', error);
            alert('Erro ao criar cadastro. Verifique o console para mais detalhes.');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className='formsSistema'>

            <Row>
                <Col className="mb-1" xs={3}>
                    <Form.Label>Marca</Form.Label>
                    <Form.Control type="text" name="marca" placeholder="Marca" value={formData.marca} onChange={handleChange} />
                </Col>
                <Col>
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control type="text" name="modelo" placeholder="Modelo" value={formData.modelo} onChange={handleChange} />
                </Col>
                <Col>
                    <Form.Label>Cor</Form.Label>
                    <Form.Control  type="text" name="cor" placeholder="Cor" value={formData.cor} onChange={handleChange} />
                </Col>
                <Col>
                    <Form.Label>Ano de fabricação</Form.Label>
                    <Form.Control type="number" name="anoFabricacao" placeholder="Ano de fabricação" value={formData.anoFabricacao} onChange={handleChange} />
                </Col>
            </Row>

            <Row className="mb-1">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Classificacao</Form.Label>
                    <Form.Control  type="text" name="classificacao" placeholder="Classificação" value={formData.classificacao} onChange={handleChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Potência</Form.Label>
                    <Form.Control type="text" name="potencia" placeholder="Potência" value={formData.potencia} onChange={handleChange} />
                </Form.Group>
            </Row>

            <Row className="mb-1">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Tipo de motor</Form.Label>
                    <Form.Control  type="text" name="tipoMotor" placeholder="Tipo de motor" value={formData.tipoMotor} onChange={handleChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Tipo de transmissor</Form.Label>
                    <Form.Control type="text" name="tipoTransmissao" placeholder="Tipo de transmissor" value={formData.tipoTransmissao} onChange={handleChange} />
                </Form.Group>
            </Row>

            <Row>
                <Col className="mb-1" xs={7}>
                    <Form.Label>Número de Identificação</Form.Label>
                    <Form.Control type="text" name="numeroIdentificacao" placeholder="Número de Identificação" value={formData.numeroIdentificacao} onChange={handleChange} />
                </Col>
                <Col>
                    <Form.Label>Valor</Form.Label>
                    <InputNumber name="valor" className='numeroInput' inputId="currency-brazil" placeholder='R$' value={formData.valor} onValueChange={handleChange} mode="currency" currency="BRL" locale="pt-BR" />
                </Col>
            </Row>
            <button className='btnFormSistema' type="submit">Salvar</button>
        </Form>);
};

export default ProdutosForm;
