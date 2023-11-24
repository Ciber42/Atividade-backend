const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

const sequelize = new Sequelize('Listadetarefas', 'mysql', '123456', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.sync({ force: false }).then(() => {
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
});

const FormData = sequelize.define('FormData', {
  field1: {
    type: DataTypes.STRING,
  },
  field2: {
    type: DataTypes.STRING,
  },
  field3: {
    type: DataTypes.STRING,
  },
  field4: {
    type: DataTypes.STRING,
  },
  field5: {
    type: DataTypes.STRING,
  },
  field6: {
    type: DataTypes.STRING,
  },
});

app.use(express.json());

app.post('/form', async (req, res) => {
  try {
    const formData = req.body;

    await FormData.create(formData);

    res.send('Dados recebidos e salvos no banco de dados com sucesso.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao processar os dados do formulário.');
  }
});

app.get('/show-data', async (req, res) => {
  try {
    const data = await FormData.findAll();

    let tableHtml = '<table border="1"><tr><th>Field 1</th><th>Field 2</th><th>Field 3</th><th>Field 4</th><th>Field 5</th><th>Field 6</th></tr>';
    
    data.forEach((row) => {
      tableHtml += `<tr><td>${row.field1}</td><td>${row.field2}</td><td>${row.field3}</td><td>${row.field4}</td><td>${row.field5}</td><td>${row.field6}</td></tr>`;
    });

    tableHtml += '</table>';

    res.send(tableHtml);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar os dados do banco de dados.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
