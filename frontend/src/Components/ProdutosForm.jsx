// CadastroForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <input type="text" name="marca" placeholder="Marca" value={formData.marca} onChange={handleChange} />
      <input type="email" name="modelo" placeholder="Modelo" value={formData.modelo} onChange={handleChange} />
      <input type="text" name="classificacao" placeholder="Clssificação" value={formData.classificacao} onChange={handleChange} />
      <input type="text" name="cor" placeholder="Cor" value={formData.cor} onChange={handleChange} />
      <input type="number" name="anoFabricacao" placeholder="Ano de fabricação" value={formData.anoFabricacao} onChange={handleChange} />
      <input type="text" name="potencia" placeholder="Potência" value={formData.potencia} onChange={handleChange} />
      <input type="text" name="tipoMotor" placeholder="Tipo de motor" value={formData.tipoMotor} onChange={handleChange} />
      <input type="text" name="tipoTransmissao" placeholder="Tipo de transmissor" value={formData.tipoTransmissao} onChange={handleChange} />
      <input type="text" name="numeroIdentificacao" placeholder="Número de Identificação" value={formData.numeroIdentificacao} onChange={handleChange} />
      <input type="text" name="valor" placeholder="Valor" value={formData.valor} onChange={handleChange} />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ProdutosForm;
