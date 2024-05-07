// CadastroForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

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
        <form onSubmit={handleSubmit}>
            <input type="text" name="representanteImpresa" placeholder="Representante da impresa" value={formData.representanteImpresa} onChange={handleChange} />
            <input type="number" name="telefoneRepresentante" placeholder="Telefone do representante" value={formData.telefoneRepresentante} onChange={handleChange} />
            <input type="text" name="cargoRepresentante" placeholder="Cargo do representante" value={formData.cargoRepresentante} onChange={handleChange} />
            <input type="text" name="cpfRepresentante" placeholder="Cpf do representante" value={formData.cpfRepresentante} onChange={handleChange} />
            <input type="text" name="nomeImpresa" placeholder="Nome da impresa" value={formData.nomeImpresa} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="text" name="cnpj" placeholder="CNPJ" value={formData.cnpj} onChange={handleChange} />
            <input type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} />
            <input type="number" name="telefoneImpresa" placeholder="Telefone da impresa" value={formData.telefoneImpresa} onChange={handleChange} />
            <input type="url" name="siteImpresa" placeholder="Site da impresa" value={formData.siteImpresa} onChange={handleChange} />
            <button type="submit">Salvar</button>
        </form>
    );
};

export default ClienteForm;
