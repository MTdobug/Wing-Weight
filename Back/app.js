const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuração do banco
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

//  Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor Node.js com tabela USUARIO está rodando!');
});

//  ROTA DE LOGIN
app.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).send({ mensagem: 'Informe login e senha.' });
  }

  try {
    await sql.connect(config);

    const result = await sql.query`
      SELECT u.id, u.tipo, p.nome, p.id_produtor
      FROM USUARIO u
      JOIN Produtor p ON u.produtor_id = p.id_produtor
      WHERE u.login = ${login} AND u.senha = ${senha}
    `;

    if (result.recordset.length > 0) {
      const usuario = result.recordset[0];
      res.send({
        mensagem: 'Login realizado com sucesso',
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          tipo: usuario.tipo
        }
      });
    } else {
      res.status(401).send({ mensagem: 'Login ou senha incorretos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ erro: 'Erro ao fazer login.' });
  }
});

//  ROTA DE CADASTRO
app.post('/register', async (req, res) => {
  const { nome, cpf_cnpj, email, telefone, login, senha } = req.body;

  if (!nome || !cpf_cnpj || !login || !senha) {
    return res.status(400).send({ mensagem: 'Campos obrigatórios faltando.' });
  }

  try {
    await sql.connect(config);

    // Verifica se já existe CPF ou login duplicado
    const checkProdutor = await sql.query`
      SELECT * FROM Produtor WHERE cpf_cnpj = ${cpf_cnpj};
    `;
    const checkLogin = await sql.query`
      SELECT * FROM USUARIO WHERE login = ${login};
    `;

    if (checkProdutor.recordset.length > 0) {
      return res.status(409).send({ mensagem: 'CPF/CNPJ já cadastrado.' });
    }
    if (checkLogin.recordset.length > 0) {
      return res.status(409).send({ mensagem: 'Login já está em uso.' });
    }

    // Insere o produtor
    await sql.query`
      INSERT INTO Produtor (nome, cpf_cnpj, email, telefone)
      VALUES (${nome}, ${cpf_cnpj}, ${email}, ${telefone});
    `;

    // Pega o id_produtor recém-criado
    const result = await sql.query`
      SELECT id_produtor FROM Produtor WHERE cpf_cnpj = ${cpf_cnpj};
    `;
    const produtorId = result.recordset[0].id_produtor;

    // Insere o usuário associado ao produtor
    await sql.query`
      INSERT INTO USUARIO (login, senha, tipo, produtor_id)
      VALUES (${login}, ${senha}, 'produtor', ${produtorId});
    `;

    res.status(201).send({ mensagem: 'Cadastro realizado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ erro: 'Erro ao cadastrar usuário.' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});