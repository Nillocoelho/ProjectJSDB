const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./js/db'); // Usando require para importar o módulo de conexão com o banco de dados

const app = express();
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { nome, cpf, email, cidade } = req.body;

    // Lógica para inserir dados no banco de dados
    const sql = "INSERT INTO usuarios (nome, cpf, email, cidade) VALUES (?, ?, ?, ?)";
    connection.query(sql, [nome, cpf, email, cidade], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados no banco:', err);
            res.status(500).send('Erro ao registrar usuário.');
        } else {
            res.status(200).send('Registro concluído com sucesso!');
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
