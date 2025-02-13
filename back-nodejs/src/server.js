const express = require('express');
//arquivos de rotas
const roomRoutes = require('./routes/salas.routes.js');
const equipamentosRoutes = require('./routes/equipamentos.routes.js');
const EquipSalaRoutes = require('./routes/equipsala.routes.js');

const { connectDB } = require('./database/index');
const app = express();

// iniciando o banco de dados
(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados', err);
  }
})();

// iniciando as rotas
app.use(express.json());

// iniciando as rotas
app.use('/salas', roomRoutes);
app.use('/equipamentos', equipamentosRoutes);
app.use('/equipsala', EquipSalaRoutes);

// iniciando o server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!!! 🚀`);
});

module.exports = { app };
