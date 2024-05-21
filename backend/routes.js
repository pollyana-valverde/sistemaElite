///////////////////////////////////////// cadastro ////////////////////////////////////
const express = require('express');
const connection = require('./db');
const router = express.Router();

// Rota para listar todos os registros
router.get('/cadastros', (req, res) => {
  connection.query('SELECT * FROM cadastro', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/cadastros/:idCadastro', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM cadastro WHERE idCadastro = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      res.status(500).json({ error: 'Erro ao buscar o registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
      return;
    }
    res.json(results[0]);
  });
});
// Rota para criar um novo registro
router.post('/cadastroNovoUsuario', (req, res) => {
  const { nome, email, cpf, endereco, telefone, senha } = req.body;
  connection.query('INSERT INTO cadastro (nome, email, cpf, endereco, telefone, senha) VALUES (?, ?, ?, ?, ?, ?)', 
    [nome, email, cpf, endereco, telefone, senha], (err, result) => {
    if (err) {
      console.error('Erro ao criar o registro:', err);
      res.status(500).json({ error: 'Erro ao criar o registro' });
      return;
    }
    res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
  });
});

// Rota para atualizar um registro existente pelo ID
router.put('/cadastros/:idCadastro', (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, endereco, telefone, senha } = req.body;
  connection.query('UPDATE cadastro SET nome = ?, email = ?, cpf = ?, endereco = ?, telefone = ?, senha = ? WHERE id = ?', 
    [nome, email, cpf, endereco, telefone, senha, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o registro:', err);
      res.status(500).json({ error: 'Erro ao atualizar o registro' });
      return;
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
});

// Rota para excluir um registro pelo ID
router.delete('/cadastros/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM cadastro WHERE idCadastro = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).json({ error: 'Erro ao excluir o registro' });
      return;
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});


///////////////////////////////////// registro de vendas /////////////////////////////

// Rota para listar todos os registros
router.get('/vendas', (req, res) => {
  connection.query('SELECT * FROM vendas', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/vendas/:codigoVenda', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM vendas WHERE codigoVenda = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      res.status(500).json({ error: 'Erro ao buscar o registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
      return;
    }
    res.json(results[0]);
  });
});



// Rota para listar todos os registros
router.get('/vendas', (req, res) => {
  connection.query('SELECT * FROM vendas', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);

// Rota para criar um novo registro
router.post('/vendas', (req, res) => {
  const { dataHora, numeroIdentCarro, cliente, cpfFuncionario, qtdProdutos, valorUnidade, valorTotal, metodoPagamento, endereco, status } = req.body;
  connection.query('INSERT INTO vendas (dataHora, numeroIdentCarro, cliente, cpfFuncionario, qtdProdutos, valorUnidade, valorTotal, metodoPagamento, endereco, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [dataHora, numeroIdentCarro, cliente, cpfFuncionario, qtdProdutos, valorUnidade, valorTotal, metodoPagamento, endereco, status], (err, result) => {
    if (err) {
      console.error('Erro ao criar o registro:', err);
      res.status(500).json({ error: 'Erro ao criar o registro' });
      return;
    }
    res.status(201).json({ message: 'Registro criado com sucesso', codigoVenda: result.insertId });

  });
});

// Rota para atualizar um registro existente pelo ID
router.put('/vendas/:codigoVenda', (req, res) => {
  const { codigoVenda } = req.params;
  const { dataHora, numeroIdentCarro, cliente, cpfFuncionario, qtdProdutos, valorUnidade, valorTotal, metodoPagamento, endereco, status } = req.body;
  connection.query('UPDATE vendas SET dataHora = ?, numeroIdentCarro = ?, cliente = ?, cpfFuncionario = ?, qtdProdutos = ?, valorUnidade = ?, valorTotal = ?, metodoPagamento = ?, endereco = ?, status = ?, WHERE codigoVenda = ?', 
    [dataHora, numeroIdentCarro, cliente, cpfFuncionario, qtdProdutos, valorUnidade, valorTotal, metodoPagamento, endereco, status, codigoVenda], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o registro:', err);
      res.status(500).json({ error: 'Erro ao atualizar o registro' });
      return;
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
});

// Rota para excluir um registro pelo ID
router.delete('/vendas/:codigoVenda', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM vendas WHERE codigoVenda = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).json({ error: 'Erro ao excluir o registro' });
      return;
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});



/////////////////////////////////////////////login///////////////////////////////////////////////////

//Rota para buscar o cfp e senha necessários no login
router.post('/login/:cpf/:senha', (req, res) => {
  const { cpf, senha } = req.params;
  
  connection.query('SELECT * FROM cadastro WHERE cpf = ? and senha = ?', [cpf, senha], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro do cadastro:', err);
      res.status(500).json({ error: 'Erro ao buscar o cadastro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Cadastro não encontrado' });
      return;
    }
    res.json(results);
  });
});




/////////////////////////////////////////////perfil///////////////////////////////////////////////////////

// //Rota para buscar o cfp e senha necessários no login
// router.post('/login/:cpf', (req, res) => {
//   const { cpf } = req.params;
  
//   connection.query('SELECT * FROM cadastro WHERE cpf = ?', [cpf], (err, results) => {
//     if (err) {
//       console.error('Erro ao buscar o registro do cadastro:', err);
//       res.status(500).json({ error: 'Erro ao buscar o cadastro' });
//       return;
//     }
//     if (results.length === 0) {
//       res.status(404).json({ error: 'Cadastro não encontrado' });
//       return;
//     }
//     res.json(results);
//   });
// });

///////////////////////////////////////////// fornecedores /////////////////////////////////////////
// Rota para listar todos os registros
router.get('/fornecedor', (req, res) => {
  connection.query('SELECT * FROM fornecedores', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/fornecedor/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM fornecedores WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      res.status(500).json({ error: 'Erro ao buscar o registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

// Rota para criar um novo registro
router.post('/fornecedor', (req, res) => {
  const { representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa } = req.body;
  connection.query('INSERT INTO fornecedores (representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa], (err, result) => {
    if (err) {
      console.error('Erro ao criar o registro:', err);
      res.status(500).json({ error: 'Erro ao criar o registro' });
      return;
    }
    res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
  });
});

// Rota para atualizar um registro existente pelo ID
router.put('/fornecedor/:id', (req, res) => {
  const { id } = req.params;
  const { representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa } = req.body;
  connection.query('UPDATE fornecedores SET representanteImpresa = ?, telefoneRepresentante = ?, cargoRepresentante = ?, cpfRepresentante = ?, nomeImpresa = ?, email = ?, telefoneImpresa = ?, cnpj = ?, endereco = ?, siteImpresa = ? WHERE id = ?', 
    [representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o registro:', err);
      res.status(500).json({ error: 'Erro ao atualizar o registro' });
      return;
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
});

// Rota para excluir um registro pelo ID
router.delete('/fornecedor/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM fornecedores WHERE idFornecedor = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).json({ error: 'Erro ao excluir o registro' });
      return;
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});



////////////////////////////////////////////////// clientes /////////////////////////////////////////////
// Rota para listar todos os registros
router.get('/cliente', (req, res) => {
    connection.query('SELECT * FROM clientes', (err, results) => {
      if (err) {
        console.error('Erro ao buscar os registros:', err);
        res.status(500).json({ error: 'Erro ao buscar os registros' });
        return;
      }
      res.json(results);
    });
  });
  
  // Rota para buscar um registro específico pelo ID
  router.get('/cliente/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Erro ao buscar o registro:', err);
        res.status(500).json({ error: 'Erro ao buscar o registro' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Registro não encontrado' });
        return;
      }
      res.json(results[0]);
    });
  });
  
  // Rota para criar um novo registro
  router.post('/cliente', (req, res) => {
    const { representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa } = req.body;
    connection.query('INSERT INTO clientes (representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa], (err, result) => {
      if (err) {
        console.error('Erro ao criar o registro:', err);
        res.status(500).json({ error: 'Erro ao criar o registro' });
        return;
      }
      res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
    });
  });
  
  // Rota para atualizar um registro existente pelo ID
  router.put('/cliente/:id', (req, res) => {
    const { id } = req.params;
    const { representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa } = req.body;
    connection.query('UPDATE clientes SET representanteImpresa = ?, telefoneRepresentante = ?, cargoRepresentante = ?, cpfRepresentante = ?, nomeImpresa = ?, email = ?, telefoneImpresa = ?, cnpj = ?, endereco = ?, siteImpresa = ? WHERE id = ?', 
      [representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa, id], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar o registro:', err);
        res.status(500).json({ error: 'Erro ao atualizar o registro' });
        return;
      }
      res.json({ message: 'Registro atualizado com sucesso' });
    });
  });
  
  // Rota para excluir um registro pelo ID
  router.delete('/cliente/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM clientes WHERE idCliente = ?', [id], (err, result) => {
      if (err) {
        console.error('Erro ao excluir o registro:', err);
        res.status(500).json({ error: 'Erro ao excluir o registro' });
        return;
      }
      res.json({ message: 'Registro excluído com sucesso' });
    });
  });
  
  



/////////////////////////////////////////// contas a receber ///////////////////////////////////////////

// Rota para listar todos os registros
router.get('/contasReceber', (req, res) => {
  connection.query('SELECT * FROM contasreceber', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/contasReceber/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM contasreceber WHERE idcontaReceber = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      res.status(500).json({ error: 'Erro ao buscar o registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

// Rota para atualizar um registro existente pelo ID
router.put('/contasReceber/:id', (req, res) => {
  const { id } = req.params;
  const { representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa } = req.body;
  connection.query('UPDATE contasreceber SET status = ?, valorRecebido =? WHERE idcontaReceber = ?', 
    [representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar conta:', err);
      res.status(500).json({ error: 'Erro ao atualizar conta' });
      return;
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
});


router.get('/filtroContasReceber/:status', (req, res) => {
  const { status } = req.params;
  connection.query('SELECT * FROM contasreceber WHERE status = ?', [status], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      res.status(500).json({ error: 'Erro ao buscar o registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
      return;
    }
    res.json(results);
  });
}); 

  // Rota para excluir um registro pelo ID
  router.delete('/contasReceber/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM contasreceber WHERE idcontaReceber = ?', [id], (err, result) => {
      if (err) {
        console.error('Erro ao excluir o registro:', err);
        res.status(500).json({ error: 'Erro ao excluir o registro' });
        return;
      }
      res.json({ message: 'Registro excluído com sucesso' });
    });
  });
  
  
  /////////////////////////////////////////// contas a pagar ///////////////////////////////////////////

// Rota para listar todos os registros
router.get('/contasPagar', (req, res) => {
  connection.query('SELECT * FROM contasPagar', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/contasPagar/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM contasPagar WHERE idcontaPagar = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      res.status(500).json({ error: 'Erro ao buscar o registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

router.get('/contasPagar/:status', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM contasPagar WHERE status = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      res.status(500).json({ error: 'Erro ao buscar o registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

// Rota para atualizar um registro existente pelo ID
router.put('/contasPagar/:id', (req, res) => {
  const { id } = req.params;
  const { representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa } = req.body;
  connection.query('UPDATE contasPagar SET status = ?, valorPago =? WHERE idcontaPagar = ?', 
    [representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar conta:', err);
      res.status(500).json({ error: 'Erro ao atualizar conta' });
      return;
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
});

  // Rota para excluir um registro pelo ID
  router.delete('/contasPagar/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM contasPagar WHERE idcontaPagar = ?', [id], (err, result) => {
      if (err) {
        console.error('Erro ao excluir o registro:', err);
        res.status(500).json({ error: 'Erro ao excluir o registro' });
        return;
      }
      res.json({ message: 'Registro excluído com sucesso' });
    });
  });
  

  //////////////////////////////////////////////////// Produtos (carros) ////////////////////////////////////////////
  // Rota para listar todos os registros
router.get('/produtos', (req, res) => {
  connection.query('SELECT * FROM carros', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/produtos/:idCarro', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM carros WHERE idCarro = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      res.status(500).json({ error: 'Erro ao buscar o registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

// Rota para criar um novo registro
router.post('/produtos', (req, res) => {
  const { marca, modelo, classificacao, cor, anoFabricacao, potencia, tipoMotor, tipoTransmissao, numeroIdentificacao, valor } = req.body;
  connection.query('INSERT INTO carros (marca, modelo, classificacao, cor, anoFabricacao, potencia, tipoMotor, tipoTransmissao, numeroIdentificacao, valor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? )', 
    [marca, modelo, classificacao, cor, anoFabricacao, potencia, tipoMotor, tipoTransmissao, numeroIdentificacao, valor], (err, result) => {
    if (err) {
      console.error('Erro ao criar o registro:', err);
      res.status(500).json({ error: 'Erro ao criar o registro' });
      return;
    }
    res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
  });
});

// Rota para atualizar um registro existente pelo ID
router.put('/produtos/:idCarro', (req, res) => {
  const { id } = req.params;
  const { marca, modelo, classificacao, cor, anoFabricacao, potencia, tipoMotor, tipoTransmissao, numeroIdentificacao, valor } = req.body;
  connection.query('UPDATE carros SET marca = ?, modelo = ?, classificacao = ?, cor = ?, anoFabricacao = ?, potencia = ?, tipoMotor = ?, tipoTransmissao = ?, numeroIdentificacao = ?, valor = ? WHERE idCarro = ?', 
    [marca, modelo, classificacao, cor, anoFabricacao, potencia, tipoMotor, tipoTransmissao, numeroIdentificacao, valor, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o registro:', err);
      res.status(500).json({ error: 'Erro ao atualizar o registro' });
      return;
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
});

// Rota para excluir um registro pelo ID
router.delete('/produtos/:idCarro', (req, res) => {idCarro
  const { id } = req.params;
  connection.query('DELETE FROM carros WHERE idCarro = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).json({ error: 'Erro ao excluir o registro' });
      return;
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});


///////////////////////////////////////// cadastro do funcionário ////////////////////////////////////
// Rota para listar todos os registros
router.get('/funcionario', (req, res) => {
  connection.query('SELECT * FROM funcionarios', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/funcionario/:idFuncionario', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM funcionarios WHERE idFuncionario = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      res.status(500).json({ error: 'Erro ao buscar o registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
      return;
    }
    res.json(results[0]);
  });
});
// Rota para criar um novo registro
router.post('/funcionario', (req, res) => {
  const { nome, email, cpf, endereco, telefone, senha } = req.body;
  connection.query('INSERT INTO funcionarios (nome, email, cpf, endereco, telefone, senha) VALUES (?, ?, ?, ?, ?, ?)', 
    [nome, email, cpf, endereco, telefone, senha], (err, result) => {
    if (err) {
      console.error('Erro ao criar o registro:', err);
      res.status(500).json({ error: 'Erro ao criar o registro' });
      return;
    }
    res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
  });
});

// Rota para atualizar um registro existente pelo ID
router.put('/funcionario/:idFuncionario', (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, endereco, telefone, senha } = req.body;
  connection.query('UPDATE funcionarios SET nome = ?, email = ?, cpf = ?, endereco = ?, telefone = ?, senha = ? WHERE idFuncionario = ?', 
    [nome, email, cpf, endereco, telefone, senha, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o registro:', err);
      res.status(500).json({ error: 'Erro ao atualizar o registro' });
      return;
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
});


  

module.exports = router;