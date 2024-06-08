import React, { useState, useRef } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { InputNumber } from 'primereact/inputnumber';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


const PagamentoForm = () => {
    const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
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
            toast.current.show({
                severity: 'success',
                summary: 'Conta cadastrada com sucesso!',
                life: 3000,
            });
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
            toast.current.show({ severity: 'error', summary: 'Erro ao cadastrar conta.', detail: 'Não foi possível realizar o cadastro.', life: 3000 });
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
                    </i><h5>Nova conta</h5>
                </Button>
            </div>

            <Dialog
                className='modalForm'
                header="Cadastrar conta"
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
                        <div className='btnFormSistema mt-3'>
                            <button onClick={() => setVisible(false)} type="submit">Salvar</button>
                        </div>
                    </Form>
                </p>
            </Dialog>
        </div>
    );
};

export default PagamentoForm;
