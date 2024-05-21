//Login de funcionário
import React, {useState, useRef, useEffect} from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../provider/AuthProvider";
import axios from "axios";

const Login = () => {
  const { setToken } = useAuth();
  const navegacao = useNavigate();

  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // var session_url = 'http://localhost:3001/login';
    // axios.post(session_url, {}, {
    //       auth: {
    //             cpf: cpf,
    //             senha: senha
    //       }
    // })

      try {
        const response = await axios.post(`http://localhost:3001/login/${cpf}/${senha}`, {
          auth: {
            cpf: cpf,
            senha: senha
          }
        });

        // const response = await fetch(`http://localhost:3001/login/${cpf}${senha}`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //    body: JSON.stringify({ cpf, senha })
        // });
          // const data = await response.json();
          // console.log("Data: ", data);

          setToken("Token de teste");
          console.log("jhsnisdj: ", setToken)

          alert('Login realizado com sucesso!')
        // Navega para a home page quando autenticado
        navegacao("/", {replace: true});
        
      } catch (error) {
        console.error('Erro ao autenticar:', error);
        alert('Erro ao entrar. Verifique o console para mais detalhes.');
      }
        

    
  };

  // setTimeout(() => {
  //   handleLogin();
  // }, 3 * 1000);

  return (
    <>
      <div>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input type="text" name="cpf" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
          <input type="password" name="senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button type="submit">Entrar</button>
        </form>
        <br/>Não possui uma conta? <Link to="/cadastro"> Cadastre-se</Link>
      </div>
    </>
  )

  };
  
  export default Login;