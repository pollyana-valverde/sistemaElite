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
  const { idCadastro } = req.params;
  const { nome, email, cpf, endereco, telefone, senha } = req.body;
  connection.query('UPDATE cadastro SET nome = ?, email = ?, cpf = ?, endereco = ?, telefone = ?, senha = ? WHERE idCadastro = ?',
    [nome, email, cpf, endereco, telefone, senha, idCadastro], (err, result) => {
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

// Rota para criar um novo registro
router.post('/vendas', (req, res) => {
  const { dataHora, numeroIdentCarro, cliente, cpfFuncionario, qtdProdutos, valorUnidade, metodoPagamento, endereco, status, id } = req.body;
  connection.query('INSERT INTO vendas (dataHora, numeroIdentCarro, cliente, cpfFuncionario, qtdProdutos, valorUnidade, metodoPagamento, endereco, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [dataHora, numeroIdentCarro, cliente, cpfFuncionario, qtdProdutos, valorUnidade, metodoPagamento, endereco, status, id], (err, result) => {
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
  const { dataHora, numeroIdentCarro, cliente, cpfFuncionario, qtdProdutos, valorUnidade , metodoPagamento, endereco, status } = req.body;
  connection.query('UPDATE vendas SET dataHora = ?, numeroIdentCarro = ?, cliente = ?, cpfFuncionario = ?, qtdProdutos = ?, valorUnidade = ?, metodoPagamento = ?, endereco = ?, status = ? WHERE codigoVenda = ?',
    [dataHora, numeroIdentCarro, cliente, cpfFuncionario, qtdProdutos, valorUnidade, metodoPagamento, endereco, status, codigoVenda], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar o registro:', err);
        res.status(500).json({ error: 'Erro ao atualizar o registro' });
        return;
      }
      res.json({ message: 'Registro atualizado com sucesso' });
    });
});

// Rota para excluir um registro pelo ID
router.delete('/vendas/:id', (req, res) => {
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
router.get('/fornecedor/:idFornecedor', (req, res) => {
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
  const { representanteEmpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeEmpresa, email, telefoneEmpresa, cnpj, endereco, produtoServico } = req.body;
  connection.query('INSERT INTO fornecedores (representanteEmpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeEmpresa, email, telefoneEmpresa, cnpj, endereco, produtoServico) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [representanteEmpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeEmpresa, email, telefoneEmpresa, cnpj, endereco, produtoServico], (err, result) => {
      if (err) {
        console.error('Erro ao criar o registro:', err);
        res.status(500).json({ error: 'Erro ao criar o registro' });
        return;
      }
      res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
    });
});

// Rota para atualizar um registro existente pelo ID
router.put('/fornecedor/:idFornecedor', (req, res) => {
  const { idFornecedor } = req.params;
  const { representanteEmpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeEmpresa, email, telefoneEmpresa, cnpj, endereco, produtoServico } = req.body;
  connection.query('UPDATE fornecedores SET representanteEmpresa = ?, telefoneRepresentante = ?, cargoRepresentante = ?, cpfRepresentante = ?, nomeEmpresa = ?, email = ?, telefoneEmpresa = ?, cnpj = ?, endereco = ?, produtoServico = ? WHERE idFornecedor = ?',
    [representanteEmpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeEmpresa, email, telefoneEmpresa, cnpj, endereco, produtoServico, idFornecedor], (err, result) => {
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
router.put('/cliente/:idCliente', (req, res) => {
  const { idCliente } = req.params;
  const { representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa } = req.body;
  connection.query('UPDATE clientes SET representanteImpresa = ?, telefoneRepresentante = ?, cargoRepresentante = ?, cpfRepresentante = ?, nomeImpresa = ?, email = ?, telefoneImpresa = ?, cnpj = ?, endereco = ?, siteImpresa = ? WHERE idCliente = ?',
    [representanteImpresa, telefoneRepresentante, cargoRepresentante, cpfRepresentante, nomeImpresa, email, telefoneImpresa, cnpj, endereco, siteImpresa, idCliente], (err, result) => {
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
router.put('/contasReceber/:idcontaReceber', (req, res) => {
  const { idcontaReceber } = req.params;
  const {clasificacao, valorReceber, vencimento, empresa, contaBancaria, descricao, status, valorRecebido } = req.body;
  connection.query('UPDATE contasreceber SET clasificacao = ?, valorReceber = ?, vencimento = ?, empresa = ?, contaBancaria = ?, descricao = ?, status = ?, valorRecebido =? WHERE idcontaReceber = ?',
    [clasificacao, valorReceber, vencimento, empresa, contaBancaria, descricao, status, valorRecebido, idcontaReceber], (err, result) => {
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


/////////////////////////////////////////// Boletim ///////////////////////////////////////////

// Rota para listar todos os registros
router.get('/Boletim', (req, res) => {
  connection.query('SELECT * FROM Boletim', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/Boletim/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM Boletim WHERE idBoletim = ?', [id], (err, results) => {
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

router.get('/Boletim/:situacao', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM Boletim WHERE situacao = ?', [id], (err, results) => {
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
router.put('/Boletim/:idBoletim', (req, res) => {
  const { idBoletim } = req.params;
  const {nomeAluno, semestre, materia, nota1, nota2, nota3, notaFinal, situacao } = req.body;
  connection.query('UPDATE Boletim SET nomeAluno =?, semestre =?, materia =?, nota1 =?, nota2 =?, nota3 =?, notaFinal =?, situacao =? WHERE idBoletim = ?',
    [nomeAluno, semestre, materia, nota1, nota2, nota3, notaFinal, situacao, idBoletim], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar conta:', err);
        res.status(500).json({ error: 'Erro ao atualizar conta' });
        return;
      }
      res.json({ message: 'Registro atualizado com sucesso' });
    });
});

// Rota para excluir um registro pelo ID
router.delete('/Boletim/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM Boletim WHERE idBoletim = ?', [id], (err, result) => {
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
  const { marca, modelo, classificacao, cor, anoFabricacao, potencia, tipoMotor, tipoTransmissao, numeroIdentificacao, valor, id } = req.body;
  connection.query('INSERT INTO carros (marca, modelo, classificacao, cor, anoFabricacao, potencia, tipoMotor, tipoTransmissao, numeroIdentificacao, valor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? )',
    [marca, modelo, classificacao, cor, anoFabricacao, potencia, tipoMotor, tipoTransmissao, numeroIdentificacao, valor, id], (err, result) => {
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
  const { idCarro } = req.params;
  const { marca, modelo, classificacao, cor, anoFabricacao, potencia, tipoMotor, tipoTransmissao, numeroIdentificacao, valor } = req.body;
  connection.query('UPDATE carros SET marca = ?, modelo = ?, classificacao = ?, cor = ?, anoFabricacao = ?, potencia = ?, tipoMotor = ?, tipoTransmissao = ?, numeroIdentificacao = ?, valor = ? WHERE idCarro = ?',
    [marca, modelo, classificacao, cor, anoFabricacao, potencia, tipoMotor, tipoTransmissao, numeroIdentificacao, valor, idCarro], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar o registro:', err);
        res.status(500).json({ error: 'Erro ao atualizar o registro' });
        return;
      }
      res.json({ message: 'Registro atualizado com sucesso' });
    });
});

// Rota para excluir um registro pelo ID
router.delete('/produtos/:id', (req, res) => {
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
  const { nome, email, cpf, cargo, registro, endereco, telefone, senha, id } = req.body;
  connection.query('INSERT INTO funcionarios (nome, email, cpf, cargo, registro, endereco, telefone, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nome, email, cpf, cargo, registro, endereco, telefone, senha, id], (err, result) => {
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
  const { idFuncionario } = req.params;
  const { nome, email, cpf, cargo, registro, endereco, telefone, senha, } = req.body;
  connection.query('UPDATE funcionarios SET nome = ?, email = ?, cpf = ?, cargo = ?, registro = ?, endereco = ?, telefone = ?, senha = ? WHERE idFuncionario = ?',
    [nome, email, cpf, cargo, registro, endereco, telefone, senha, idFuncionario], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar o registro:', err);
        res.status(500).json({ error: 'Erro ao atualizar o registro' });
        return;
      }
      res.json({ message: 'Registro atualizado com sucesso' });
    });
});

router.delete('/funcionario/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM funcionarios WHERE idFuncionario = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).json({ error: 'Erro ao excluir o registro' });
      return;
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});



module.exports = router;