//Login de funcionário
import React, {useState, useRef, useEffect} from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../provider/AuthProvider";

const Login = () => {
  const { setToken } = useAuth();
  const navegacao = useNavigate();

  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
  
      try {
        const response = await fetch(`http://localhost:3001/login/${cpf}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
           body: JSON.stringify({ cpf, senha })
        });
          const data = await response.json();
          console.log("Data: ", data);

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

//     return (
//       <>
//         <div>
//           <h2>Login</h2>
          
//           <form >
//             <input type="text" name="cpf" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
//             <input type="password" name="senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
//             <button type="submit">Entrar</button>
//             <br/>Não possui uma conta? <Link to="/cadastro"> Cadastre-se</Link>
//           </form>
//           <button>Sair da conta</button>
          
//         </div>
//       </>
//     );

//   // const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // const [formData, setFormData] = useState({
//   //   cpf: '',
//   //   senha: ''
//   // });

// // redirect("/")

//   const [cpf, setCpf] = useState('')
//   const [senha, setSenha] = useState('')
//   const navigate = useNavigate();
  
// //   const useRef = useRef();
// //   const errRef = useRef();


//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData({
//   //     ...formData,
//   //     [name]: value
//   //   });
//   // };

  
 

// ///////////////////////////////////////abandonado?????????????????////////////////////////////////
// const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   try {
//     const response = await fetch(`http://localhost:3001/login/${cpf}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//        body: JSON.stringify({ cpf, senha })
//     });
//       const data = await response.json();
//       console.log("Data: ", data);
//       setIsLoggedIn(true);
//       alert('Login realizado com sucesso!')
//     // Navega para a home page quando autenticado
//     navigate('/');
    
//     // Limpar o formulário após o envio bem-sucedido
//     // setFormData({
//     //   cpf: ''
//     //   senha: ''
//     // });
//   } catch (error) {
//     console.error('Erro ao autenticar:', error);
//     alert('Erro ao entrar. Verifique o console para mais detalhes.');
//   }
// };    


// const handleLogout = () => setIsLoggedIn(false);


  };
  
  export default Login;