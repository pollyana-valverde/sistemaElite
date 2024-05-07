//Login de funcionário
import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // const [formData, setFormData] = useState({
  //   cpf: '',
  //   senha: ''
  // });

  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate();
  
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:3001/login/' + cpf, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
       body: JSON.stringify({ cpf, senha })
    });
      const data = await response.json();
      console.log("Data: ", data);
      setIsLoggedIn(true);
    alert('Login realizado com sucesso!')
    // Navega para a home page quando autenticado
    navigate('/');
    
    // Limpar o formulário após o envio bem-sucedido
    // setFormData({
    //   cpf: '',
    //   senha: ''
    // });
  } catch (error) {
    console.error('Erro ao autenticar:', error);
    alert('Erro ao entrar. Verifique o console para mais detalhes.');
  }
};    

    return (
      <>
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="cpf" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
            <input type="password" name="senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <button type="submit">Entrar</button>
          </form>
          
        </div>
      </>
    );
  };
  
  export default Login;