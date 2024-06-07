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


////////////////////////////////////////////////// alunos /////////////////////////////////////////////
// Rota para listar todos os registros
router.get('/alunos', (req, res) => {
  connection.query('SELECT * FROM alunos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/alunos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM alunos WHERE idAluno = ?', [id], (err, results) => {
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
router.post('/alunos', (req, res) => {
  const { nome, email, telefone, cpf, endereco, dataNascimento, matricula, anoLetivo, periodo } = req.body;
  connection.query('INSERT INTO alunos (nome, email, telefone, cpf, endereco, dataNascimento, matricula, anoLetivo, periodo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nome, email, telefone, cpf, endereco, dataNascimento, matricula, anoLetivo, periodo], (err, result) => {
      if (err) {
        console.error('Erro ao criar o registro:', err);
        res.status(500).json({ error: 'Erro ao criar o registro' });
        return;
      }
      res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
    });
});

// Rota para atualizar um registro existente pelo ID
router.put('/alunos/:idAluno', (req, res) => {
  const { idAluno } = req.params;
  const { nome, email, telefone, cpf, endereco, dataNascimento, matricula, anoLetivo, periodo } = req.body;
  connection.query('UPDATE alunos SET nome = ?, email = ?, telefone = ?, cpf = ?, endereco = ?, dataNascimento = ?, matricula = ?, anoLetivo = ?, periodo = ? WHERE idAluno = ?',
    [nome, email, telefone, cpf, endereco, dataNascimento, matricula, anoLetivo, periodo, idAluno], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar o registro:', err);
        res.status(500).json({ error: 'Erro ao atualizar o registro' });
        return;
      }
      res.json({ message: 'Registro atualizado com sucesso' });
    });
});

// Rota para excluir um registro pelo ID
router.delete('/alunos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM alunos WHERE idAluno = ?', [id], (err, result) => {
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
  connection.query('SELECT * FROM contasreceber WHERE idcontasReceber = ?', [id], (err, results) => {
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
  const { clasificacao, valorReceber, vencimento, empresa, contaBancaria, descricao, status, valorRecebido } = req.body;
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
  connection.query('DELETE FROM contasreceber WHERE idcontasReceber = ?', [id], (err, result) => {
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
  const { nomeAluno, semestre, materia, nota1, nota2, nota3, notaFinal, situacao } = req.body;
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


//////////////////////////////////////////////////// Contas a Pagar ////////////////////////////////////////////
// Rota para listar todos os registros
router.get('/produtos', (req, res) => {
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
router.get('/produtos/:idcontasPagar', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM contasPagar WHERE idcontasPagar = ?', [id], (err, results) => {
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
  const { descricao, categoria, nomePagamento, dataEmissao, dataVencimento, valor, parcelamento, status } = req.body;
  connection.query('INSERT INTO contasPagar (descricao, categoria, nomePagamento, dataEmissao, dataVencimento, valor, parcelamento, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [descricao, categoria, nomePagamento, dataEmissao, dataVencimento, valor, parcelamento, status], (err, result) => {
      if (err) {
        console.error('Erro ao criar o registro:', err);
        res.status(500).json({ error: 'Erro ao criar o registro' });
        return;
      }
      res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
    });
});

// Rota para atualizar um registro existente pelo ID
router.put('/produtos/:idcontasPagar', (req, res) => {
  const { idcontasPagar } = req.params;
  const { descricao, categoria, nomePagamento, dataEmissao, dataVencimento, valor, parcelamento, status } = req.body;
  connection.query('UPDATE contasPagar SET descricao = ?, categoria = ?, nomePagamento = ?, dataEmissao = ?, dataVencimento = ?, valor = ?, parcelamento = ?, status = ? WHERE idcontasPagar = ?',
    [descricao, categoria, nomePagamento, dataEmissao, dataVencimento, valor, parcelamento, status, idcontasPagar], (err, result) => {
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
  connection.query('DELETE FROM contasPagar WHERE idcontasPagar = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).json({ error: 'Erro ao excluir o registro' });
      return;
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});


///////////////////////////////////////// cadastro do funcionário interno ////////////////////////////////////
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
  const { nome, cpf, cargo, RegimeDeTrabalho, telefone, Salario, email, endereco, } = req.body;
  connection.query('INSERT INTO funcionarios (nome, cpf, cargo, RegimeDeTrabalho, telefone, Salario, email, endereco) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nome, cpf, cargo, RegimeDeTrabalho, telefone, Salario, email, endereco], (err, result) => {
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
  const { nome, cpf, cargo, RegimeDeTrabalho, telefone, Salario, email, endereco, } = req.body;
  connection.query('UPDATE funcionarios SET nome = ?,cpf = ?,cargo = ?,RegimeDeTrabalho = ?,telefone = ?,Salario = ?,email = ?,endereco = ?, WHERE idFuncionario = ?',
    [nome, cpf, cargo, RegimeDeTrabalho, telefone, Salario, email, endereco, idFuncionario], (err, result) => {
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


///////////////////////////////////////// cadastro do funcionário Tercerizado ////////////////////////////////////
// Rota para listar todos os registros
router.get('/funcionarioTerc', (req, res) => {
  connection.query('SELECT * FROM FuncionariosTerceirizados', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/funcionarioTerc/:idFuncionarioTercerizado', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM FuncionariosTerceirizados WHERE idFuncionarioTercerizado = ?', [id], (err, results) => {
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
router.post('/funcionarioTerc', (req, res) => {
  const { nome, email, cpf, cargo, regime_trabalho, endereco, telefone, empresa_terceirizada, id } = req.body;
  connection.query('INSERT INTO FuncionariosTerceirizados (nome, email, cpf, cargo, regime_trabalho , endereco, telefone, empresa_terceirizada) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nome, email, cpf, cargo, regime_trabalho, endereco, telefone, empresa_terceirizada, id], (err, result) => {
      if (err) {
        console.error('Erro ao criar o registro:', err);
        res.status(500).json({ error: 'Erro ao criar o registro' });
        return;
      }
      res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
    });
});

// Rota para atualizar um registro existente pelo ID
router.put('/funcionarioTerc/:idFuncionarioTercerizado', (req, res) => {
  const { idFuncionarioTercerizado } = req.params;
  const { nome, email, cpf, cargo, regime_trabalho, endereco, telefone, empresa_terceirizada, } = req.body;
  connection.query('UPDATE FuncionariosTerceirizados SET nome = ?, email = ?, cpf = ?, cargo = ?, regime_trabalho  = ?, endereco = ?, telefone = ?, empresa_terceirizada = ? WHERE idFuncionarioTercerizado = ?',
    [nome, email, cpf, cargo, regime_trabalho, endereco, telefone, empresa_terceirizada, idFuncionarioTercerizado], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar o registro:', err);
        res.status(500).json({ error: 'Erro ao atualizar o registro' });
        return;
      }
      res.json({ message: 'Registro atualizado com sucesso' });
    });
});

router.delete('/funcionarioTerc/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM FuncionariosTerceirizados WHERE idFuncionarioTercerizado = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).json({ error: 'Erro ao excluir o registro' });
      return;
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});


module.exports = router;