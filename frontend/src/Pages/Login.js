//Login de funcionário
import React, {useState, useEffect} from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../provider/AuthProvider";
import axios from "axios";
import "../css/login.css";

import {Col, Form, Row} from 'react-bootstrap';

const Login = () => {
  const { setToken } = useAuth();
  const navegacao = useNavigate();

  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')

  const [data, setData] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

      try {
        const response = await axios.post(`http://localhost:3001/login/${cpf}/${senha}`, {
          auth: {
            cpf: cpf,
            senha: senha
          }
        });
          

          if (Array.isArray(response.data) && response.data.length > 0) {
            const data = response.data[0].nome;
            
            console.log("Dados recebidos do servidor:", response);

            console.log("data :", data);
            setToken(`${data}`);
          } else {
            console.log("A resposta do servidor não contém os dados esperados.");
          }
                   

          alert('Login realizado com sucesso!')
        // Navega para a home page quando autenticado
        navegacao("/", {replace: true});
        
      } catch (error) {
        console.error('Erro ao autenticar:', error);
        alert('Erro ao entrar. Verifique o console para mais detalhes.');
      }
    
  };

  useEffect(() => {
    if (data) {
      console.log("resposta: ", data);
    }
  }, [data]);

  return (
    <div className="loginContainer">
      <div className="login">
        <h2>Login</h2>
        <div className="quadroForm">
        <form onSubmit={handleLogin}>
        <Row className="mb-3 d-block">
          <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control type="text" name="cpf" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)}  />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
              <Form.Control  type="password" name="senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
          </Form.Group>
          <Col><button type="submit">Entrar</button></Col>
          
        </Row>
          
        <br/>Não possui uma conta? <Link className="link" to="/cadastro"> Cadastre-se</Link>
        </form>
        </div>
      </div>
    </div>
  )

};
  
  
  export default Login;