//Login de funcionário
import React, {useState, useEffect} from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../provider/AuthProvider";
import axios from "axios";
import "../css/login.css"

const Login = () => {
  const { setToken } = useAuth();
  const navegacao = useNavigate();

  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')

  const [data, setData] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

      try {

        // const response = await fetch(`http://localhost:3001/login/${cpf}${senha}`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //    body: JSON.stringify({ cpf, senha })
        // });
          // const data = await response.json();
          // console.log("Data: ", data);


        const response = await axios.post(`http://localhost:3001/login/${cpf}/${senha}`, {
          auth: {
            cpf: cpf,
            senha: senha
          }
        });
          
        //Pega o dado do nome para o perfil
          // setData(response.data[0]);
          // console.log("resposta: ", data);

          if (Array.isArray(response.data) && response.data.length > 0) {
            const data = response.data[0].nome;
            
            console.log("Dados recebidos do servidor:", response.data[0]);

            console.log("data :", data);
            setToken(`${data}`);
          } else {
            console.log("A resposta do servidor não contém os dados esperados.");
          }
          
          // const data = response.data[0].nome
          // console.log("resposta: ", data)

         

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
    <>
      <div className="login">
        <h2>Login</h2>
        <div className="quadroForm">
        <form onSubmit={handleLogin}>
          <input type="text" name="cpf" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} /><br />
          <input type="password" name="senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} /><br />
          <button type="submit">Entrar</button>
        <br/>Não possui uma conta? <Link to="/cadastro"> Cadastre-se</Link>
        </form>
        </div>
      </div>
    </>
  )

};
  
  
  export default Login;