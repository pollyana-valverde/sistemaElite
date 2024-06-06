import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { InputNumber } from 'primereact/inputnumber';

const CarrosForm = () => {
    const [formData, setFormData] = useState({
        descricao: '',
        categoria: '',
        nomePagamento: '',
        dataEmissao: '',
        dataVencimento: '',
        valor: 0,
        parcelamento: 1,
        status: 'Pendente'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNumberChange = (e, name) => {
        setFormData({
            ...formData,
            [name]: e.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/produtos', formData);
            alert('Cadastro criado com sucesso!');
            // Limpar o formulário após o envio bem-sucedido
            setFormData({
                descricao: '',
                categoria: '',
                nomePagamento: '',
                dataEmissao: '',
                dataVencimento: '',
                valor: 0,
                parcelamento: 1,
                status: 'Pendente'
            });
        } catch (error) {
            console.error('Erro ao criar cadastro:', error);
            alert('Erro ao criar cadastro. Verifique o console para mais detalhes.');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className='formsSistema'>
            <Row>
                <Col>
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="text" name="descricao" placeholder="Descrição" value={formData.descricao} onChange={handleChange} />
                </Col>
                <Col>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control as="select" name="categoria" value={formData.categoria} onChange={handleChange}>
                        <option value="">Selecione uma categoria</option>
                        <option value="Salário">Salário</option>
                        <option value="Aluguel">Aluguel</option>
                        <option value="Luz">Luz</option>
                        <option value="Água">Água</option>
                        <option value="Internet">Internet</option>
                        <option value="Material Escolar">Material Escolar</option>
                        <option value="Manutenção">Manutenção</option>
                    </Form.Control>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Empresa/Funcionário</Form.Label>
                    <Form.Control type="text" name="nomePagamento" placeholder="Nome" value={formData.nomePagamento} onChange={handleChange} />
                </Col>
                <Col>
                    <Form.Label>Data de Emissão</Form.Label>
                    <Form.Control type="date" name="dataEmissao" value={formData.dataEmissao} onChange={handleChange} />
                </Col>
                <Col>
                    <Form.Label>Data de Vencimento</Form.Label>
                    <Form.Control type="date" name="dataVencimento" value={formData.dataVencimento} onChange={handleChange} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Valor</Form.Label>
                    <InputNumber
                        name="valor"
                        className='numeroInput'
                        inputId="currency-brazil"
                        placeholder='R$'
                        value={formData.valor}
                        onValueChange={(e) => handleNumberChange(e, 'valor')}
                        mode="currency"
                        currency="BRL"
                        locale="pt-BR"
                    />
                </Col>
                <Col>
                    <Form.Label>Parcelamento</Form.Label>
                    <Form.Control type="number" name="parcelamento" value={formData.parcelamento} onChange={handleChange} />
                </Col>
                <Col>
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" name="status" value={formData.status} onChange={handleChange}>
                        <option value="Pendente">Pendente</option>
                        <option value="Paga">Paga</option>
                        <option value="Atrasada">Atrasada</option>
                        <option value="Cancelada">Cancelada</option>
                    </Form.Control>
                </Col>
            </Row>
            <button className='btnFormSistema' type="submit">Salvar</button>
        </Form>
    );
};

export default CarrosForm;
