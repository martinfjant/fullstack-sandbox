const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
let todos = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    todos: [
      { text: 'First todo of first list!', date: '2020-05-07', done: true },
    ],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: [
      { text: 'First todo of second list!', date: '2020-05-07', done: false },
    ],
  },
};

app.use(cors());
app.use(bodyParser.json());

const PORT = 3001;

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/todos', (req, res) => {
  res.send(todos);
});
app.post('/todos', (req, res) => {
  console.log(req.body);
  todos = req.body;
  res.send(todos);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
