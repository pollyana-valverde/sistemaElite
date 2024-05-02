const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routesCadastro = require('./routesCadastro'); // Importa as rotas do backend
const routesForenecedor = require('./routesFornecedor'); // Importa as rotas do backend


const app = express();
const port = 3001; // Defina a porta que deseja utilizar

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Usa as rotas do backend

app.use('/', routesForenecedor);
// app.use('/', routesCadastro);

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
