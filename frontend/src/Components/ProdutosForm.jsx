// CadastroForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ProdutosForm = () => {
    const [formData, setFormData] = useState({
        Marca: '',
        Modelo: '',
        Classificacao: '',
        Cor: '',
        AnoFabricacao: '',
        Potencia: '',
        TipoMotor: '',
        Tipotransmissao: '',
        NumeroIndentificacao: '',
        Valor: '',

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
                Marca: '',
                Modelo: '',
                Classificacao: '',
                Cor: '',
                AnoFabricacao: '',
                Potencia: '',   
                TipoMotor: '',
                Tipotransmissao: '',
                NumeroIndentificacao: '',
                Valor: ''

            });
        } catch (error) {
            console.error('Erro ao criar cadastro:', error);
            alert('Erro ao criar cadastro. Verifique o console para mais detalhes.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="marca" placeholder="Marca" value={formData.Marca} onChange={handleChange} />
            <input type="text" name="modelo" placeholder="Modelo" value={formData.Modelo} onChange={handleChange} />
            <input type="text" name="classificacao" placeholder="Classificação" value={formData.Classificacao} onChange={handleChange} />
            <input type="text" name="cor" placeholder="Cor" value={formData.Cor} onChange={handleChange} />
            <input type="number" name="anoFabricacao" placeholder="Ano de Fabricaçao" value={formData.AnoFabricacao} onChange={handleChange} />
            <input type="text" name="potencia" placeholder="Potência" value={formData.Potencia} onChange={handleChange} />
            <input type="text" name="tipoMotor" placeholder="Tipo de Motor" value={formData.TipoMotor} onChange={handleChange} />
            <input type="text" name="tipoTransmissao" placeholder="Tipo de Transmissão" value={formData.Tipotransmissao} onChange={handleChange} />
            <input type="text" name="numeroIdentificacao" placeholder="Numero de Identificação" value={formData.NumeroIndentificacao} onChange={handleChange} />
            <input type="number" name="valor" placeholder="Valor do Carro" value={formData.Valor} onChange={handleChange} />
            <button type="submit">Salvar</button>
        </form>
    );
};

export default ProdutosForm;
