//Login de funcionário
import React from "react";

// // Rota para buscar um registro específico pelo ID
// router.get('/cadastros/:cpf', (req, res) => {
//     const { id } = req.params;
//     connection.query('SELECT cpf, senha FROM cadastro WHERE cpf = ?', [cpf], (err, results) => {
//       if (err) {
//         console.error('Erro ao buscar o registro:', err);
//         res.status(500).json({ error: 'Erro ao buscar o registro' });
//         return;
//       }
//       if (results.length === 0) {
//         res.status(404).json({ error: 'Registro não encontrado' });
//         return;
//       }
//       res.json(results[0]);
//     });
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:3001/cadastros', formData);
//       alert('Cadastro criado com sucesso!');
//       // Limpar o formulário após o envio bem-sucedido
//       setFormData({
//         nome: '',
//         email: '',
//         cpf: '',
//         endereco: '',
//         telefone: '',
//         senha: ''
//       });
//     } catch (error) {
//       console.error('Erro ao criar cadastro:', error);
//       alert('Erro ao criar cadastro. Verifique o console para mais detalhes.');
//     }
//   };

const Login = () => {
    return (
      <>
        <div>
          <h2>Login</h2>
          {/* <form onSubmit={handleSubmit}> */}
            <input type="text" name="cpf" placeholder="CPF"  />
            <input type="password" name="senha" placeholder="Senha"  />
          {/* </form> */}
          
        </div>
      </>
    );
  };
  
  export default Login;