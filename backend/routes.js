const express = require('express');
const connection = require('./db');
const router = express.Router();

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
  connection.query('INSERT INTO carros (marca, modelo, classificacao, cor, anoFabricacao, potencia, tipoMotor, tipoTransmissao, numeroIdentificacao, valor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [marca, modelo, classificacao, cor, anoFabricacao, potencia, tipoMotor, tipoTransmissao, numeroIdentificacao, valor], (err, result) => {
    if (err) {
      console.error('Erro ao criar o registro:', err);
      res.status(500).json({ error: 'Erro ao criar o registro' });
      return;
    }
    res.status(201).json({ message: 'Registro criado com sucesso', idCarro: result.insertIdCarro }); 
  });
});

// Rota para atualizar um registro existente pelo ID
router.put('/produtos/:idCarro', (req, res) => {
  const { idCarro } = req.params;
  const { marca, modelo, classificacao, cor, anoFabricacao, potencia, tipoMotor, tipoTransmissao, numeroIdentificacao, valor } = req.body;
  connection.query('UPDATE cadastro SET marca = ?, modelo = ?, classificacao = ?, cor = ?, anoFabricacao = ?, potencia = ?, tipoMotor = ?, tipoTransmissao = ?, numeroIdentificacao = ?, valor = ?, WHERE idCarro = ?', 
    [marca, modelo, classificacao, cor, anoFabricacao, potencia, tipoMotor, tipoTransmissao, numeroIdentificacao, valor], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o registro:', err);
      res.status(500).json({ error: 'Erro ao atualizar o registro' });
      return;
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
});

// Rota para excluir um registro pelo ID
router.delete('/produtos/:idCarro', (req, res) => {
  const { idCarro } = req.params;
  connection.query('DELETE FROM produtos WHERE idCarro = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).json({ error: 'Erro ao excluir o registro' });
      return;
    }
    res.json({ message: 'Registro excluído com sucesso' });
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
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/vendas/:codigoVenda', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM vendas WHERE codigoVendas = ?', [id], (err, results) => {
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
router.put('/vendas/:codigoVenda', (req, res) => {
  const { codigoVenda } = req.params;
  const { dataHora, numeroIdentCarro, cliente, cpfFuncionario, qtdProdutos, valorUnidade, valorTotal, metodoPagamento, endereco, status } = req.body;
  connection.query('UPDATE vendas SET dataHora = ?, numeroIdentCarro = ?, cliente = ?, cpfFuncionario = ?, qtdProdutos = ?, valorUnidade = ?, valorTotal = ?, metodoPagamento = ?, numeroIdentificacao = ?, endereco = ?, status = ?, WHERE codigoVenda = ?', 
    [dataHora, numeroIdentCarro, cliente, cpfFuncionario, qtdProdutos, valorUnidade, valorTotal, metodoPagamento, endereco, status], (err, result) => {
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
  const { codigoVenda } = req.params;
  connection.query('DELETE FROM vendas WHERE codigoVenda = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).json({ error: 'Erro ao excluir o registro' });
      return;
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});



module.exports = router;
