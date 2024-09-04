const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Configuração da conexão ao MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',          // Substitua pelo seu usuário MySQL
  password: 'IFPB',     // Substitua pela sua senha MySQL
  database: 'projetoTeste' // Substitua pelo nome do seu banco de dados
});

// Conectando ao MySQL
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err.stack);
    return;
  }
  console.log('Conectado ao MySQL como id ' + connection.threadId);
});

// Middleware para processar JSON no corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para buscar dados do MySQL
app.get('/dados', (req, res) => {
  const query = 'SELECT * FROM usuarios'; // Substitua 'usuarios' pelo nome real da sua tabela
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erro na consulta: ' + error.stack);
      res.status(500).send('Erro na consulta');
      return;
    }
    res.json(results);
  });
});

// Rota para adicionar dados no MySQL
app.post('/adicionar', (req, res) => {
  const { nome, email, cpf, cidade } = req.body;
  if (!nome || !email || !cpf || !cidade) {
    res.status(400).send('Faltam dados para inserção.');
    return;
  }

  const query = 'INSERT INTO usuarios (nome, email, cpf, cidade) VALUES (?, ?, ?, ?)';
  connection.query(query, [nome, email, cpf, cidade], (error, results) => {
    if (error) {
      console.error('Erro na inserção: ' + error.stack);
      res.status(500).send('Erro na inserção');
      return;
    }

    if (results.affectedRows > 0) {
      res.send('Dados inseridos com sucesso!');
    } else {
      res.send('Nenhum dado foi inserido.');
    }
    console.log('Resultado da inserção:', results);
  });
});

// Rota para servir a página HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configurar a porta e iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
