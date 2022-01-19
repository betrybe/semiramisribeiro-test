const app = require('./app');
const bodyParser = require('body-parser');
const express = require('express');
const req = require('express/lib/request');

const PORT = 3000;

const path = require('path');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

var usersRouter = require('../controllers/authController');

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/', (req,res) => {res.send("OK")});

require('../controllers/authController')(app);
require('../controllers/recipesController')(app);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));


