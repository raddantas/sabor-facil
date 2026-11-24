const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    criarTabela();
  }
});

function criarTabela() {
  const sql = `
    CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      categoria TEXT NOT NULL,
      tempoPreparo TEXT NOT NULL,
      ingredientes TEXT NOT NULL,
      modoPreparo TEXT NOT NULL,
      status TEXT DEFAULT 'pendente'
    )
  `;

  db.run(sql, (err) => {
    if (err) {
      console.error('Erro ao criar tabela:', err.message);
    } else {
      inserirDadosIniciais();
    }
  });
}

function inserirDadosIniciais() {
  db.get('SELECT COUNT(*) AS total FROM receitas', (err, row) => {
    if (!err && row.total === 0) {
      const insert = `INSERT INTO receitas (titulo, categoria, tempoPreparo, ingredientes, modoPreparo, status) VALUES (?, ?, ?, ?, ?, ?)`;
      db.run(insert, ['Bolo de Cenoura', 'Doces', '45 min', '3 cenouras, 4 ovos, 2 xícaras de açúcar, 2 xícaras de farinha, 1 colher de fermento', 'Bata as cenouras e ovos no liquidificador, misture os secos e asse a 180°C.', 'aprovada']);
      db.run(insert, ['Pão de Queijo Rápido', 'Salgados', '30 min', '2 xícaras de polvilho doce, 1 caixa de creme de leite, 200g de queijo ralado', 'Misture tudo até dar ponto de enrolar e asse por 25 minutos.', 'aprovada']);
      db.run(insert, ['Suco Verde Detox', 'Bebidas', '5 min', '1 folha de couve, 1 maçã, suco de 1 limão, 200ml de água gelada', 'Bata tudo no liquidificador e sirva sem coar.', 'pendente']);
      console.log('Receitas iniciais cadastradas!');
    }
  });
}

app.get('/api/receitas', (req, res) => {
  db.all("SELECT * FROM receitas WHERE status = 'aprovada'", [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

app.get('/api/receitas/pendentes', (req, res) => {
  db.all("SELECT * FROM receitas WHERE status = 'pendente'", [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

app.get('/api/receitas/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM receitas WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!row) return res.status(404).json({ mensagem: 'Receita não encontrada.' });
    res.json(row);
  });
});

app.post('/api/receitas', (req, res) => {
  const { titulo, categoria, tempoPreparo, ingredientes, modoPreparo } = req.body;

  if (!titulo || !categoria || !tempoPreparo || !ingredientes || !modoPreparo) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  const sql = `INSERT INTO receitas (titulo, categoria, tempoPreparo, ingredientes, modoPreparo, status) VALUES (?, ?, ?, ?, ?, 'pendente')`;
  db.run(sql, [titulo, categoria, tempoPreparo, ingredientes, modoPreparo], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({
      id: this.lastID,
      titulo,
      categoria,
      tempoPreparo,
      ingredientes,
      modoPreparo,
      status: 'pendente'
    });
  });
});

app.patch('/api/receitas/:id/aprovar', (req, res) => {
  const { id } = req.params;
  db.run("UPDATE receitas SET status = 'aprovada' WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) return res.status(404).json({ mensagem: 'Receita não encontrada.' });
    res.json({ mensagem: 'Receita aprovada e publicada com sucesso!' });
  });
});

app.delete('/api/receitas/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM receitas WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) return res.status(404).json({ mensagem: 'Receita não encontrada.' });
    res.json({ mensagem: 'Receita recusada e removida.' });
  });
});