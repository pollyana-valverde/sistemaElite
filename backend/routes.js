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
router.get('/cadastros/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM cadastro WHERE id = ?', [id], (err, results) => {
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
router.post('/cadastros', (req, res) => {
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
router.put('/cadastros/:id', (req, res) => {
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



////////////////////////////////////////////////// fornecedores /////////////////////////////////////
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
  connection.query('SELECT * FROM contasReceber', (err, results) => {
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
  connection.query('SELECT * FROM contasReceber WHERE idcontaReceber = ?', [id], (err, results) => {
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
  connection.query('UPDATE contasReceber SET status = ?, valorRecebido =? WHERE idcontaReceber = ?', 
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
  router.delete('/contasReceber/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM contasReceber WHERE idcontaReceber = ?', [id], (err, result) => {
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
  connection.query('SELECT * FROM contasPagar WHERE idcontaReceber = ?', [id], (err, results) => {
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
  connection.query('UPDATE contasPagar SET status = ?, valorRecebido =? WHERE idcontaReceber = ?', 
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
    connection.query('DELETE FROM contasPagar WHERE idcontaReceber = ?', [id], (err, result) => {
      if (err) {
        console.error('Erro ao excluir o registro:', err);
        res.status(500).json({ error: 'Erro ao excluir o registro' });
        return;
      }
      res.json({ message: 'Registro excluído com sucesso' });
    });
  });
  
  

module.exports = router;
